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
    address public ITAddress;
    address public owner;
    address public newOwner;
    address public IDAddress;
    event ItemTrackerSet(address _itemTracker);
    mapping(uint256 => Item) public items;
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

    // create an item
    function createItem(string[] memory _item, string[] memory _hashKeys) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to create item");
        Item[0] = EncryptionToolsSet(ETAddress).createItem(_item, _hashKeys);
        items[itemID].encryptedItem = Item[0];
        itemOwners[itemID] = msg.sender;
        _mint(msg.sender, itemID, 1, "");
        itemID++;
    }

    // split an item
    function splitItem(uint256 _itemID, uint256 _amount) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to split item");
        require(balanceOf(msg.sender, _itemID) >= _amount, "Vault: not enough items to split");
        require(_amount > 0, "Vault: amount must be greater than 0");
        Item[0] = items[_itemID].encryptedItem;
        for (uint256 i = 0; i < _amount; i++) {
            items[itemID].encryptedItem = Item[0];
            itemOwners[itemID] = msg.sender;
            _mint(msg.sender, itemID, 1, "");
            itemID++;
        }
        _burn(msg.sender, _itemID, _amount);
    }

    // combine items
    function combineItems(uint256[] memory _itemIDs) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to combine items");
        require(_itemIDs.length > 1, "Vault: must have more than 1 item to combine");
        for (uint256 i = 0; i < _itemIDs.length; i++) {
            require(balanceOf(msg.sender, _itemIDs[i]) >= 1, "Vault: not enough items to combine");
            Item[0] = EncryptionToolsSet(ETAddress).combineItems(Item[0], items[_itemIDs[i]].encryptedItem);
            _burn(msg.sender, _itemIDs[i], 1);
        }
        items[itemID].encryptedItem = Item[0];
        itemOwners[itemID] = msg.sender;
        _mint(msg.sender, itemID, 1, "");
        itemID++;
    }

    // transfer an item
    function transferItem(uint256 _itemID, address _to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to transfer item");
        require(balanceOf(msg.sender, _itemID) >= 1, "Vault: not enough items to transfer");
        Item[0] = items[_itemID].encryptedItem;
        ItemDisplacerSet(IDAddress).transferItem(Item[0], _to);
        _burn(msg.sender, _itemID, 1);
    }

    // transfer multiple items
    function transferItems(uint256[] memory _itemIDs, address _to) public {
        require(hasRole(MINTER_ROLE, msg.sender), "Vault: must have minter role to transfer items");
        require(_itemIDs.length > 0, "Vault: must have more than 0 items to transfer");
        for (uint256 i = 0; i < _itemIDs.length; i++) {
            require(balanceOf(msg.sender, _itemIDs[i]) >= 1, "Vault: not enough items to transfer");
            Item[0] = EncryptionToolsSet(ETAddress).combineItems(Item[0], items[_itemIDs[i]].encryptedItem);
            _burn(msg.sender, _itemIDs[i], 1);
        }
        ItemDisplacerSet(IDAddress).transferItem(Item[0], _to);
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

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
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