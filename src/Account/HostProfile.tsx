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
    setProfile(getProfile());
    setProfileID((await profile).id);
    setProfileTitle((await profile).title);
    setProfileDescription((await profile).description);
    setProfileContent((await profile).content);
    setProfileTags((await profile).tags);
    setProfileAITools((await profile).aiTools);
    setProfileLog((await profile).log);
    setProfileMetadata((await profile).metadata);

    return {profile, reformatProfile, profileID, profileTitle, profileDescription, profileContent, profileTags, profileAITools, profileLog, profileMetadata};
}



