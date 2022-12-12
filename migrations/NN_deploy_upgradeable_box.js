const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const EncryptionTools = artifacts.require('EncryptionTools');
const ItemTracker = artifacts.require('ItemTracker');
const ItemData = artifacts.require('ItemData');
const Vault = artifacts.require('Vault');
const Profile = artifacts.require('Profile');
const nHomes = artifacts.require('nHomes');
const nWonderland = artifacts.require('nWonderland');

module.exports = async function (deployer) {
    await deployProxy(EncryptionTools, [], { deployer });
    await deployProxy(ItemTracker, [], { deployer });
    await deployProxy(ItemData, [], { deployer });
    await deployProxy(Vault, [], { deployer });
    await deployProxy(Profile, [], { deployer });
    await deployProxy(nHomes, [], { deployer });
    await deployProxy(nWonderland, [], { deployer });
    };
