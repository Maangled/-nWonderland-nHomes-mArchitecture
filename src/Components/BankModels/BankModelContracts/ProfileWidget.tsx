import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from '../HostBank/HostBankModel.module.css';
import { VaultWidget } from './VaultWidget';
import { EncryptionTools } from './EncryptionTools';
import { ItemDisplacer } from './ItemDisplacer';
import { ItemTracker } from './ItemTracker';
import { CatModelType } from '../../CatModel/CatButton/CatModelTypes';
import { EnergyModel } from '../../EnergyModel/EnergyModel';

// This is a placeholder for the Profile page.  This page will be used to display the profile of the user.
// Profiles will include a list of vaults that the user has access to by displaying the main four vaults and and the fifth as the header
export const Profile: FunctionComponent<CatModelType> = ({attributes, setEnergyModelState, energyModelState, ...rest}) => {
    console.log("Profile Widget has refreshed")
    const [vault, setVault] = useState(attributes);
    const [energyModel, setEnergyModel] = useState(0);
    useEffect(() => {
        setVault(attributes);
    }, [attributes]);
    useEffect(() => {
        console.log("Energy Model State has been set")
        console.log("Energy Model State has been set")
    }, [setEnergyModelState]);
    return (
        <div className={styles.bodyDiv}>
            <div className={styles.rowCard}>
                <div className={styles.card}>
                    <VaultWidget attributes={vault} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />
                    <div className={styles.skillsWidgetDiv}>
                        <div className={styles.skillsDiv}>Skills</div>
                        <img
                            className={styles.guestWalletIcon2}
                            alt=""
                            src="guest-wallet47.svg" />
                        <img
                            className={styles.guestWalletIcon3}
                            alt=""
                            src="guest-wallet48.svg" />
                        <img
                            className={styles.guestWalletIcon4}
                            alt=""
                            src="guest-wallet49.svg" />
                        <img
                            className={styles.guestWalletIcon5}
                            alt=""
                            src="guest-wallet50.svg" />
                        <img
                            className={styles.guestWalletIcon6}
                            alt=""
                            src="guest-wallet51.svg" />
                        <img
                            className={styles.guestWalletIcon7}
                            alt=""
                            src="guest-wallet52.svg" />
                        <img
                            className={styles.guestWalletIcon8}
                            alt=""
                            src="guest-wallet53.svg" />
                        <img
                            className={styles.guestWalletIcon9}
                            alt=""
                            src="guest-wallet54.svg" />
                        <b className={styles.runningB}>Running</b>
                        <b className={styles.runningB1}>Running</b>
                        <b className={styles.runningB2}>Running</b>
                        <b className={styles.runningB3}>Running</b>
                        <b className={styles.runningB4}>Running</b>
                        <b className={styles.runningB5}>Running</b>
                        <b className={styles.runningB6}>Running</b>
                        <b className={styles.runningB7}>Running</b>
                        <div className={styles.lVL5EXP4330}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43301}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43302}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43303}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43304}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43305}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43306}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43307}>LVL 5 EXP 4330</div>
                    </div>
                </div>
                <div className={styles.bankContentDiv1}>
                    <div className={styles.equipmentWidgetDiv}>
                        <div className={styles.equipmentDiv}>Equipment</div>
                        <img
                            className={styles.guestWalletIcon10}
                            alt=""
                            src="guest-wallet55.svg" />
                        <img
                            className={styles.guestWalletIcon11}
                            alt=""
                            src="guest-wallet56.svg" />
                        <img
                            className={styles.guestWalletIcon12}
                            alt=""
                            src="guest-wallet57.svg" />
                        <img
                            className={styles.guestWalletIcon13}
                            alt=""
                            src="guest-wallet58.svg" />
                        <img
                            className={styles.guestWalletIcon14}
                            alt=""
                            src="guest-wallet59.svg" />
                        <img
                            className={styles.guestWalletIcon15}
                            alt=""
                            src="guest-wallet60.svg" />
                        <img
                            className={styles.guestWalletIcon16}
                            alt=""
                            src="guest-wallet61.svg" />
                        <img
                            className={styles.guestWalletIcon17}
                            alt=""
                            src="guest-wallet62.svg" />
                        <b className={styles.runningB8}>Running</b>
                        <b className={styles.runningB9}>Running</b>
                        <b className={styles.runningB10}>Running</b>
                        <b className={styles.runningB11}>Running</b>
                        <b className={styles.runningB12}>Running</b>
                        <b className={styles.runningB13}>Running</b>
                        <b className={styles.runningB14}>Running</b>
                        <b className={styles.runningB15}>Running</b>
                        <div className={styles.lVL5EXP43308}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP43309}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433010}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433011}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433012}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433013}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433014}>LVL 5 EXP 4330</div>
                        <div className={styles.lVL5EXP433015}>LVL 5 EXP 4330</div>
                    </div>
                    <div className={styles.loadoutWidgetDiv}>
                        <div className={styles.loadoutDiv}>Loadout</div>
                        <div className={styles.guestWalletDiv} />
                        <img
                            className={styles.guestWalletIcon18}
                            alt=""
                            src="guest-wallet63.svg" />
                        <b className={styles.combatLevel}>Combat Level</b>
                        <div className={styles.lVL65EXP23m}>LVL 65 EXP 2.3m</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProfileViewer: FunctionComponent<CatModelType> = ({attributes}) => {
    console.log("Profile Viewer has Refreshed")
    // lets create a new array of attributes that handles undefined values
    const [cardTitle, setCardTitle] = useState('Error');
    const [cardDescription, setCardDescription] = useState('Error');
    const [cardID, setCardID] = useState('Error');
    // create a catch to set the values to the default values if the attributes are undefined
    useEffect(() => {
        if (attributes?.[0]?.data) {
            try{
            setCardTitle(attributes?.[0].data?.title?.[0]);
            setCardDescription(attributes?.[0].data?.description?.[0]);
            setCardID(attributes?.[0].data?.id?.[0]);
            } catch (e) {
                console.log(e)
        } 
    }
    }, [attributes]);

    return (
        <div className={styles.Cards}>
            <div className={styles.rowCard}>
                <img className={styles.imageCard} alt="" src="avatar-img-1@2x.png" />
                <div className={styles.card}>
                    <div className={styles.colCard}>
                        <div className={styles.cardBigTitle}>{cardTitle}</div>
                        <div className={styles.cardMedText}>{cardID}</div>
                        <div className={styles.cardTitle}>{cardDescription}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};