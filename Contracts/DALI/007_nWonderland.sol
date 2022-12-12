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

// nWonderland (nW) v1.0.0
// this contract is a proxy to the profile contracta
// this contract is called by a profile node to pin a node fragment to an ipfs hash
// it has a function to create a profile node
// it has a function to create a profile node fragment

contract nWonderlands is Initializable, ERC1155Upgradeable, ERC1155BurnableUpgradeable, ERC1155PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable, AccessControlUpgradeable, ERC1155SupplyUpgradeable {
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
    address public vaultAddress;
    mapping(uint256 => address) public vaults;
    mapping(uint256 => uint256) public vaultIDs;
    mapping(uint256 => uint256) public vaultBalances;
    event VaultSet(address _vault);
    address public profileAddress;
    mapping(uint256 => uint256) public Profiles;
    mapping(uint256 => uint256) public ProfileIDs;
    mapping(uint256 => uint256) public ProfileBalances;
    event ProfileSet(address _profile);

function initialize(address _profileAddress) public {
        __ERC1155_init("https://ipfs.io/ipfs/");
        __ERC1155Burnable_init();
        __ERC1155Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        __AccessControl_init();
        __ERC1155Supply_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(URI_SETTER_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(UPGRADER_ROLE, msg.sender);
        profileAddress = _profileAddress;
    }
    // this function creates a delegate call to the profile contract to set the encryption tools, the item tracker, the Item Distributor, and then creates a vault and then 
    // creates an item and sets the owner of the item to this contract and then transfers the vault to the owner of the item
    function activateProfile()public{
        (bool success, bytes memory result) = profileAddress.delegatecall(abi.encodeWithSignature("setEncryptionTools", ETAddress));
        require(success, "Delegate call failed");
        (bool success2, bytes memory result2) = profileAddress.delegatecall(abi.encodeWithSignature("setItemTracker", ITAddress));
        require(success2, "Delegate call failed");
        (bool success3, bytes memory result3) = profileAddress.delegatecall(abi.encodeWithSignature("setItemDistributor", IDAddress));
        require(success3, "Delegate call failed");
        (bool success4, bytes memory result4) = profileAddress.delegatecall(abi.encodeWithSignature("createVault", vaultAddress));
        require(success4, "Delegate call failed");
        (bool success5, bytes memory result5) = profileAddress.delegatecall(abi.encodeWithSignature("createItem", itemID, vaultAddress));
        require(success5, "Delegate call failed");
        (bool success6, bytes memory result6) = profileAddress.delegatecall(abi.encodeWithSignature("setItemOwner", itemID, address(this)));
        require(success6, "Delegate call failed");

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
        override(ERC1155PausableUpgradeable, ERC1155Upgradeable, ERC1155SupplyUpgradeable)
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