const EncryptionTools = artifacts.require("EncryptionTools");
const ItemTracker = artifacts.require("ItemTracker");

module.exports = function(deployer) {
  deployer.deploy(EncryptionTools);
  deployer.deploy(ItemTracker);
};