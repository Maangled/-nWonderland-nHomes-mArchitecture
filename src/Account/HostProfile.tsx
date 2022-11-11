import { useEffect, useState } from 'react';

//pulls data from the host
//checks if the host has a profile
//if they don't, it creates one
//if they do, it pulls the data from the vault, and sets the host profile


export default function hostProfile(account: any) {
    const accountInstance = account.useAccount();
    const hasProfile = accountInstance.hasProfile();
    const isHost = accountInstance.isHost();
    const [isHostCheckedIn, setIsHostCheckedIn] = useState(false);
    const [hostVault, setHostVault] = useState(null);
    const [hostSkills, setHostSkills] = useState(null);
    const [hostEquipment, setHostEquipment] = useState(null);
    const [hostLoadout, setHostLoadout] = useState(null);
    const [hostName, setHostName] = useState(null);
    if(isHost) {   // if the account is a guest
        if (hasProfile) {   // if the guest has a profile
            checkInHost(accountInstance.profile());   // set the guest profile
        }
        else{   // if the guest doesn't have a profile
            accountInstance.createProfile();    // create a profile for the guest
            checkInHost(accountInstance.profile());   // set the guest profile   
        }
    }
    function checkInHost(profile: any) { // set the guest profile
        setHostVault(profile.getVault());
        setHostSkills(profile.getSkills());
        setHostEquipment(profile.getEquipment());
        setHostLoadout(profile.getLoadout());
        setHostName(profile.getName());
        setIsHostCheckedIn(true);
    }
    function getHostVault() {
        if(isHostCheckedIn) {
            return hostVault;
        }
    }
    function getHostSkills() {
        if(isHostCheckedIn) {
            return hostSkills;
        }
    }
    function getHostEquipment() {
        if(isHostCheckedIn) {
            return hostEquipment;
        }
    }
    function getHostLoadout() {
        if(isHostCheckedIn) {
            return hostLoadout;
        }
    }
    function getHostName() {
        if(isHostCheckedIn) {
            return hostName;
        }
    }
    function getHostProfile() {
        if(isHostCheckedIn) {
            return {
                hostVault,
                hostSkills,
                hostEquipment,
                hostLoadout,
                hostName
            }
        }
    }
}