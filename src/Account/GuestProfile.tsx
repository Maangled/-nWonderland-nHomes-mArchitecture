import { useEffect, useState } from 'react';
import styles from "../css/BankModel.module.css";

// pulls data from the guest
// if there are no guests, it creates a guest
// checks if the guest has a profile
// if they don't, it creates one
// if they do, it pulls the data from the vault, and sets the guest profile


export default function GuestProfile(account: any) {
    const accountInstance = account.useAccount();
    const hasProfile = accountInstance.hasProfile();
    const isGuest = account.isGuest();
    const [isGuestCheckedIn, setIsGuestCheckedIn] = useState(false);
    const [guestVault, setGuestVault] = useState(null);
    const [guestSkills, setGuestSkills] = useState(null);
    const [guestEquipment, setGuestEquipment] = useState(null);
    const [guestLoadout, setGuestLoadout] = useState(null);
    const [guestName, setGuestName] = useState(null);
    const [guestBio, setGuestBio] = useState(null);
    function useGuestProfile() {
    if(isGuest) {   // if the account is a guest
        if (hasProfile) {   // if the guest has a profile
            checkInGuest(accountInstance.profile());   // set the guest profile
            }
        else{   // if the guest doesn't have a profile
            accountInstance.createProfile();    // create a profile for the guest
            checkInGuest(accountInstance.profile());   // set the guest profile   
            }
        }
    }
    function checkInGuest(profile: any) { // set the guest profile
        setGuestVault(profile.getVault());
        setGuestSkills(profile.getSkills());
        setGuestEquipment(profile.getEquipment());
        setGuestLoadout(profile.getLoadout());
        setGuestName(profile.getName());
        setIsGuestCheckedIn(true);
    }
    function getGuestVault() {
        if(isGuestCheckedIn) {
            return guestVault;
        }
    }
    function getGuestSkills() {
        if(isGuestCheckedIn) {
            return guestSkills;
        }
    }
    function getGuestEquipment() {
        if(isGuestCheckedIn) {
            return guestEquipment;
        }
    }
    function getGuestLoadout() {
        if(isGuestCheckedIn) {
            return guestLoadout;
        }
    }
    function getGuestName() {
        if(isGuestCheckedIn) {
            return <div className={styles.heroProtagonistDiv}>{guestName}</div>;
        }
    }
    function getGuestBio(){
        if(isGuestCheckedIn) {
            return <div className={styles.formingTheSuperheroAcadamy}>{guestBio}</div>;
        }
    function getGuestProfile() {
        if(isGuestCheckedIn) {
            return {
                guestVault,
                guestSkills,
                guestEquipment,
                guestLoadout,
                guestName
            }
        }
    }
}
}

