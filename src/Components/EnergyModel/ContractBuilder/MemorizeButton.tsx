//TODO: turn this into useMemorize hook
// this button is used to store the current quest in the quest browser in the user's local storage as a contract profile
// attributes are passed in from the host bank model to the Energy Model to the contract builder to the memorize button
// the memorize button then calls the createContractProfile cloud function to store the contract profile in the user's local storage
import React, { FunctionComponent, useState, useEffect } from "react";
import styles from "../EnergyModel.module.css";
import Account from "../../../Account/Account";
import { utils } from "ethers";
import { useContract } from "../../../hooks/useContract";
import { useMoralis } from "react-moralis";
import { totalmem } from "os";
import { CatModelType } from "../../CatModel/CatButton/CatModelTypes";


export const MemorizeButton: FunctionComponent<CatModelType> = ({attributes}) => {
    const [isMemorizing, setIsMemorizing] = useState(false);
    const [isMemorized, setIsMemorized] = useState(false);
    const { Moralis } = useMoralis();
    const memorizeQuest = async () => {
        setIsMemorizing(true);
        console.log("memorizeQuest has been called" + attributes[0].data.id);
        await Moralis.Cloud.run('memorizeContract', attributes[0].data ).then((result) => {
        console.log("memorizeContract result: " + result);
        setIsMemorizing(false);
        setIsMemorized(true);
        });
    };
    // TODO: add popup to direct user to login if not logged in
    // this prevents the user from memorizing a quest without being logged in
    const showButton = (
        <button className={isMemorizing ? styles.tabOpen2 : styles.tabClosed2} onClick={memorizeQuest}>
    {isMemorizing ? "Memorizing..." : isMemorized ? "Memorized" : "Memorize"}
    </button> );
    
    return (
        <>
            {showButton}
        </>
    );
}