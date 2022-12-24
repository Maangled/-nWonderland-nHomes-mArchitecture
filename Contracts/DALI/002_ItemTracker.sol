// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// ItemTracker (IT) v0.1.0
// IT creates Names for items
// IT creates a delegate call to EncryptionTools (ET) to create IDs for items
// for version 1.0.0, IT uses the ERC1155 standard
// IT: createItem, getItem, burnItem, pause, unpause are the main functions that will be used by the end user
// IT: createItem (ERC1155), burnItem (ERC1155), pauseItem (ERC1155), unpauseItem (ERC1155), pause, unpause, hasRole, renounceRole, grantRole
// IT: setURI, supportsInterface, balanceOf, balanceOfBatch, setApprovalForAll, isApprovedForAll, safeTransferFrom, safeBatchTransferFrom


contract ItemTracker is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
    struct Item {
        bytes32[] encryptedItem;
    }
    uint256 public itemID;
    mapping (uint256 => Item) internal items;
    event EncryptionToolsSet(address _encryptionTools);
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    address public ETAddress;
    string public title = "";


    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize(address _ETAddress) public initializer {
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
        ETAddress = _ETAddress;
    }
    // creates a delegate call to ET to encrypt an item

    function addItteration(string[] memory _item, string[] memory _hashKeys) internal returns (uint256) {
        // create an item
        Item memory newItem;
        (bool success, bytes memory data) = ETAddress.delegatecall(abi.encodeWithSignature("getEncryption(string[],string[])", _item, _hashKeys));
        require(success, "Delegate call failed");
        newItem.encryptedItem = abi.decode(data, (bytes32[]));
        // store the item in the items mapping
        items[itemID] = newItem;
        // return the itemID
        return itemID;
    }
    // change the order of the items in the items mapping
    function swapItems(uint256 _itemID1, uint256 _itemID2) internal {
        Item memory item1 = items[_itemID1];
        Item memory item2 = items[_itemID2];
        items[_itemID1] = item2;
        items[_itemID2] = item1;
    }
    // get an item from the items mapping
    function getItem(uint256 _itemID) internal view returns (bytes32[] memory) {
        return items[_itemID].encryptedItem;
    }
    // burn an item from the items mapping
    function burnItem(uint256 _itemID) internal {
        delete items[_itemID];
    }
    // sets the URI for the ERC1155 standard
    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }
    // pauses the contract using the ERC1155 standard
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }
    // unpauses the contract using the ERC1155 standard
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    // minting function for the ERC1155 standard
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mint(account, id, amount, data);
    }
    // mintBatch function for the ERC1155 standard
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyRole(MINTER_ROLE)
    {
        _mintBatch(to, ids, amounts, data);
    }
    // burn function for the ERC1155 standard
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // allows the contract to be upgraded
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