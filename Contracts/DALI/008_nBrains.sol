// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract nBrains {
    address public nHomes;
    address public nWonderland;
    address public nFamiliars;
    address public nAvatars;

    // trade struct for version 1.0.0 of Trade
    struct Trade {
        uint256 itemID;
        uint256 price;
        address seller;
        address buyer;
    }

    uint256 public tradeID;
    mapping (uint256 => Trade) internal trades;

    // creates a Matter Card the nHomes to pause the most accurate (highest security rating) vault that runs the server. (Generally this will only be one vault, 
    // unless the server is running on a personal computer or phone, in which case there will be multiple vaults tracking outgoing data)
    // The Matter Card will contain metadata with the following information:
        // 1. The nHomes contract address and an encryption method for the data
        // 2. A security rating for the vaults that are being paused
        // 3. The nWonderland contract address and an encryption method for the data
        // 4. A description of the system and it's security measures
        // 5. A Phoenix Seal of the Vaults themselves (phoenix is a open source Neural Network that uses Microsoft's SEAL library to encrypt data in a way that is secure and delivers reliability guarentees without latencies)
        // 6. The list of AI tools that that server supports
        // 7. The log of the server's activity since the last freeze (this will be used to recreate the server's state as a vault that log items)
        // 8. The list of vaults that are being called for by the trade
    // The Matter Card profile that is created will be randomly assigned a signiture key using a non-deterministic algorithm and send it to a slot in the Brain Trust.
    // The nWonderland's profile must then delegate a specific vault to the nHomes contract to create the Matter Card.
    // This Vault, nFamiliar (generally a NFT chosen by the player) will the execute the phoenix seal on the Matter Card and confirm the rest of the metadata using a trusted node.
    // This contract will freeze the vault of the nFamiliar that is chosen by the player so that the permissions granted to nFamiliar cannot be used to run attacks on the Matter Card's metadata.
    // The nFamiliar will then trade a Energy Card to the nWonderland where the vault content (5) has been replaced with a security and reliability ratings for the rest of the information in the Matter Card.
    // The nWonderland contract can then call this contract to create a trade if they are satisfied with the Energy Card's metadata.
    // Then this contract calls an nWonderland contract to create a trade.
    // The Energy Card will call for specific data from specific vaults within the nWonderland profile and the profile will generate a
    // data Card that contains those vaults.
    // The Data Card will then be given a random signature key and sent to a slot in the Brain Trust where the familiar will be able to find it.
    // The familiar will then execute the Phoenix Seal on the Data Card using the vaults contained in the Matter Card's metadata.
    // When the transaction is confirmed, the nFamiliar will then burn the Content of all the vaults and create a nAvatar that that the player and the nHome can use to access the data.
    // The nHome will generally require the nAvatar to send anonymous statistics about the data that is being accessed to the AI Tool Trust that is being run on the data.
    // The nWonderland will have full access to the results of the Machine Learning algorithm that the AI Tool Trust is ran on the data.
    // The AI Tool Trust will run MVP simulations of the statistics that are being sent to it and report the impact the player's data had back to the nAvatar.
    // The player can choose to claim the statistics as conditional vaults called MED Cards that allow the player to prove their knowledge of the data to other players anonymously.
    // After a certain amount of time, the nAvatar will archive the data and the players who hold the MED Cards will be awarded a Satori Card that contains differnet degrees
    // of knowledge the profile has been verified to know. 
    // After collecting a certain amount of Satori Cards, the player will be able to claim a Hero Card that contains the profile's alignment.
    // Hero Cards use the same system as MED Cards, but instead of using the nWonderland profile, they use bio-metric data from the player's body and compartmentalize it into the profile.
    // Hero Cards attempt to track the player through time and space and keep a record of their actions and throughts by anonymizing the data and spreading it across the network as a learning algorithm.
    // Hero Cards can be collected to open up new paths in the game and unlock new abilities. Gathering enough Hero Cards in a certain field will allow the player to claim a Hero Academy 
    // and making voting proposals based on their knowledge of the field. 
    // When a Hero leaves the game, their Hero Card will be paused until the the Hero Protagonist can confidently align the Hero's actions with their own.
    // Hero Cards never need to be claimed, and players can always keep their data private by storing satori cards in their nWonderland profile. Thus eliminating the risk of losing their identity.
    // Hero Cards also can be claimed by anyone who demonstrates the knowledge that the Hero Card contains. In this way, anyone can become a Hero and anyone can trade their proof of knowledge for 
    // perminate infuence over what is considered knowledge in the game based on their own personal experiences.
    // and anyone can earn Hero Coins by trading their data statistics to the Hero Card Trust in order the build the accuracy of the Hero Card and do good for the game/world.
    // in this way, the Hero Card Trust is a decentralized AI that is run by the players and the players can earn Hero Coins by trading their data to the trust.
    // and players that have the greatest ideas or have proven to know the most about the network get priviledged permissions in voting and opportunities, rewarding them for their contributions.
    // without the need for a central authority to decide who is worthy of the priviledges, and without avenues for hording of wealth or power.
    // The Hero Card Trust will be run by the Hero Card Trust Council, which is a group of Hero Cards that have been voted into the council by the Hero Card Trust. 
    // Hero Cards will then have MVP simulations run on them using cost-benefit analysis to determine if they are worthy of being voted into the council. If they are not,
    // nAvatars will attempt to penetrate the Hero Card's metadata by randomly comparing snippits of it's own metadata to that of the card using the MED Card system in order to
    // find the reason why the Hero Card is not worthy. when the nAvatar finds a jinx, a snippit of metadata that matches the Hero Card's metadata, it will run a closed loop simulation
    // of that moment in time tweaking the metadata to see what would have happened if the Hero Card's metadata was different or updated. If the simulation will keep going on until it
    // finds a moment in time where the Hero Card's metadata is different and the simulation is successful. If the simulation is successful, the Hero Card will be tangled with a jinx that 
    // can be removed by the Card's owner by updating their knowledge on a certain topic. If the simulation is not successful, the Hero Card will turn into a demon card and it can be 
    // used to remove innacuracies and biases from Machine Learning algorithms.

    // Furthermore, nHomes will be able to compete for Hero Cards by creating a Hero Card Trust within local networks and communities that root out evil within the machine learning algorithms
    // that are being used to provide predictive safety analytics that reward good predictions and identify unsafe predictions through simulations and statistical analysis.
    

    // 
    // The metadata will call for specific data from specific vaults
    // 
    // the trade is stored in the trades mapping. 
    // creates an NFT by randomly placing the trade into a slot in an array of 10,000,000 trades
    // the trade is stored in the trades mapping
    // the tradeID is returned



}