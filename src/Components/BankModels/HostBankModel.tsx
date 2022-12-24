import { FunctionComponent, useEffect, useState } from "react";
import styles from "./HostBankModel.module.css";
import { useVerifyMetadata } from "../../hooks/useVerifyMetadata";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Skeleton, Button } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import AddressInput from "../../AddressInput";
import { ok } from "assert";
import SelectSearch from "react-select-search";
import 'react-select-search/style.css'
import { disconnect } from "process";
import UseAnimations from 'react-useanimations';
import download from 'react-useanimations/lib/download'
import { connect } from "http2";
import { hostname } from "os";
import { ContractBuilder } from "../EnergyModel/ContractBuilder/ContractBuilder";
import { WalletBank } from "../BankModels/WalletBank";
import { EnergyModel } from "../EnergyModel/EnergyModel";
import { BuilderStateVariables } from "../EnergyModel/ContractBuilder/BuilderStateVariables";
import { VaultWidget } from "../BankModels/BankModelContracts/VaultWidget";

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
//TODO: Change skeleton to load profiles from the home server
  // the first will be the bank itself, which will allow any user to inspect the hardware and software of the host using a downloadable node server.
  // the second will be the home profile, which displays the profiles of all devices connected to the network.
  // the third will be the energy model contract which contains the contract builder
  // the fourth will be the user's profile, which will be loaded into the energy model contract and blank until the user signs the contract.


// the blank space in the node selector represents how a home server will be selected and displayed
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
// these notes will be s

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




export const HostBankModel: FunctionComponent<HostBankModelType> = ({ addModel, attributes, onPause, functions, ...rest }) => {
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
  let pause = onPause
  let contractProfileList: any[] = [];
  let contractSyncErrorLog: any[] = [];




  // have profileList return null if the host is not connected 


  console.log("serverUrl", serverUrl);

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
      setIsHostConnected(true);
      getProfileList();
    }
  }



  const [profileList, setProfileList] = useState({ profiles: [] } as any);
  console.log("profileList", profileList)

  const getProfileList = async () => {
    const data = await Moralis.Cloud.run("getProfileList", { serverUrl, appId });
    console.log("getProfileList", data);
    setProfileList(data);
    console.log("profileList", profileList)
  }

  // create a function that returns a div with 2 buttons, one to download the node server and one to check if the server is running
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

  async function transfer(nft: any, amount: any, receiver: any) {
    console.log(nft, amount, receiver);
    const options: any = {
      type: nft?.contract_type?.toLowerCase(),
      tokenId: nft?.token_id,
      receiver,
      contractAddress: nft?.token_address,
    };

    if (options.type === "erc1155") {
      options.amount = amount ?? nft.amount;
    }

    setIsPending(true);

    try {
      const tx = await Moralis.transfer(options);
      console.log(tx);
      setIsPending(false);
    } catch (e: any) {
      alert(e.message);
      setIsPending(false);
    }
  }

  // we're going to make a function that will handle the transfer of the NFT

  // const handleTransfer = async () => {
  //   if (hostAddress === "") {
  //     alert("Please enter a host address");
  //     return;
  //   }

  //   if (hostAddress === Moralis.User.current().get("ethAddress")) {
  //     alert("You cannot transfer to yourself");
  //     return;
  //   }

  //   if (nftToSend) {
  //     await transfer(nftToSend, amount, hostAddress);
  //   }

  //   setVisibility(false);
  // };

  // Launch new home will deploy a local blockchain on the host's machine and the deploy the nhome contract to it
  // the nhome contract will be the contract that will be used to deploy the nft contracts to the local blockchain
  // The nHome contract creates a profile for the host on the nHome network
  // this profile will contain two vaults, one for the host and one for the node
  // the first vault will be used to store an nWonderland Profile NFT
  // the second vault will be used to store reports from the node
  // the nWonderland Profile NFT will contain two profiles. One is public and the other is private
  // the first profile will have 9 vaults: vaults, Name, Title, Bio, Avatar, Cover, NFTs, Friends, Followers, Following, Skills, Projects, and Reports
  // the second profile will have 9 vaults: EncryptionTools, ItemTrackers, ItemDisplacer, Vault, Profile, Nodes, Profiles, Cats, Pics, Dreams, Logs, and Reports


  // now that the bank opens fully when we click on connect with launch new home selected, 
  // we need to link the contract builder and the bank so that the contract builder can be used to deploy the nHome contract to the local blockchain

  const launchNewHome = async () => {
    if (profileList.profiles.length > 0) {
      alert("Select a profile to launch a new home");
      return;
    } else {
      console.log("launchNewHome")
      await launchNewHomeFunction();
      await getProfileList();
    }
  };

  const launchNewHomeFunction = async () => {
    console.log("launchNewHomeFunction")
    const data = await Moralis.Cloud.run("launchNewHome", { serverUrl, appId });
    console.log("newhomedata", data);
  };




  // getNodeProfiles will load the profiles of the nodes that are connected to the host by using the Moralis.Cloud.run function "getNodeProfiles" and create a list of the profiles
  type Node = {
    id: any;
    type?: string;
    name: string;
    description?: string;
    version?: string;
    author?: string;
    license?: string;
    dependencies?: {
      os?: string;
      path?: string;
      fs?: string;
      crypto?: string[];
      ip?: any; uuid: any;
    };
    data?: any;
  };
  const displayNodeProfiles = () => {
    console.log("displayNodeProfiles")
    let array = [];
    if (profileList.profiles.length > 0 && profileList.profiles !== undefined && profileList.profiles !== null) {
      array = [];
      array.push({ name: "Leave this Server", value: "launchNewHome" })
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
    console.log("DisplayNodeProfileArray", array)
    return array;
  };
  // TODO: make the connect to server button open a transfer modal that will allow the user to transfer an nWonderland Profile NFT to the host
  // TODO: make Launch New Home a profile in the profile list, and make it so when the user clicks on it, it will call the launchNewHome function and register the host on the nHome network
  // create a skeleton for the profile list. This will be used to display the profiles of the nodes that are connected to the host.
  // the profile list will be displayed in the profileListDiv
  const nodeArray = [
    { name: "Select a Profile", value: "launchNewHome" },
    displayNodeProfiles()
  ]


  const handleNodeChange = (e: any) => {
    setHostTitle(e)
  };

  const verifyNode = async () => {
    const data = await Moralis.Cloud.run("verifyNode", { serverUrl, appId });
    console.log("data", data);
  };

  const verifyHost = async () => {
    const data = await Moralis.Cloud.run("verifyHost", { serverUrl, appId });
    console.log("data", data);
  };

  console.log("hosttitle:", hostTitle);
  const registerText = (
    <>
      <p>Hello Hero, I cant seem to find your local decentralized server profile</p>
      <p>Would you like to create one now?</p>
      <p>Zero data will pass through this server without you explicit permission</p>
      <p>and you will recieve reports on the security status of your machine</p>
    </>
  );

  // if the hostTitle is "Host" then we will display the host Name instead of the select search
  const hostSelector = (
    <div className="heroProtagonistDiv">
      {(profileList.profiles.length < 1) ? (
        registerText
      ) : (
        <SelectSearch
          options={displayNodeProfiles()}
          value={hostTitle}
          search
          placeholder={"Select a Host"}
          onChange={(e: any) => { handleNodeChange(e); }}
        />
      )}
    </div>
  );

  // TODO: add a confirmation dialog
  // TODO: create conditions for when the user can disconnect from the host
  const handleDisconect = async () => {
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

  const accountButton = !isHostAddressValid ? 'Select Local Host' : 'Open Vault Door';
  // if the hostTitle is not "" then we will display 'delete node' instead of 'disconnect from local server'
  console.log("hostTitle:", hostTitle)
  const disconnectButtonText = (hostTitle === "") ? 'Disconnect from Local Host' : 'Delete Node';

  //TODO: add a download button that will allow the user to download a node server that will allow them to host their own NFTs
  function handleDownload() {
    if (hostAddress != null) {
      setHostAddress("0x1");
      return undefined;
    }
  }

  // lets create a function that will allow the models to be contractually bound to the host
  // these contracts will be stored on the nHome network and will be used to verify the authenticity of the models

  const getContractProfileLog = async () => {
    await Moralis.Cloud.run("getContractProfileLog", { serverUrl, appId }).then((result: any) => {
      if (result.length > 0) {
        // append the contractProfileList to the contractProfileList state array with the log data by splicing the contract into the array based on the id and status\
        // if the status is "0" then we will push the contract into the array
        // if the status is "1" then we will update the contract from the array based on the id
        // if the status is "2" then we will delete the contract in the array based on the id
        for (let i = 0; i < result.length; i++) {
          console.log("result", result[i])
          if (result[i].status === '0') {
            // push the contract to the end of the array
            contractProfileList.push(result[i].contract);
            setContractsSynced(true);
            console.log("contractProfileList", contractProfileList)
          }
          if (result[i].status === '1') {
            // update the contract in the array
            contractProfileList.splice(result[i].id, 1, result[i].contract);
            setContractsSynced(true);
          }
          if (result[i].status === '2') {
            // delete the contract from the array
            contractProfileList.splice(result[i].id, 1);
            setContractsSynced(true);
          } else {
            // throw an error
            console.log("contract sync status error")
            //add results to error log
            contractSyncErrorLog.push(result[i])
          }
          console.log("contractProfileList", contractProfileList)
        };
      } else {
        console.log("no new contracts");
      }
    });
    if (contractsSynced) {
      await Moralis.Cloud.run("clearContractProfileLog", { serverUrl, appId });
      setContractsSynced(false);
    }
    if (contractProfileList.length > 0) {
      console.log('contractProfileList is not empty')
      addModel([<EnergyModel attributes={attributes} functions={functions} />,<WalletBank />]);
      setIsHostAddressValidated(true);
      setIsHostValid(true);
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
    if (!onPause) {
      const interval = setInterval(() => {
        getContractProfileLog();
      }, 1000);
      // if the contractProfileList is not empty, we will add the energy model and the wallet model to the model and set the isHostValid to true
      // this will skip the opening contract builder and go straight to the "home page" (meaning the server is reporting state changes)
      return () => clearInterval(interval);
    } else {
      console.log("energy transactions are suspended")
    }
  }, [contractProfileList, onPause]);




  // lets useEffect too see if the host is selected from the profile list and then setIsHostValid to true, and then add the contract builder to the model
  useEffect(() => {
    if (hostTitle != "" && !isHostAddressValidated) {
      setIsHostValid(true);
      addModel(<ContractBuilder attributes={attributes} functions={functions} />);
      setIsHostSelected(true);
    }
  }, [hostTitle]);


  function handleConnectButton() {
    if (hostTitle == "") {
      launchNewHome();
    } else if (hostAddress != null) {
      setHostAddress("0x1");
      return undefined;
    }
  }

  // we need to check if the website is connected to the host before we display the headerDiv
  // create a button that will 
  // the connect, suspend button will disconect the user from the host
  // the disconect button will sign the user out of the website
  // the suspend button is a disconect that stops the server from getting any new information. This is an emergency cut off button.
  // when multiple users are connected to the host, the host will send a message to all users to disconect.
  // both users will have to disconect from the host initiating a concentual disconection. This will create a chain of responsibility so that the host can not be taken down by a single user.
  // for smart homes, this can provide comfort by creating a contract between a parent and a babysitter. The babysitter can not take down the smart home without the consent of the parent.
  // and a permission slip system so the babysitter is not being watched by the parent and is able to do pre-approved activities, such as playing video games. 
  // the babysitter can also request permission to do activities that are not pre-approved, such as watching an R-rated movie. The parent can then approve or disapprove the request remotely.
  // futher on we can implement a system that keeps an updated status of the child. This will allow the parent to know if the child is in danger or if the child is in need of help.
  // sidenote: the ability to move about freely is a basic human right, with this system the parent can be assured that the child is safe while allowing them to explore the world.
  // this can also be applied to service quests, such as a talor. The talor can enter a person's home and he can be assured that the person is not going to harm them and they 
  // can be assured that the person is not going to steal from them. 
  // This can also be applied to a doctor, a doctor could request permission to see a patient's medical records. The patient can then approve or disapprove the request remotely. and
  // the doctor will be able to see the patient's medical records on a device that is secured through a trustless connection to in the hostpital's server ensuring the doctor cannot 
  // steal the patient's medical records or show them to a third party without the patient's consent.
  // for elderly patients and patients with disabilities, a trusted contact can be added to the patient's profile that reports if they are in danger or if they are in need of help.





  //launchNewHome needs to replace the selector with a link to the BuilderStateVariables page
  // the connect button will change to a disconnect button since connecting will be handled by either saving or publishing a new home contract via the contract builder.
  // this bank model will become permanently associated with the address created from the contract builder.
  // the bank model will be the only way to create a new home contract.
  // the central bank will be the only way to create a new bank model.


  const headerDiv = (
    <div className={styles.headerDiv}>
      <img className={styles.avatarImg1} alt="" src="avatar-img-1@2x.png" />
      <div className={styles.frameDiv}>
        <div className={styles.heroProtagonistDiv}>
          <div className={styles.rowize}>
            {hostSelector}
            {/* {isHostSelected ? hostSelector: heroProtagonistDiv} */}
            <button className={styles.logoutButton} onClick={handleConnectButton}>
              <div className={styles.logoutButtonText}>{accountButton}</div>
            </button>
            <button className={styles.logoutButton} onClick={handleDisconect}>
              <div className={styles.logoutButtonText}>{disconnectButtonText}</div>
            </button>
          </div>
        </div>
        <div className={styles.formingTheSuperheroAcadamy}>{hostTitle}</div>
      </div>
    </div>
  );
  const bodyDiv = (
    <div className={styles.bodyDiv}>
      <div className={styles.bankContentDiv}>
          <VaultWidget attributes={attributes} />
        <div className={styles.skillsWidgetDiv}>
          <div className={styles.skillsDiv}>Skills</div>
          <img
            className={styles.guestWalletIcon2}
            alt=""
            src="guest-wallet47.svg"
          />
          <img
            className={styles.guestWalletIcon3}
            alt=""
            src="guest-wallet48.svg"
          />
          <img
            className={styles.guestWalletIcon4}
            alt=""
            src="guest-wallet49.svg"
          />
          <img
            className={styles.guestWalletIcon5}
            alt=""
            src="guest-wallet50.svg"
          />
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet51.svg"
          />
          <img
            className={styles.guestWalletIcon7}
            alt=""
            src="guest-wallet52.svg"
          />
          <img
            className={styles.guestWalletIcon8}
            alt=""
            src="guest-wallet53.svg"
          />
          <img
            className={styles.guestWalletIcon9}
            alt=""
            src="guest-wallet54.svg"
          />
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
            src="guest-wallet55.svg"
          />
          <img
            className={styles.guestWalletIcon11}
            alt=""
            src="guest-wallet56.svg"
          />
          <img
            className={styles.guestWalletIcon12}
            alt=""
            src="guest-wallet57.svg"
          />
          <img
            className={styles.guestWalletIcon13}
            alt=""
            src="guest-wallet58.svg"
          />
          <img
            className={styles.guestWalletIcon14}
            alt=""
            src="guest-wallet59.svg"
          />
          <img
            className={styles.guestWalletIcon15}
            alt=""
            src="guest-wallet60.svg"
          />
          <img
            className={styles.guestWalletIcon16}
            alt=""
            src="guest-wallet61.svg"
          />
          <img
            className={styles.guestWalletIcon17}
            alt=""
            src="guest-wallet62.svg"
          />
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
            src="guest-wallet63.svg"
          />
          <b className={styles.combatLevel}>Combat Level</b>
          <div className={styles.lVL65EXP23m}>LVL 65 EXP 2.3m</div>
        </div>
      </div>
    </div>
  );

  // console.log("BankModeler", BankModeler);

  return (
    <div className = {isHostAddressValidated ? (styles.bankModelsDiv1) : (styles.card)} >
    <div className={styles.mainViewerBox}>
      <div className={styles.bankModelDiv}>
        {isHostConnected ? (headerDiv) : (homeServerButton)}
        {isHostValid ? (bodyDiv) : (<></>)}
      </div>
    </div>
    </div>
  );
}

{/* <Modal
title={`Transfer ${nftToSend?.name || "NFT"}`}
visible={visible}
onCancel={() => setVisibility(false)}
onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
confirmLoading={isPending}
okText="Send"
>
<AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
{nftToSend && nftToSend.contract_type === "erc1155" && (
  <Input
    placeholder="amount to send"
    onChange={(e) => handleChange(e)}
  />
)}
</Modal> */}
