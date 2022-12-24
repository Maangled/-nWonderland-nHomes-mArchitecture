//TODO: turn this into useMemorize hook
// this button is used to store the current quest in the quest browser in the user's local storage
// for now, we are going to use the first profile in the user's profile list and turn it into a contract profile
// use moralis to get the user's profile list and then use the first profile in the list to create a contract profile
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
        const result = await Moralis.Cloud.run('createContractProfile', { data: attributes }).then((result) => {
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