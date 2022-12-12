const EncryptionTools = artifacts.require("EncryptionTools");
const ItemTracker = artifacts.require("ItemTracker");
const ItemData = artifacts.require("ItemData");
const Vault = artifacts.require("Vault");
const Profile = artifacts.require("Profile");
const nHomes = artifacts.require("nHomes");
const nWonderland = artifacts.require("nWonderland");


module.exports = function(deployer) {
  deployer.deploy(EncryptionTools);
  deployer.deploy(ItemTracker);
  deployer.deploy(ItemData);
  deployer.deploy(Vault);
  deployer.deploy(Profile);
  deployer.deploy(nHomes);
  deployer.deploy(nWonderland);
};