// this button is used to store the current quest in the quest browser in the user's local storage

import React, { FunctionComponent, useState, useEffect } from "react";
import styles from "../EnergyModel.module.css";
import Account from "../../../Account/Account";
import { utils } from "ethers";
import { useContract } from "../../../hooks/useContract";
import { useMoralis } from "react-moralis";
import { totalmem } from "os";

type MemorizeButtonType = {
    questId: string;
    title: string;
    description: string;
    content: string;
    tags: string;
    AITools: string;
    Metadata: string;
    Log: string;
    onMemorize: (_questId: any, _title: any, _description: any, _content: any, _tags: any, _AITools: any, _Log: any, _Metadata: any) => {
        questId: string;
        title: string;
        description: string;
        content: string;
        tags: string;
        AITools: string;
        Log: string;
        Metadata: string;
    }; 
};

export const MemorizeButton: FunctionComponent<MemorizeButtonType> = ({ questId, title, description, content, tags, AITools, Metadata, Log, onMemorize }) => {
    const [balance, setBalance] = useState("0");
    const [isMemorizing, setIsMemorizing] = useState(false);
    const [isMemorized, setIsMemorized] = useState(false);
    const [state, setState] = useState({ loading: false, error: null, result: null });
    const { isAuthenticated } = useMoralis();
    const [ Quests, setQuests ] = useState([]);
    function useContractFunction(contract: any, functionName: string, options?: any)
    {
        return(
            async (...args: any[]) => {
                if (!contract) return;
                const tx = await contract[functionName](...args, options);
                await tx.wait();
                return tx;
            }
        );
    };
    const { loading, error, result } = state;
    const memorizeQuest = async () => {
        setIsMemorizing(true);
        await onMemorize(questId, title, description, content, tags, AITools, Metadata, Log);
        setIsMemorizing(false);
        setIsMemorized(true);
    };
    // TODO: add popup to direct user to login if not logged in
    // this prevents the user from memorizing a quest without being logged in
    const showButton = isAuthenticated ? (
        <button className={isMemorizing ? styles.tabOpen2 : styles.tabClosed2} onClick={memorizeQuest}>
    {isMemorizing ? "Memorizing..." : isMemorized ? "Memorized" : "Memorize"}
    </button> ): ( <button className={styles.tabClosed2}>Memorize</button>);
    return (
        <>
            {showButton}
        </>
    );
}