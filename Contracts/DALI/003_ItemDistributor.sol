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


// this contract is a proxy the itemTracker contract
// it is used to move items from one address to another
// it calls the itemTracker contract to do the actual transfer of ownership by buring the item and minting a new one
// this allows items to be moved while including only the parts of the item that are agreed upon by both parties
// this contract is not intended to be used by the public, but by other contracts
// this calls on the ItemTracker by address, so it can be used with any ItemTracker contract

contract ItemDistributor is Initializable, ERC1155Upgradeable, AccessControlUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
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
    event ItemTrackerSet(address _itemTracker);
    mapping(uint256 => Item) public items;
    mapping(uint256 => address) public itemOwners;

    function initialize(address _ITAddress, address _owner, address _newOwner, bytes32[] memory _encryptedItem) public {
        ITAddress = _ITAddress;
        owner = _owner;
        newOwner = _newOwner;
        Item[0] = _encryptedItem;
    }

    function transferItem() public {
        (bool success, bytes memory result) = ITAddress.delegatecall(abi.encodeWithSignature("burnItem(address,uint256,bytes32[])", owner, itemID, Item[0]));
        (bool success1, bytes memory result1) = ITAddress.delegatecall(abi.encodeWithSignature("createItem(address,uint256,bytes32[])", newOwner, itemID, Item[0]));
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