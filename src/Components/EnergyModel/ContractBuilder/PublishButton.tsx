// This button is used to publish the current quest in the quest browser to the blockchain
// for now, we are going to use the first contract profile in the user's profile list upload it using the nHive contract


import React, { FunctionComponent, useState, useEffect } from "react";
import styles from "../EnergyModel.module.css";

import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import { utils } from "ethers";
import { useMoralis } from "react-moralis";


type PublishButtonType = {
    questId: string;
    title: string;
    description: string;
    content: string;
    tags: string;
    AITools: string;
    Log: string;
    Metadata: string;
    onPublish: (_questId: any, _title: any, _description: any, _content: any, _tags: any, _AITools: any, _Log: any, _Metadata: any) => {
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

export const PublishButton: FunctionComponent<PublishButtonType> = ({ questId, title, description, content, tags, AITools, Log, Metadata, onPublish }) => {
    const [balance, setBalance] = useState("0");
    const [isPublishing, setIsPublishing] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [state, setState] = useState({ loading: false, error: null, result: null });
    const { user, isAuthenticated } = useMoralis();
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

    const publishQuest = async () => {
        setIsPublishing(true);
        await onPublish(questId, title, description, content, tags, AITools, Metadata, Log);
        setIsPublishing(false);
        setIsPublished(true);
    };
    const dalilamaContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = [
        "function publishQuest(string memory _questId, string memory _title, string memory _description, string memory _content, string memory _tags, string memory _AITools, string memory _Metadata, string memory _Log) public"
    ];



    return (
        <div className={styles.memorizeButtonDiv}>
            <button className={styles.tabClosed2} onClick={() => publishQuest()}>
                {isPublishing && <div className={styles.loadingSpinner} />}
                {!isPublishing && !isPublished && <div className={styles.memorizeButtonText}>Publish</div>}
                {isPublished && <div className={styles.memorizeButtonText}>Published</div>}
            </button>
        </div>
    );
};

