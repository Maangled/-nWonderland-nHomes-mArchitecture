// home server button will return the home server button component used in the bank model
// it will return the component and will check for a local server
// when it confirms the connection to the local server it will return false

import { FunctionComponent, useState, useCallback, useEffect, useRef } from "react";
import styles from ".././HostBankModel.module.css";
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download'
import { useMoralis, useNFTBalances } from "react-moralis";


type HomeServerType = {
    setServerStatusConnection(running: boolean): () => Boolean;
}

export const useHomeServer: FunctionComponent<HomeServerType> = ({ setServerStatusConnection, ...rest }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectStatusFailed, setConnectStatusFailed] = useState("Welcome Home");
    const [connectStatus, setConnectStatus] = useState("Connect to Server");
    const { Moralis, serverUrl, appId } = useMoralis();


    // create a function that will check if the host is valid
    const checkIfServerIsRunning = async () => {
        console.log("checkIfServerIsRunning");
        // create a timer for 5 seconds then reset the setConnectStatusFailed to "Hello World"
        setConnectStatusFailed("Server is not running");
        setTimeout(() => {
            setConnectStatusFailed('Please download the server and run it');
        }, 5000);
        // set the status to "Connecting to server..."
        const data = await Moralis.Cloud.run("checkIfServerIsRunning", { serverUrl, appId });
        console.log("data", data);
        if (data === "running") {
            setServerStatusConnection(true);
            // setIsHostConnected(true);
            // getProfileList();
        }
    }
    const downloadServer = async () => {
        // open open ipfs download link
    }

    const homeServerButton = (
        <>
            <div>Hello Hero</div>
            <div className={styles.subTitle}>{connectStatusFailed}</div>
            <button className={styles.connectToServerContainer} onClick={checkIfServerIsRunning}>{connectStatus}</button>
            <button className={styles.downloadText} onClick={downloadServer}><div className={styles.rowize}><UseAnimations animation={download} strokeColor={"white"} autoplay={true} loop={true} />Download Local Server</div></button>
        </>
    );

    return homeServerButton;

}
