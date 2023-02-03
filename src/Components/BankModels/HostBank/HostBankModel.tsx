import { FunctionComponent, useEffect, useState } from "react";
import styles from "./HostBankModel.module.css";
import { useVerifyMetadata } from "../../../hooks/useVerifyMetadata";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Skeleton, Button } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../../helpers/networks";
import AddressInput from "../../../AddressInput";
import { ok } from "assert";
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'
import { disconnect } from "process";
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download'
import { connect } from "http2";
import { hostname } from "os";
import { ContractBuilder } from "../../EnergyModel/ContractBuilder/ContractBuilder";
import { WalletBank } from "../WalletBank";
import { EnergyModel } from "../../EnergyModel/EnergyModel";
import { BuilderStateVariables } from "../../EnergyModel/ContractBuilder/BuilderStateVariables";
import { Profile, ProfileViewer } from "../BankModelContracts/ProfileWidget";
import { HostProfile } from "../../../Account/HostProfile";
import { CatAttributeType, CatModelType, defaultCatModel } from "../../CatModel/CatButton/CatModelTypes";
import { useServer } from "../BankHooks/useServer";
import { useHomeServer } from "./BankHooks/useHomeServer";
import { WalletModel } from "../WalletModel";


type HostBankModelType = {
  onClose?: () => void;
  cast?: FunctionComponent;
  dataLayer?: any;
  addModel: Function;
  attributes: any;
  onPause: boolean;
  functions: any;
};

//TODO: make sure that the energy transactions dont start until the user has connected to the home server
// the first will be the bank itself, which will allow any user to inspect the hardware and software of the host using a downloadable node server.
  // it will contain the each component to the website and server as a card contract.
  // it will contain the web3 authentication contract, which will allow the user to connect to the home server.
// the second will be the Avatar profile, which displays the profiles of all devices connected to the network.
  // profiles can be added to the Avatar profile through trade with the authenification contract. 
// the third will be the energy model contract which contains the contract builder
  // where the user searches for things.
// the fourth will be the user's profile, which will be loaded into the energy model contract and blank until the user signs the contract.

// the fifth will be the contract builder, which will be a component that looks like a notepad with tabs on the top.


// the bank in the top left will be the host bank, a smart contract holding a list of hosts.
// the host bank will have what is called a ghost bank, which is a smart contract that is connected to a service on the local machine.
// the bank on top of the ghost bank will be a home profile, a smart contract that is connected to a service on the local area network.

// 
// The first contract in the host bank will be the ghost bank itself, which will allow any user to inspect the hardware and software of the host using a downloadable node server.
// The second contract in the host bank will be the home profile, which displays the profiles of all devices connected to the network.
// The third contract is the energy model contract which contains the contract builder and an empty profile.
// the fourth contract is signed using a wallet and loads the user's profile into the energy model contract.
// the fourth contract verifies offers a trade to the user before they sign the contract.
// The contract builder will be a component that looks like a notepad with tabs on the top.
// Title and description will be printed on the top of the notepad.
// The tabs will be titled: Content, Tags, AITools, Log, and Metadata. 

// 1. we have a check function to see if the home server is connected
// 2. we have a function that returns the list of profiles
// 3. now we need to be able to create a profile
// 4. we are going to get rid of the react select search and replace it with a host bank model per profile

// we are going to hide the entire component besides the input field until the user inputs a valid address
// this is to prevent the user from seeing a bunch of errors before they even input an address
// we are also going to add a download button that will allow the user to download a node server that will allow them to host their own NFTs

// HostProfilePicture is a component that will display the profile picture of the host
// HostName is a component that will display the name of the host
// HostTitle is a component that will display the title of the host
// HostDescription is a component that will display the description of the host (bio)
// HostVault is a component that will display the main vault of the host
// three subvaults will be displayed next to the main vault (skills, projects, and loadout)
// skills vault will display the projects of the host, videos and other media. 
// Equipment vault will what programs the host can do natively (we're going to start with OBS)
// loadout includes the equipment that is pinned to the display. (we're going to start with a webcam and a microphone)

// TODO: replace the react select search with the host title, host name, and host description when the host is connected
// right now it returns an error when useEffect is called to set the host title, host name, and host description using promises and async await functions saying the function is not defined

// we need to launch the contracts in successive order
// checkifserverisrunning -> getprofiles -> createprofile -> signprofile -> verifyprofile
// launchLocalNetwork -> nHomes -> nWonderland -> nProfile -> nVault -> nID -> nIT -> nET
// nID nIT and nET get launched when the user signs the profile as they are not required until content is being created


// 
export const HostBankModel: FunctionComponent<HostBankModelType> = ({ addModel, attributes, onPause, functions, ...rest }) => {
  console.log("Host Bank Model Has Been Refreshed");
  const { data: BankModeler } = useNFTBalances();
  const { Moralis, chainId, isAuthenticated } = useMoralis();
  const { verifyMetadata } = useVerifyMetadata();
  const { logout } = useMoralis();
  const [isHostValid, setIsHostValid] = useState(false);
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }
  const [isHostAddressValid, setIsHostAddressValid] = useState(false);
  const [isHostConnected, setIsHostConnected] = useState(false);
  const [hostTitle, setHostTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const appId = process.env.REACT_APP_APPLICATION_ID;
  const [nHomeContractAddress, setNHomeContractAddress] = useState("");
  const [connectStatus, setConnectStatus] = useState("Connect to Server");
  const [connectStatusFailed, setConnectStatusFailed] = useState("Welcome Home");
  const [hostAddress, setHostAddress] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [NftToSend, setNftToSend] = useState("");
  const [Visibility, setVisibility] = useState(false);
  const [verificationHash, setVerificationHash] = useState("");
  const [verificationHashModal, setVerificationHashModal] = useState(false);
  const [isHostAddressValidated, setIsHostAddressValidated] = useState(false);
  const [isHostAddressValidatingLoading, setIsHostAddressValidatingLoading] = useState(false);
  const [isHostAddressValidatingLoadingMessage, setIsHostAddressValidatingLoadingMessage] = useState('');
  const [isHostSelected, setIsHostSelected] = useState(false);
  const [contractProfileLog, setContractProfileLog] = useState([]);
  const [contractsSynced, setContractsSynced] = useState(false);
  const [profileList, setProfileList] = useState({ profiles: [] } as any);
  const [HomeServerButton, setHomeServerButton] = useState("Connect to Server");
  const [profile, setProfile] = useState({} as any);
  const [profileViewer, setProfileViewer] = useState({} as any);
  const [authenticated, setIsAuthenticated] = useState(false);
  const [registerNewHive, setRegisterNewHive] = useState(false);
  let pause = onPause
  const [contractProfileList, setContractProfileList] = useState([] as CatAttributeType[]);
  let contractSyncErrorLog: any[] = [];
  const [energyModelState, setEnergyModelState] = useState(0);

  //
  // STEP 1: check if the server is running  
  //

  // Option 1: check if the server is running
  const checkIfServerIsRunning = async () => {
    console.log("Ran Server Check");
    // set the status to "Connecting to server..."
    await Moralis.Cloud.run("checkIfServerIsRunning", { serverUrl, appId }).then((data: any) => {
      if (data[0] === "running") {
        // isHostConnected moves to step 2
        setIsHostConnected(true);
        // getProfileList syncs the web3 contracts with the server
        getProfileList();
      } else if (data[0] === "contract") {
        // isHostConnected moves to step 2
        setIsHostConnected(true);
        // getProfileList syncs the web3 contracts with the server
        getProfileList();
        // setContractProfileList sets the contract profile list
        setContractProfileList(data[1]);
      }
      else {
        // set the status to "Failed to connect to server"
        setConnectStatusFailed("Failed to connect to server");
      }
    });
  }

  // OPTION 2: download the server and run it
  const downloadServer = async () => {
    // open trade model
    
  }

  // Popup for OPTION 1 and OPTION 2
  const homeServerButton = (
    <div className={styles.colCard}>
      <div>Hello Hero</div>
      <div className={styles.subTitle}>{connectStatusFailed}</div>
      <button className={styles.connectToServerContainer} onClick={checkIfServerIsRunning}>{connectStatus}</button>
      <button className={styles.downloadText} onClick={downloadServer}><div className={styles.rowize}><UseAnimations animation={download} strokeColor={"white"} autoplay={true} loop={true} />Download Local Server</div></button>
    </div>
  );

  // Make a contract profile for the home server button
  // every component will have a contract profile and be viewable in the energy model

  // Get the profile list
  // Contains 1. the profile list 2. the contract profile list 3. the contract profile log
  const getProfileList = async () => {
    console.log("Ran Get Profile List")
    await Moralis.Cloud.run("getProfileList", { serverUrl, appId }).then(result => {
      setProfileList(result);
      console.log("getProfileList", result);
    });
    console.log("profileList", profileList)
  }

  // Launch a new Hive
  // this is only used if there are no profiles on the server
  const launchNewHome = async () => {
    console.log("Ran Launch New Home")
    // check if the host address is valid by checking if there is a contract profile with the same address as the host address
    // if there is a contract profile with the same address as the host address, then the host address is valid and we can skip launching a new home
    setHostAddress(profileList?.profiles?.[0]?.id || "");
    console.log("launchNewHome")
    await Moralis.Cloud.run("launchNewHome", { serverUrl, appId });
    await getProfileList();
    await setHostAddress(profileList.profiles[0].id);
    return;
  }



  // Create an array that will be used to display the node profiles
  const displayNodeProfiles = () => {
    console.log("Ran Display Node Profiles")
    let array = [];
    if (profileList.profiles.length > 0 && profileList.profiles !== undefined && profileList.profiles !== null) {
      array = [];
      array.push({ name: "Launch New Home", value: "0x0000" })
      for (let i = 0; i < profileList.profiles.length; i++) {
        array.push(
          { name: profileList.profiles[i].name, value: profileList.profiles[i].id }
        );
      }
    }
    if (array.length === 0) {
      array.push(
        { name: "Launch New Home", value: "launchNewHome" }
      );
    }
    return array;
  };
  // TODO: make the connect to server button open a transfer modal that will allow the user to transfer an nWonderland Profile NFT to the host
  // TODO: make Launch New Home a profile in the profile list, and make it so when the user clicks on it, it will call the launchNewHome function and register the host on the nHome network
  // create a skeleton for the profile list. This will be used to display the profiles of the nodes that are connected to the host.
  // the profile list will be displayed in the profileListDiv
  
  const contractProfileScraper = async () => {
    console.log("Ran Contract Profile Scraper")
    getProfileList();
    const contractProfiles = profileList.contractProfiles.map((profile: any) => {
      return {data:profile}
    })
    setContractProfileList(contractProfiles);
    console.log("contractProfileScraper", contractProfiles)
  }

  // Set the host title after the user selects a Home profile
  const handleNodeChange = (e: any) => {
    console.log("Ran Handle Node Change", e)
    setHostTitle(e);
    if (contractProfileList.length < 0) {
      launchNewHome();
    } else {
      setHostAddress(e);
      contractProfileScraper();
      setIsHostSelected(true);
      setIsHostConnected(true);
      //setIsHostValid(true);
      //setIsHostAddressValidated(true);
    }
    return undefined;
  };

  //
  // ========================== STEP 2: Select a host ==========================
  //

  // if the profile list is empty, then we will display the register text and the register button
  const registerText = (
    <>
      <p>Hello Hero, I cant seem to find your local decentralized server profile</p>
      <p>Would you like to create one now?</p>
      <p>Zero data will pass through this server without you explicit permission</p>
      <p>and you will recieve reports on the security status of your machine</p>
    </>
  );


  // create a map of display node profiles
  const nodeProfileButtons = displayNodeProfiles().map((profile: any) => {
    console.log("Ran Node Profile Buttons")
    return (
      <button className={styles.connectToServerContainer} onClick={() => handleNodeChange(profile.name)} >
        <div className={styles.logoutButtonText}>{profile.name}</div>
        <div className={styles.logoutButtonText}>{profile.value}</div>
      </button>
    );
  });

  // Host Selector displays registerText if it is the first time the user is connecting to the server
  // After confirming, the different types of Nodes available will be displayed
  const hostSelector = (
    <div className="heroProtagonistDiv">
      {(profileList.profiles.length < 1) ? (
        registerText
      ) : (
        nodeProfileButtons
      )}
    </div>
  );



  // TODO: add a confirmation dialog
  // TODO: create conditions for when the user can disconnect from the host
  const handleDisconect = async () => {
    console.log("Ran Handle Disconnect")
    // if we are at step 2 and the user clicks on disconnect, then we move to step 1
    if (profileList.profiles.length < 1) {
      console.log("Ran Handle Disconnect 2")
      setIsHostConnected(false);
      return undefined;
    } else if (hostTitle !== undefined) {
      let id = hostTitle;
      console.log("id", id);
      await Moralis.Cloud.run("deleteNode", { serverUrl, appId, id }).then((result: any) => {
        getProfileList();
        setHostTitle('');
        setIsHostValid(false);
        setIsHostConnected(false);
      });
    }
  };

  const accountButton = isHostAddressValid ? 'Select Local Host' : 'Open Vault Door';
  // if the hostTitle is not "" then we will display 'delete node' instead of 'disconnect from local server'
  const disconnectButtonText = (hostTitle === "") ? 'Disconnect from Local Host' : 'Delete Node';

  // handle changes in the contract profile list
  // TODO: add the energy model animation any time the contract profile list changes
  const getContractProfileLog = async () => {
    try {
      await Moralis.Cloud.run("getContractProfileLog", { serverUrl, appId }).then(async (result: any) => {
        if (result.length > 0) {
          onPause = true;
          // append the contractProfileList to the contractProfileList state array with the log data by splicing the contract into the array based on the id and status\
          // if the status is "0" then we will push the contract into the array
          // if the status is "1" then we will update the contract from the array based on the id
          // if the status is "2" then we will delete the contract in the array based on the id
          for (let i = 0; i < result.length; i++) {
            console.log("result", result[i])
            if (result[i].status === '0') {
              // push the contract to the end of the array
              contractProfileList.push({ data: result[i].contract });
              console.log("contractProfilePush", result)
              console.log("contractProfilePush", contractProfileList)
            } else if (result[i].status === '1') {
              // update the contract in the array
              contractProfileList.splice(result[i].id, 1, { data: result[i].contract });
              console.log("contractProfileSplice", contractProfileList)
            } else if (result[i].status === '2') {
              // delete the contract from the array
              contractProfileList.splice(result[i].id, 1);
              console.log("contractProfiledelete", contractProfileList)
            } else {
              // throw an error
              console.log("contract sync status error")
              //add results to error log
              contractSyncErrorLog.push(result[i])
            }
            console.log("contractProfileList", contractProfileList)
            setContractProfileList(contractProfileList);
            addModel([<EnergyModel attributes={contractProfileList} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />, <WalletBank />]);
            setProfileViewer(<ProfileViewer attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>)
            setProfile(<Profile attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />)
          };
          // clear the contractProfileLog
          Moralis.Cloud.run("clearContractProfileLog", { serverUrl, appId }).then((result: any) => {
            console.log("SET REGISTER NEW HIVE 1");
            console.log("contractProfileList", contractProfileList)
            setRegisterNewHive(true);
          });
          // if the contractProfileList has two contracts then we will register the new hive
          //  
          if (contractProfileList.length === 1) {
            console.log("Ran Register New Hive")
            await Moralis.Cloud.run("registerNewHive").then((result: any) => {
              console.log("SET REGISTER NEW HIVE 2");
              setRegisterNewHive(true);
            });
            setIsHostValid(true);
            console.log("contractProfileList", contractProfileList)
          } else if (contractProfileList.length > 0) {
            console.log("Skip Register New Hive")
            // if there is a contract, skip the registration process
            setIsHostAddressValidated(true);
            console.log("SET REGISTER NEW HIVE 3");
            setRegisterNewHive(true);
          }
        } else {
          console.log("no new contracts");
        }
      });
    } catch (error) {
      console.log("Lost Connection To Server");
      setIsHostConnected(false);
      setIsHostValid(false);
      setIsHostAddressValidated(false);
      addModel(<></>)
    }
  };

  // create a functions that sets the builder state variables using the first profile in the profileList
  const setBuilder = () => {
    console.log("Ran Set Builder")
    if (profileList.profiles.length > 0) {
      functions?.[0]?.dataFunctions?.setContent(JSON.stringify(profileList.profiles[0]));
      // //set the title
      functions?.[0]?.dataFunctions?.setTitle(JSON.stringify(profileList.profiles[0].name));
      // //set the description
      functions?.[0]?.dataFunctions?.setDescription(JSON.stringify(profileList.profiles[0].description));
      // //set the os and type as the tags
      functions?.[0]?.dataFunctions?.setTags([profileList.profiles[0].data.os.type, profileList.profiles[0].type]);
    }
  };

  // we need to create a listener that constantly checks if the host is connected to the website by asking for updates to the contractProfile list
  // if there is a change, the server will send an add or delete event to the website
  // we're going to keep this commented out until we implement getContractProfileList
  // when contractProfileList is not empty, we will change the children of set by addModel from the contract builder to the energy model. This will confirm that the user memorized (read: saved to the local server) the contract
  // and if the user has already gone through the initial contract creation process, the website will always jump straight to the energy model
  // create a button that will allow the user to suspend this process and freeze all energy transactions

  useEffect(() => {
    console.log(pause)
    var interval: string | number | NodeJS.Timeout | undefined;
    if (!onPause && isHostConnected) {
      interval = setInterval(() => {
        getContractProfileLog();
      }, 1000);
      // if the contractProfileList is not empty, we will add the energy model and the wallet model to the model and set the isHostValid to true
      // this will skip the opening contract builder and go straight to the "home page" (meaning the server is reporting state changes)
      return () => clearInterval(interval);
    } else {
      clearInterval(interval)
      console.log("energy transactions are suspended")
      setIsHostConnected(false);
      setIsHostValid(false);
      setIsHostAddressValidated(false);
      addModel(<></>)
    }
  }, [contractProfileList, onPause, isHostConnected]);

  // lets useEffect too see if the host is selected from the profile list and then setIsHostValid to true, and then add the contract builder to the model
  useEffect(() => {
    console.log("Ran Use Effect")
    if (hostTitle != "" && profileList.contractProfiles.length === 0) {
      console.log("Ran Initial Contract Builder")
      const tempAttributes: CatAttributeType = {
        data: {
          id: [profileList?.profiles?.[0]?.id],
          title: [profileList?.profiles?.[0]?.name],
          description: [profileList?.profiles?.[0]?.description],
          tags: [profileList?.profiles?.[0]?.data?.os?.type, profileList?.profiles?.[0]?.type],
          content: [JSON.stringify(profileList?.profiles?.[0])],
          aiTools: [''],
          metadata: [{
            data: {
              // id is the id of the contract or quest, it is updated anytime the contract or quest is updated
              id: ['0'],
              // This is the title of the first subnote 
              title: ['Authorization'],
              tags: [],
              // This is the description of the first subnote
              description: ['Log in with a wallet to unlock the contract.'],
              // This is a jsx element that will be rendered in the subnote
              content: ["useWallet"],
              aiTools: [],
              metadata: [],
              log: [],
              nodes: [],
              edges: [],
              trades: [],
            }
          }],
          log: [''],
          nodes: [''],
          edges: [''],
          trades: [''],
        }
      }
      setIsHostValid(true);
      setBuilder();
      setProfileViewer(<ProfileViewer attributes={[tempAttributes]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>)
      setProfile(<Profile attributes={[tempAttributes]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>)
      addModel(<ContractBuilder attributes={[tempAttributes]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>);
      setIsHostSelected(true);
    } else if (hostTitle != "" && profileList.contractProfiles.length > 0) {
      // if the host address is validated, meaning the user has already created a contract, we will add the energy model and the wallet model to the model
      console.log("Opening pre-existing contract")
      setIsHostValid(true);
      setIsHostAddressValidated(true);
      addModel([<EnergyModel attributes={contractProfileList} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />, <WalletBank />]);
      console.log("Ran Contract Builder", contractProfileList)
      setProfileViewer(<ProfileViewer attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>)
      setProfile(<Profile attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />)
    }
  }, [hostTitle, profileList, contractProfileList]);

  // lets useEffect too see if the host is selected from the profile list and then setIsHostValid to true, and then add the contract builder to the model

  useEffect(() => {
    console.log("Ran Contract Builder", registerNewHive)
    if (registerNewHive) {
      console.log("Ran Contract Builder")
      addModel([<EnergyModel attributes={contractProfileList} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />, <WalletBank />]);
      console.log("Ran Contract Builder", contractProfileList)
      setProfileViewer(<ProfileViewer attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>)
      setProfile(<Profile attributes={contractProfileList} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />)
    }
  }, [contractProfileList, registerNewHive]);



  // Header Div displays Host Selector and two buttons
  const headerDiv = (
    <div className={styles.card}>
      <div className={styles.headerDiv}>
        <img className={styles.avatarImg1} alt="" src="avatar-img-1@2x.png" />
        <div className={styles.frameDiv}>
          <div className={styles.heroProtagonistDiv}>
            <div className={styles.rowize}>
              {hostSelector}
              {(profileList.profiles.length < 1) ? (
                <button className={styles.connectToServerContainer} onClick={launchNewHome}>
                  <div className={styles.logoutButtonText}>{accountButton}</div>
                </button>
              ) : (null)}
              <button className={styles.connectToServerContainer} onClick={handleDisconect}>
                <div className={styles.logoutButtonText}>{disconnectButtonText}</div>
              </button>
            </div>
          </div>
          <div className={styles.formingTheSuperheroAcadamy}>{hostTitle}</div>
        </div>
      </div>
    </div>
  );


  // console.log("BankModeler", BankModeler);

  // 1. show the home server button if the host is not connected
  // 2. show the header div if the host is connected
  // 3. show the body div if the host is connected and the host is valid (meaning the host has a contract)




  return (
    <div className={isHostAddressValidated ? (styles.bankModelsDiv1) : (styles.rgbCard)} >
      <div className={styles.spongyCard}>
        <div className={styles.bankCard}>
          {isHostValid ? (
            <div className={styles.colCard}>
              {profileViewer}
              {profile}
            </div>
          ) : (
            isHostConnected ? (headerDiv) : (homeServerButton))}
        </div>
      </div>
    </div>
  );
}


