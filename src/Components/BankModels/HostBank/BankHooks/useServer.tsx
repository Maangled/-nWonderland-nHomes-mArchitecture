// create a hook that will hold all of the calls to the server status

import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { CatAttributeType } from "../../../CatModel/CatButton/CatModelTypes";
import { useTransfer } from "./useTransfer";

export const useServer = (onPause: boolean | undefined) => {
    console.log("useServer", onPause)
    const [isHostConnected, setIsHostConnected] = useState(false);
    const {Moralis} = useMoralis();
    const [connectStatusFailed, setConnectStatusFailed] = useState(
        "Hello World"
    );
    const { serverUrl, appId } = useMoralis();
    const [profileList, setProfileList] = useState([]as any);
    const [hostTitle, setHostTitle] = useState("Hello World");
    const [hostAddress, setHostAddress] = useState("Hello World");
    const [isHostValid, setIsHostValid] = useState(false);
    let pause = onPause
    let [contractProfileList, setContractProfileList] = useState([] as CatAttributeType[]);
    let contractSyncErrorLog: any[] = [];

    const getProfileList = async () => {
        const data = await Moralis.Cloud.run("getProfileList", { serverUrl, appId });
        console.log("getProfileList", data);
        setProfileList(data);
        console.log("profileList", profileList)
    }
    
    const checkIfServerIsRunning = async () => {
        console.log("checkIfServerIsRunning");
        // create a timer for 5 seconds then reset the setConnectStatusFailed to "Hello World"
        setConnectStatusFailed("Server is not running");
        setTimeout(() => {
        setConnectStatusFailed("Please download the server and run it");
        }, 5000);
        // set the status to "Connecting to server..."
        const data = await Moralis.Cloud.run("checkIfServerIsRunning", {
        serverUrl,
        appId,
        });
        console.log("data", data);
        if (data === "running") {
        setIsHostConnected(true);
        getProfileList();
        }
    };

    useEffect(() => {
        checkIfServerIsRunning();
    }
    , []);

    const disconnectFromHost = async () => {
    if (hostTitle === '') {
      setHostAddress("0x000000");
      setIsHostConnected(false);
      setIsHostValid(false);
      return undefined;
    } else if (hostTitle !== undefined) {
      let id = hostTitle;
      console.log("id", id);
      await Moralis.Cloud.run("deleteNode", { serverUrl, appId, id }).then((result: any) => {
        getProfileList();
        setHostTitle('');
        setIsHostValid(false);
      });
    }
  };

    const registerNewHive = async (title: string, address: string) => {
        console.log("registerNewHive", title, address);
        if (contractProfileList.length === 1) {
          await Moralis.Cloud.run("registerNewHive").then((result: any) => {
            console.log("registerNewHive", result);
            setHostTitle(title);
            setHostAddress(address);
            setIsHostValid(true);
            return true
          });
          setIsHostAddressValidated(true);
          setIsHostValid(true);
          console.log("contractProfileList", contractProfileList)
        } else {
          console.log("contractProfileList", contractProfileList)
          return false
        }
    };
    const handleDisconect = async () => {
      if (hostTitle === '') {
        setHostAddress("0x000000");
        //setIsHostConnected(false);
        setIsHostValid(false);
        return undefined;
      } else if (hostTitle !== undefined) {
        let id = hostTitle;
        console.log("id", id);
        await Moralis.Cloud.run("deleteNode", { serverUrl, appId, id }).then((result: any) => {
          getProfileList();
          setHostTitle('');
          setIsHostValid(false);
        });
      }
    };

    // use moralis to see if the user has authenticated
    const getUserAddress = async () => {
      const user = Moralis.User.current();
      if (user) {
        const address = user.get("ethAddress");
        console.log("address", address);
        return address;
      } else {
        return undefined;
      }
    };
        

    // TODO: create a useContractProfileList hook
    const getContractProfileLog = async () => {
      await Moralis.Cloud.run("getContractProfileLog", { serverUrl, appId }).then(async (result: any) => {
        if (result.length > 0) {
          onPause=true;
          // append the contractProfileList to the contractProfileList state array with the log data by splicing the contract into the array based on the id and status\
          // if the status is "0" then we will push the contract into the array
          // if the status is "1" then we will update the contract from the array based on the id
          // if the status is "2" then we will delete the contract in the array based on the id
          for (let i = 0; i < result.length; i++) {
            console.log("result", result[i])
            if (result[i].status === '0') {
              // push the contract to the end of the array
              contractProfileList.push({data:result[i].contract});
              console.log("contractProfileList", contractProfileList)
            }
            if (result[i].status === '1') {
              // update the contract in the array
              contractProfileList.splice(result[i].id, 1, {data:result[i].contract});
            }
            if (result[i].status === '2') {
              // delete the contract from the array
              contractProfileList.splice(result[i].id, 1);
            } else {
              // throw an error
              console.log("contract sync status error")
              //add results to error log
              contractSyncErrorLog.push(result[i])
            }
            console.log("contractProfileList", contractProfileList)
            setContractProfileList(contractProfileList);
          };
            // clear the contractProfileLog
            Moralis.Cloud.run("clearContractProfileLog", { serverUrl, appId }).then((result: any) => {
              console.log("contractProfileLog cleared");
              console.log("contractProfileList", contractProfileList)
            });
          // if the contractProfileList has two contracts then we will register the new hive

        } else {
          console.log("no new contracts");
        }
      });
    };

    
    
    return { 
      checkIfServerIsRunning, 
      getProfileList, 
      registerNewHive, 
      getUserAddress, 
      getContractProfileLog,
      handleDisconect, 
      disconnectFromHost,
      isHostConnected, 
      connectStatusFailed, 
      profileList, 
      hostTitle, 
      hostAddress, 
      isHostValid };
};

export default {useServer};

function setIsHostAddressValidated(arg0: boolean) {
  throw new Error("Function not implemented.");
}
