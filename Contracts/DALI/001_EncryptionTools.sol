// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (utils/math/SafeMath.sol)
pragma solidity ^0.8.9;

// EncryptionTools (ET) v0.1.0
// ET creates a unique ID for each item
// ET includes functions for encrypting and decrypting items
// it is used by Item Tracker (IT) to create ID #'s for items

contract EncryptionTools {
    // create a structure for an item that will be stored in the items mapping
    struct Item {
        bytes32[] encryptedItem;
    }
    uint256 public itemID;
    mapping (uint256 => Item) internal items;

    // encrypts an item using a basic encryption algorithm
    function getEncryption(string[] memory _item, string[] memory _hashKeys) 
        internal pure returns (bytes32[] memory) {
            // create an array of bytes32 to store the encrypted item
            bytes32[] memory encryptedItem = new bytes32[](_item.length);
            // for each item in the array, encrypt the item
            for (uint256 i = 0; i < _item.length; i++) {
                encryptedItem[i] = keccak256(abi.encodePacked(_item[i], _hashKeys[i]));
            }
            return encryptedItem;
        }

    // decrypts an item using a basic encryption algorithm
    function getDecryption(bytes32[] memory _encryptedItem, string[] memory _hashKeys) internal pure returns (string[] memory) {
        string[] memory decryptedItem = new string[](_encryptedItem.length);
        for (uint256 i = 0; i < _encryptedItem.length; i++) {
            decryptedItem[i] = string(abi.encodePacked(_encryptedItem[i], _hashKeys[i]));
        }
        return decryptedItem;
    }
    // create an item 
    function createItem(string[] memory _item, string[] memory _hashKeys) internal returns (uint256) {
        // create a random number between 0 and 10,000,000
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 10000000;
        // create an item
        Item memory newItem;
        newItem.encryptedItem = getEncryption(_item, _hashKeys);
        // store the item in the items mapping
        items[random] = newItem;
        // return the itemID
        return random;
    }

    // decrypts an item using a basic encryption algorithm
    function decryptItem(bytes32[] memory _encryptedItem, string[] memory _hashKeys) public pure returns (string[] memory) {
        string[] memory decryptedItem = new string[](_encryptedItem.length);
        for (uint256 i = 0; i < _encryptedItem.length; i++) {
            decryptedItem[i] = string(abi.encodePacked(_encryptedItem[i], _hashKeys[i]));
        }
        return decryptedItem;
    }

    // initialize the contract
    function initialize() public {
        // nothing to initialize
    }
}
