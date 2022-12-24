// lets create a bank that is locked by a wallet signature

import React, { useState, useEffect, FunctionComponent } from 'react';
import { useMoralis } from "react-moralis";
import { BankModel } from './BankModel';
import { WalletModel } from './WalletModel';
import styles from './BankModels.module.css';

//TODO: figure out why isAuthenticated is not updating when the user logs in

// create a type for the props
type BankModelsType = {
    // onClose lets the parent component know when the user closes the popup
    onClose?: () => void;

};

// create a function component that displays the user bank model and host bank model in a popup
// the banks should be tabs with hover effects that show the user a preview of the bank (quick view)
// the user should be able to click on the bank to open it

export const WalletBank: FunctionComponent<BankModelsType> = ({ onClose}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log("isAuthenticated: ", isAuthenticated)
    const guestAuthenticatedModel = isAuthenticated ? ((
        // if the user is authenticated, show the user bank model
        <div className={styles.bankModelsDiv1}>
            <BankModel />
        </div>
    )) : ((
        // if the user is not authenticated, show a blank bank model with a login button
        <div className={styles.div}>
            <div className={styles.bankModelDiv1}>
                <BankModel />
            </div>
            <div className={styles.walletModelDiv}>
                <WalletModel setIsAuthenticated={setIsAuthenticated}  />
            </div>
        </div>
    ));

    return (
        <>
        {guestAuthenticatedModel}
        </>
    );
};