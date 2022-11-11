// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// ItemTracker (IT) v1.0.0
// IT is a contract that manages the creation and tracking of items\
// IT creates a delegate call to EncryptionTools (ET) to encrypt items
// for version 1.0.0, IT uses the ERC1155 standard
// IT: createItem, getItem, burnItem, pause, unpause are the main functions that will be used by the end user
// IT: createItem (ERC1155), burnItem (ERC1155), pauseItem (ERC1155), unpauseItem (ERC1155), pause, unpause, hasRole, renounceRole, grantRole
// IT: setURI, supportsInterface, balanceOf, balanceOfBatch, setApprovalForAll, isApprovedForAll, safeTransferFrom, safeBatchTransferFrom



contract ItemTracker is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
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
    function getEncryption(string[] memory _item, string[] memory _hashKeys) internal returns (bytes32[] memory) {
        (bool success, bytes memory result) = ETAddress.delegatecall(abi.encodeWithSignature("createItem(string[],string[])", _item, _hashKeys));
        return abi.decode(result, (bytes32[]));
        }

    // creates an item using the ERC1155 standard
    function createItem(string[] memory _item, string[] memory _hashKeys) public {
        require(hasRole(MINTER_ROLE, msg.sender), "ItemTracker: must have minter role to mint");
        bytes32[] memory encryptedItem = getEncryption(_item, _hashKeys);
        _mint(msg.sender, itemID, 1, "");
        itemID++;
    }
    // burns an item using the ERC1155 standard
    function burnItem(uint256 _itemID) public {
        require(hasRole(MINTER_ROLE, msg.sender), "ItemTracker: must have minter role to burn");
        _burn(msg.sender, _itemID, 1);
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