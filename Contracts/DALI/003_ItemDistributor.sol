// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";


// Item Distrubutor (ID) v0.1.0
// ID creates Tags for items


contract ItemDistributor is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
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
    address public ITAddress;
    address public owner;
    address public newOwner;
    event ItemTrackerSet(address _itemTracker);
    mapping(uint256 => address) public itemOwners;

    function initialize(address _ITAddress, address _owner, address _newOwner, bytes32[] memory _encryptedItem) public {
        ITAddress = _ITAddress;
        owner = _owner;
        newOwner = _newOwner;
        itemID = 0;
        items[itemID].encryptedItem = _encryptedItem;
    }

    // add a data to an item array
    function addItemData(uint256 _itemID, bytes32[] memory _encryptedItem) public {
        require(msg.sender == ITAddress, "Only the ItemTracker can add item data");
        items[_itemID].encryptedItem = _encryptedItem;
    }

    
    // make a delecate call to the itemTracker contract to burn the item and mint a new one
    function transferItem() public {
        (bool success, bytes memory result) = ITAddress.delegatecall(abi.encodeWithSignature("burnItem(address,uint256,bytes32[])", owner, itemID, items[0]));
        require(success, "burnItem failed");
        (bool success1, bytes memory result1) = ITAddress.delegatecall(abi.encodeWithSignature("createItem(address,uint256,bytes32[])", newOwner, itemID, items[0]));
        require(success1, "createItem failed");
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