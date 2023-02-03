// we need to make a library that will allow us to get the information from the profile and send it to the contract builder
// it will contain the following functions:
// getProfile()
// setProfile()
// getProfileID()
// getProfileTitle()
// getProfileDescription()
// getProfileContent()
// getProfileTags()
// getProfileAITools()
// getProfileLog()
// getProfileMetadata()

import React, { useState, useEffect, FunctionComponent } from 'react';
import { useMoralis } from "react-moralis";
import GuestProfile from './GuestProfile';
import { BuilderStateVariables } from '../Components/EnergyModel/ContractBuilder/BuilderStateVariables';
import { CatAttributeType, CatModelType, defaultCatModel } from '../Components/CatModel/CatButton/CatModelTypes';

// host profile contains the information about the host
// this information will be used to create a tab in the energy browser
// this tab will be used change the settings of the host
// the content will contain the information about the host
// the title will contain a description of the host
// the tags will contain the type of host
// the description will contain the description of the host
// the aiTools will contain the ai tools that the host has on deck
// the log will contain the security log of the host
// the metadata will contain the contractual obligations of the host including the terms and conditions

// the Host Profile will store 5 variables that are the metadata structure of nft Profiles for the energy browser
    // Host Profile will be the first ContractProfile and all updates from the nether will be will be stored there.
        // state updates will be stored as sub profiles
        // contract updates will be stored as additional vaults
    // The Guest Profile will be the second ContractProfile and it will only contain the log from the nether server.
        // the guest actions will be stored as sub profiles
        // other guest profiles will be stored as additional vaults
    // The Edge Vault will be a wallet user that will have a contract with the host profile as a profile in the guest profile
        // the edge vault will be used to store the data from edge devices, the displayed edge device will be the wonderland "edge device"/human profile
        // other edge vaultes, ie cameras, will be dormant unless 
    // The Node Vault will be the third party contracts that the user has access too, ie the energy grid
        // the node vault will be used to store the data from the web, as needed and downloadable where it moves the cloud(this) to the guest profile
    // The Trade Vault will be the fourth party contracts that the user has access too, ie the dream market
        // these contracts experiment on other contracts and are publically available
        // they are all opensource by default and log credit to changes made to the contracts through anonymous claimable transactions

    // 1 listen for updates from the nether server
    // 2. copy the contract profile from the nether server to the host profile
    // 3. duplicate it as the guest profile
    // 4. create a subprofile for the edge vault
    // 5. create a subprofile for the node vault
    //    001Hostprofile{
    //     002guestbook{
    //         GuestProfile{
    //             003edgevault{
    //                 {NodeVault
    //                     NodeProfile
    //                 }
    //             }
    //         }
    //     004NodeBook{
    //         NodeProfile{
    //             edgevault{
    //                 {NodeVault
    //                     NodeProfile
    //                 }
    //         }
    //     }
    //     005TradeBook{
    //         TradeProfile{
    //             edgevault{
    //                 {NodeVault
    //                     NodeProfile
    //                 }
    //         }      
    //     }
    // }



export const HostProfile = async () => {
    const { Moralis } = useMoralis();
    const [profile, setProfile] = useState<any>(null);
    const [profileID, setProfileID] = useState<any>(null); 
    const [profileTitle, setProfileTitle] = useState<any>(null);
    const [profileDescription, setProfileDescription] = useState<any>(null);
    const [profileContent, setProfileContent] = useState<any>(null);
    const [profileTags, setProfileTags] = useState<any>(null);
    const [profileAITools, setProfileAITools] = useState<any>(null);
    const [profileLog, setProfileLog] = useState<any>(null);
    const [profileMetadata, setProfileMetadata] = useState<any>(null);
    const [HostProfile, setHostProfile] = useState<any>(null);
    const [GuestProfile, setGuestProfile] = useState<any>(null);
    const [EdgeProfile, setEdgeProfile] = useState<any>(null);
    const [NodeProfile, setNodeProfile] = useState<any>(null);
    const [TradeProfile, setTradeProfile] = useState<any>(null);
    const [guestBook, setGuestBook] = useState<CatAttributeType[]>([]);

    // this is the first contract profile and it controls the settings on which the web3 app will run
    const getProfile = async () => {
        const hostProfile = await Moralis.Cloud.run("getHostProfile");
        return hostProfile as any;
    }

    // temp function to test the memorize button
    const reformatProfile = async () => {
        const profile = getProfile();
        const newContractProfile = {
            id: [(await profile).id],
            title: [(await profile).name],
            tags: [(await profile).type],
            description: [(await profile).description],
            content: [(await profile)],
            aiTools: [],
            metadata: [],
            log: [],
            nodes: [],
            edges: [],
            trades: [],
        };
        return newContractProfile;
    }

    const makeGuestBook = async () => {
        let guestBookfile = await Moralis.Cloud.run("registerNewHive");
        setGuestBook(guestBookfile);
        return guestBook;
    }
    setProfile(getProfile());
    setHostProfile(getProfile());
    setProfileID((await profile).id);
    setProfileTitle((await profile).title);
    setProfileDescription((await profile).description);
    setProfileContent((await profile).content);
    setProfileTags((await profile).tags);
    setProfileAITools((await profile).aiTools);
    setProfileLog((await profile).log);
    setProfileMetadata((await profile).metadata);
    setGuestBook(await makeGuestBook());
    return {profile, HostProfile, profileID, profileTitle, profileDescription, profileContent, profileTags, profileAITools, profileLog, profileMetadata,
            guestBook, makeGuestBook, GuestProfile, EdgeProfile, NodeProfile, TradeProfile
    };
}



