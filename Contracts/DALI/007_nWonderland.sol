// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// nWonderland (nW) v1.0.0
// this contract is a proxy to the profile contracta
// this contract is called by a profile node to pin a node fragment to an ipfs hash

// it has a function to create a profile node
// it has a function to create a profile node fragment

contract nWonderlands {
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
    mapping(uint256 => address) public itemOwners;
    address public vaultAddress;
    mapping(uint256 => address) public vaults;
    mapping(uint256 => uint256) public vaultIDs;
    mapping(uint256 => uint256) public vaultBalances;
    event VaultSet(address _vault);
    mapping(uint256 => uint256) public Profiles;
    mapping(uint256 => uint256) public ProfileIDs;
    mapping(uint256 => uint256) public ProfileBalances;
    event ProfileSet(address _profile);

    // initialize the contract
    function initialize() public {
        // nothing to initialize
    }
}