// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

// DaBloonCAT (DaCAT) v1.0.0
// DBC is a contract that manages the creation and transfer of DabloonCATs
// DBC: createDabloonCAT
// DaBloonCATs are given to you in exchange for publishing content on the nWonderland platform
// every time you watch content on the nWonderland platform, you will receive 1 Dabloon (DaBLOON)
// if you watch content with homework enabled, you will receive 4 DabloonCATs
// homework is an optional feature that runs transactions on your behalf
    // when you do your own homework, you will receive 1 DabloonCAT
    // when you verify your homework, you will receive 3 DabloonCATs
    // doing homework runs an AI algorithm on your behalf
    // verifying homework 
// every time you publish content on the nWonderland platform, you will receive 1 DabloonCAT (DaCAT)
// every time you like, comment, or share content on the nWonderland platform, give the cat a dabloon.
// dabloon cat is a token that represents the value of your content.
// dabloonCATs are used to buy and sell content on the nWonderland platform
// the nWonderland platform is a decentralized content marketplace
// it is only possible to buy and sell content on the nWonderland platform with DabloonCATs
// DabloonCATs are the only currency on the nWonderland platform
// The nWonderland platform is only accessible to users through the a nHome (nH) smart contract
// this contract creates a virtual home identical to your physical home by logging your software and hardware.
// This creates a more secure and private enviornment that is not accessible to the public but has trustless abilities to perform 
// transactions on your behalf. It's designed to keep extensive logs of your items and activities to ensure that you are not
// being scammed or hacked. It creates these items as vaults of logs map the items and activities of your home.
// It's important to realize that privacy is not the same as security. Privacy is the ability to keep your information private.
// Security is the ability to keep your information safe. Privacy is a right, security is a responsibility.
// Privacy then must be managed between individuals within the same home. Security must be managed by the home itself.
// The DaBloonCAT Money system is a way to manage the value of your items and activities within your home. You can use it to buy and sell
// items and activities within your home, creating a virtual economy for chores, entertainment, and other activities.
// The nWonderland platform is a way to access the nHome network from anywhere in the world. It's a way to access your home from anywhere.
// since the nHome network is a private network, the nWonderland platform can be used to share parts of your home with the public. 
// since we are taking recordings of regular interactions, we can post them in a way that allows them to be viewed in virtual reality.
// with advanced AI computer vision, it is possible to create games and other interactive experiences based on the recordings with 
// added compositional elements, different camera angles, and other effects.
// the nWonderland platform is a way to share your home with the world. The nHomes platform enables it by creating a safe infastructure network
// for all of your personal data, and divides ownership and identity through profiles and vaults.
// If you are an expert in a field, you can create a profile and share your knowledge so that it trains an AI algorithm directly tied to your identity.
// Other users can then use your profile to train their own AI algorithms. I call this the "AI as a Service" model. My goal is to create a
// decentralized AI as a service marketplace where users can buy and sell AI algorithms. This will be the first decentralized marketplace
// to encorporate AI algorithms that are trained by the users themselves as they use the platform to redeem DabloonCATs by logging their activities.
// These AI algorithms will be used to create virtual reality experiences, games, and other interactive experiences that are based on the
// content that is shared on the nWonderland platform. Everyone gets rewarded for doing what they already do, get experience points through
// virtual and augmented reality teaching and learning experiences, and get paid for their content.

contract DabloonCAT is Initializable, ERC20Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC20_init("DabloonCAT", "DaCAT");
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}
}