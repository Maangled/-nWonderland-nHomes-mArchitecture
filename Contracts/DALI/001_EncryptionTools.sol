// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (utils/math/SafeMath.sol)
pragma solidity ^0.8.4;


// EncryptionTools (ET) v1.0.0
// ET is a contract that manages the encryption and decryption of items
// this contract will 
// for version 1.0.0, ET uses a basic encryption algorithm
// ET: createItem
contract EncryptionTools {
    // item struct for version 1.0.0 of ET (basic encryption algorithm)
    struct Item {
        bytes32[] encryptedItem;
    }
    
    // creates an item using a basic encryption algorithm
    function createItem(string[] memory _item, string[] memory _hashKeys) public pure returns (bytes32[] memory) {
        bytes32[] memory encryptedItem = new bytes32[](_item.length);
        for (uint256 i = 0; i < _item.length; i++) {
            encryptedItem[i] = keccak256(abi.encodePacked(_item[i], _hashKeys[i]));
        }
        return encryptedItem;
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
