const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const EncryptionTools = artifacts.require('EncryptionTools');
const EncryptionToolsV2 = artifacts.require('EncryptionToolsV2');
const ItemTracker = artifacts.require('ItemTracker');
const ItemTrackerV2 = artifacts.require('ItemTrackerV2');
const ItemData = artifacts.require('ItemData');
const ItemDataV2 = artifacts.require('ItemDataV2');
const Vault = artifacts.require('Vault');
const VaultV2 = artifacts.require('VaultV2');
const Profile = artifacts.require('Profile');
const ProfileV2 = artifacts.require('ProfileV2');
const nHomes = artifacts.require('nHomes');
const n2Homes = artifacts.require('2Homes');
const nWonderland = artifacts.require('nWonderland');
const n2Wonderland = artifacts.require('freeWonderland');