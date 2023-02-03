// create a hook based on this function: 
// const checkIfServerIsRunning = async () => {
//     console.log("checkIfServerIsRunning");
//     // create a timer for 5 seconds then reset the setConnectStatusFailed to "Hello World"
//     setConnectStatusFailed("Server is not running");
//     setTimeout(() => {
//       setConnectStatusFailed('Please download the server and run it');
//     }, 5000);
//     // set the status to "Connecting to server..."
//     const data = await Moralis.Cloud.run("checkIfServerIsRunning", { serverUrl, appId });
//     console.log("data", data);
//     if (data === "running") {
//       setIsHostConnected(true);
//       getProfileList();
    
//     }
//   }

import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export const useServer = () => {
    const [isHostConnected, setIsHostConnected] = useState(false);
    const [connectStatusFailed, setConnectStatusFailed] = useState('Hello World');
    const [profileList, setProfileList] = useState([]);
    const { Moralis } = useMoralis();
    const serverUrl = 'http://localhost:1337/parse';
    const appId = 'myAppId';
    const getProfileList = async () => {
        const data = await Moralis.Cloud.run('getProfileList', { serverUrl, appId });
        setProfileList(data);
    }
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
          setIsHostConnected(true);
          getProfileList();
        
        }
      }
    useEffect(() => {
        checkIfServerIsRunning();
    }, []);
    return { isHostConnected, connectStatusFailed, profileList };
}
