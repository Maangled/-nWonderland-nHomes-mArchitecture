// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";

// this contract is a proxy the itemDisplacer contract
// it is used to organize items as an array of items
// it calls the itemDisplacer contract to do the actual transfer of ownership by buring the item and minting a new one with the same ID
// this allows items to be combined into a single item to save on storage costs and gas fees while allowing the items to be split up again or to share ownership over multiple addresses
// this contract is not intended to be used by the public, but by other contracts
// this calls on the ItemDisplacer by address, so it can be used with any ItemDisplacer contract

contract Vault is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
    struct Item {
        bytes32[] encryptedItem;
    }
    event EncryptionToolsSet(address _encryptionTools);
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    address public ETAddress;
    uint256 public itemID;
    mapping (uint256 => Item) internal items;
    address public ITAddress;
    address public newOwner;
    address public IDAddress;
    event ItemTrackerSet(address _itemTracker);
    mapping(uint256 => address) public itemOwners;
    event ItemDisplacerSet(address _itemDisplacer);
    address public vaultAddress;
    mapping(uint256 => address) public vaults;
    mapping(uint256 => uint256) public vaultIDs;
    mapping(uint256 => uint256) public vaultBalances;

    // initialize the contract
    function initialize(address _IDAddress, address _ITAddress, address _ETAddress) public initializer {
        __ERC1155_init("https://ipfs.io/ipfs/");
        __AccessControl_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(URI_SETTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);
        IDAddress = _IDAddress;
        ITAddress = _ITAddress;
        ETAddress = _ETAddress;
        itemID = 0;
    }

    // set the encryption tools contract address
    function setEncryptionTools(address _ETAddress) public {
        require(hasRole(UPGRADER_ROLE, msg.sender), "Vault: must have upgrader role to set encryption tools");
        ETAddress = _ETAddress;
        emit EncryptionToolsSet(_ETAddress);
    }

    // create an item using the encryption tools contract and store it in the items mapping with the itemID as the key
    function createItem(bytes32[] memory _encryptedItem) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to create item");
        items[itemID].encryptedItem = _encryptedItem;
        itemID++;
    }


    // split an item
    function splitItem(uint256 _itemID, uint256 _amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to split item");
        require(_amount > 0, "Vault: amount must be greater than 0");
        require(_amount <= vaultBalances[_itemID], "Vault: amount must be less than or equal to vault balance");
        require(vaultBalances[_itemID] > 0, "Vault: vault balance must be greater than 0");
        require(vaults[_itemID] == msg.sender, "Vault: must be vault owner to split item");
        vaultBalances[_itemID] -= _amount;
        uint256 newItemID = itemID;
        itemID++;
        vaults[newItemID] = msg.sender;
        vaultIDs[newItemID] = _itemID;
        vaultBalances[newItemID] = _amount;
        emit TransferSingle(msg.sender, address(0), msg.sender, newItemID, _amount);
    }

    // combine items
    function combineItems(uint256[] memory _itemIDs) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to combine items");
        require(_itemIDs.length > 1, "Vault: must have more than 1 item to combine");
        uint256 newItemID = itemID;
        itemID++;
        vaults[newItemID] = msg.sender;
        for (uint256 i = 0; i < _itemIDs.length; i++) {
            require(vaults[_itemIDs[i]] == msg.sender, "Vault: must be vault owner to combine items");
            require(vaultBalances[_itemIDs[i]] > 0, "Vault: vault balance must be greater than 0");
            vaultIDs[newItemID] = _itemIDs[i];
            vaultBalances[newItemID] += vaultBalances[_itemIDs[i]];
            vaultBalances[_itemIDs[i]] = 0;
            emit TransferSingle(msg.sender, msg.sender, address(0), _itemIDs[i], vaultBalances[_itemIDs[i]]);
        }
        emit TransferSingle(msg.sender, address(0), msg.sender, newItemID, vaultBalances[newItemID]);
    }

    // transfer an item
    function transferItem(uint256 _itemID, address _to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to transfer item");
        require(vaults[_itemID] == msg.sender, "Vault: must be vault owner to transfer item");
        require(vaultBalances[_itemID] > 0, "Vault: vault balance must be greater than 0");
        vaults[_itemID] = _to;
        emit TransferSingle(msg.sender, msg.sender, _to, _itemID, vaultBalances[_itemID]);
    }

    // transfer multiple items
    function transferItems(uint256[] memory _itemIDs, address _to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to transfer items");
        for (uint256 i = 0; i < _itemIDs.length; i++) {
            require(vaults[_itemIDs[i]] == msg.sender, "Vault: must be vault owner to transfer items");
            require(vaultBalances[_itemIDs[i]] > 0, "Vault: vault balance must be greater than 0");
            vaults[_itemIDs[i]] = _to;
            emit TransferSingle(msg.sender, msg.sender, _to, _itemIDs[i], vaultBalances[_itemIDs[i]]);
        }
    }

    // get the item
    function getItem(uint256 _itemID) public view returns (bytes32[] memory) {
        return items[_itemID].encryptedItem;
    }

    // get the item owner
    function getItemOwner(uint256 _itemID) public view returns (address) {
        return itemOwners[_itemID];
    }

    // get the item ID
    function getItemID() public view returns (uint256) {
        return itemID;
    }
    
    // pause the contract
    function pause() public {
        require(hasRole(PAUSER_ROLE, msg.sender), "Vault: must have pauser role to pause");
        _pause();
    }

    // unpause the contract
    function unpause() public {
        require(hasRole(PAUSER_ROLE, msg.sender), "Vault: must have pauser role to unpause");
        _unpause();
    }


        function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}