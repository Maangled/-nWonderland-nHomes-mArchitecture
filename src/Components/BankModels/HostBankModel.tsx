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


type HostBankModelType = {
  onClose?: () => void;
  // hostAddress allows the user to input the address of the host they want to view
  hostAddress: string | "";
  // setHostAddress allows other components to set the hostAddress
  setHostAddress: (hostAddress: string) => void;
  isSkip?: boolean;
  profileList?: any | undefined;
};

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

// TODO: checking server status will return profiles that are stored on the server
// if no profiles are stored on the server then the hostbankmodel will return null and the contract builder will open on the main viewer

// 


export const HostBankModel: FunctionComponent<HostBankModelType> = ({ onClose, hostAddress, setHostAddress, isSkip, profileList }) => {
  const { data: BankModeler } = useNFTBalances();
  const { Moralis, chainId, isAuthenticated } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend]: any = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();
  const { logout } = useMoralis();
  const [isHostValid, setIsHostValid] = useState(false);
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }
  const setProfileList = (props: [] | undefined) => {
    profileList = props;
  }
  
  const [isHostAddressValid, setIsHostAddressValid] = useState(false);
  const [isHostAddressValidated, setIsHostAddressValidated] = useState(false);
  const [isHostAddressValidating, setIsHostAddressValidating] = useState(false);
  const [isHostAddressValidatingError, setIsHostAddressValidatingError] = useState(false);
  const [isHostAddressValidatingErrorMessage, setIsHostAddressValidatingErrorMessage] = useState("");
  const [isHostAddressValidatingSuccess, setIsHostAddressValidatingSuccess] = useState(false);
  const [isHostAddressValidatingSuccessMessage, setIsHostAddressValidatingSuccessMessage] = useState("");
  const [isHostAddressValidatingLoading, setIsHostAddressValidatingLoading] = useState(false);
  const [isHostAddressValidatingLoadingMessage, setIsHostAddressValidatingLoadingMessage] = useState("");
  const [isHostAddressValidatingLoadingSuccess, setIsHostAddressValidatingLoadingSuccess] = useState(false);
  const [isHostConnected, setIsHostConnected] = useState(false);
  const [hostTitle, setHostTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostDescription, setHostDescription] = useState("");
  const [hostProfilePicture, setHostProfilePicture] = useState("");
  const [hostVault, setHostVault] = useState("");
  const [hostSkillsVault, setHostSkillsVault] = useState("");
  const [hostProjectsVault, setHostProjectsVault] = useState("");
  const [hostLoadoutVault, setHostLoadoutVault] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const appId = process.env.REACT_APP_APPLICATION_ID;
  const [nHomeContractAddress, setNHomeContractAddress] = useState("");
  const [verificationHash, setVerificationHash] = useState("");
  const [verificationHashModal, setVerificationHashModal] = useState(false);
  const [connectStatus, setConnectStatus] = useState("Connect to Server");
  const [connectStatusFailed, setConnectStatusFailed] = useState("Welcome Home");


  
  
  // have profileList return null if the host is not connected  

  useEffect(() => {
    if (isSkip) {
    setIsHostConnected(true);
    setIsHostValid(true);
    }
  }, [isSkip]);

  console.log("serverUrl", serverUrl);


  // create a function that will check if the host is valid
  const checkIfServerIsRunning = async () => {
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
    } 
  }

  // set the profileList to undefined if the host is not connected
  if (!isHostConnected) {
      setProfileList(undefined);
    } 
console.log("profileList", profileList)

  // create a function that will ping the server
  // TODO: create a hook that does this
  const pingServer = async () => {
    const data = await Moralis.Cloud.run("pingServer", { serverUrl, appId });
    console.log("data", data);
  }
  
  // useEffect to ping the server every time the host address changes
  useEffect(() => {
    if (isHostAddressValid) {
      pingServer();
      checkIfServerIsRunning();

    }
  }, [profileList]);


  // useEffect to populate the profileList with the profiles that are stored on the server
useEffect(() => {
  const getProfileList = async () => {
    const data = await Moralis.Cloud.run("getProfileList", { serverUrl, appId });
    console.log("data", data);
    setProfileList(data);
    console.log("profileList", profileList)
  } 
  if (isHostConnected) {
  getProfileList();
  } else {
    setProfileList(undefined);
  }
}, [isHostConnected, profileList]);

  // create a function that returns a div with 2 buttons, one to download the node server and one to check if the server is running
  // 
  const downloadServer = async () => {
    // open open ipfs download link

  }
  const homeServerButton = (
    <>
    <div>Hello Hero</div>
    <div className={styles.subTitle}>{connectStatusFailed}</div>
    <button className={styles.connectToServerContainer} onClick={checkIfServerIsRunning}>{connectStatus}</button>
    <button className={styles.downloadText} onClick={downloadServer}><div className={styles.rowize}><UseAnimations animation={download} strokeColor={"white"} autoplay={true} loop={true}/>Download Local Server</div></button>
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

  const handleTransferClick = (nft: any) => {
    setNftToSend(nft);
    setVisibility(true);
  };

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };


  // the heroProtagonistDiv contains the name of the Host profile
  // since we're trying to make a node selection screen, we're going to make this a dropdown menu
  // we're going to use the react react-select-search library to do this
  // 
  const heroProtagonistDiv = (
    <div className={styles.heroProtagonistDiv}>
      <div className={styles.heroProtagonistTitle}>Hero Protagonist</div>
      <div className={styles.heroProtagonistName}>{hostName}</div>
    </div>
  );


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
  
  
  // launchNewHome will deploy the nHome contract to the local blockchain by using the Moralis.Cloud.run function "launchNewHome" and passing the nHome contract address.
  // the nHome contract address is stored in the nHomeContractAddress variable

  const launchNewHome = async () => {
    // add an addresss parameter to the launchNewHome function
    // we're going to use the address parameter to pass the nHome contract address to the launchNewHome function
    // the launchNewHome function will deploy the nHome contract to the local blockchain by copying the nHome contract from the nHome contract address
    const vHash = await Moralis.Cloud.run("launchNewHome", { serverUrl, appId, address: nHomeContractAddress });
    console.log("verificationHash", vHash);
    if (vHash != "0x0000000000000000000000000000000000000000000000000000000000000000") {
      alert("Host is already connected");
    } else {
      setHostAddress('launchNewHome');
      setVerificationHash(vHash);
      setVerificationHashModal(true);
    }
  };

  // getNodeProfiles will load the profiles of the nodes that are connected to the host by using the Moralis.Cloud.run function "getNodeProfiles" and create a list of the profiles
  type Node = {
    name: string;
    value: string;
  };
  let NodeProfiles: Node[] = [
    { name: "Default 1", value: "def1" },
  ];
  const getNodeProfiles = async () => {
    const data = await Moralis.Cloud.run("getNodeProfiles", { serverUrl, appId });
    console.log("data", data);
    for (let i = 0; i < data.length; i++) {
      NodeProfiles.push({ name: data[i].name, value: data[i].value });
    }
    console.log("NodeProfiles", NodeProfiles);
  };
  
  const displayNodeProfiles= () => {
    getNodeProfiles();
    for (let i = 0; i < NodeProfiles.length; i++) {
      return (
        "{ name: " + NodeProfiles[i].name + ", value: " + NodeProfiles[i].value + " }"
      );
    }
  };

  // create a skeleton for the profile list. This will be used to display the profiles of the nodes that are connected to the host.
  // the profile list will be displayed in the profileListDiv
  const nodeArray = [
    { name: "Launch New Home", value: "launchNewHome" },
    displayNodeProfiles(),
  ];

  const handleNodeChange = (e: any) => {
    console.log(e);
    if (e === "launchNewHome") {
      launchNewHome();
    } else if (e === "verifyNode") {
      verifyNode();
    } else if (e === "verifyHost") {
      verifyHost();
    } else if (e === "0x000000") {
      setIsHostAddressValidated(false);
      setHostTitle("Host");
    } else {
      setIsHostAddressValidated(true);
      setHostTitle("Node");
    }
    setHostName(e);
  };

  const verifyNode = async () => {
    const data = await Moralis.Cloud.run("verifyNode", { serverUrl, appId });
    console.log("data", data);
  };

  const verifyHost = async () => {
    const data = await Moralis.Cloud.run("verifyHost", { serverUrl, appId });
    console.log("data", data);
  };

  const verifyHomeServer = async () => {
    const data = await Moralis.Cloud.run("verifyHomeServer", { serverUrl, appId });
    console.log("data", data);
  };

  const nodeSelector = async (props: { [x: string]: any; className: any; }) => {
    const { className, ...otherProps } = props;
  }

  console.log("hosttitle:", hostTitle);

  // if the hostTitle is "Host" then we will display the host Name instead of the select search
  const hostSelector = (
    <div className="heroProtagonistDiv">
      {hostTitle === "Host" ? (
        NodeProfiles[0].name
      ) : (
        <SelectSearch
        options={nodeArray}
        value={hostTitle}
        search
        placeholder={hostName}
        onChange={(e: any) => { handleNodeChange(e); }}
      />
      )}
    </div>
  );

  // we need to make a function that will verify the home server configuration, this is done to prevent someone from using a malicious home server
  // this will be done by sending a request for the home server to confirm a transaction that we send to it from the client
  // the home server will then post the entire transaction to the blockchain and then send the transaction hash back to the client
  // the client will then read the transaction metadata and return certifications of authenticity
  // the client will then verify the authenticity of the transaction and then display the transaction on the screen

  // the following functions are used to validate the hostAddress


  // first we need to make sure the address is in the correct format
  // then we need to make sure the address is a nWonderland host
  // then we need to make sure the host is online
  // then we need to make sure the host is not full
  // then we must request to connect to the host
  // then we must wait for the host to accept the connection
  // then we must wait for the host to send the host title
  // then we must wait for the host to send the host description
  // then we must wait for the host to send the host image
  // then we confirm the connection and set the hostAddress
  async function validateAddress(_value: any) {
    setIsHostAddressValidated(false);
    setIsHostAddressValidating(true);

    // first we need to make sure the address is in the correct format
    if (_value.length != 42) {
      setIsHostAddressValidatingError(true);
      setIsHostAddressValidatingErrorMessage("Invalid Address");
      setIsHostAddressValidating(false);
      return;
    }

    // then we need to make sure the address is a nWonderland host by checking the metadata of the address
    const hostMetadata = await verifyMetadata(_value);
    if (hostMetadata == null) {
      setIsHostAddressValidatingError(true);
      setIsHostAddressValidatingErrorMessage("Invalid Host");
      setIsHostAddressValidating(false);
      return;
    }

    // then we need to make sure the host is online
    if (hostMetadata.hostStatus != "online") {
      setIsHostAddressValidatingError(true);
      setIsHostAddressValidatingErrorMessage("Host Offline");
      setIsHostAddressValidating(false);
      return;
    }

    // then we need to make sure the host is not full
    if (hostMetadata.hostStatus == "full") {
      setIsHostAddressValidatingError(true);
      setIsHostAddressValidatingErrorMessage("Host Full");
      setIsHostAddressValidating(false);
      return requestConnection(_value);
    }
  }
  // then we must request to connect to the host
  async function requestConnection(_value: any) {
    setIsHostAddressValidatingLoading(true);
    setIsHostAddressValidatingLoadingMessage("Requesting Connection");
  }
  // then we must wait for the host to accept the connection
  // this resets the hostAddress to tell the main component that the user wants to disconnect from the host
  // TODO: add a confirmation dialog
  // TODO: create conditions for when the user can disconnect from the host
  function handleDisconect() {
    if (hostAddress != null) {
      setHostAddress("0x000000");
      return undefined;
    }
  }


  //TODO: add a download button that will allow the user to download a node server that will allow them to host their own NFTs
  function handleDownload() {
    if (hostAddress != null) {
      setHostAddress("0x1");
      return undefined;
    }
  }
  function handleConnectButton() {
    if (hostAddress != null) {
      setHostAddress(hostName);
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
const [accountButton, setAccountButton] = useState(!isHostAddressValid ? 'Connect': 'Suspend');

//launchNewHome needs to replace the selector with a link to the BuilderStateVariables page
// the connect button will change to a disconnect button since connecting will be handled by either saving or publishing a new home contract via the contract builder.
// this bank model will become permanently associated with the address created from the contract builder.

  const headerDiv = (
    <div className={styles.headerDiv}>
          <img className={styles.avatarImg1} alt="" src="avatar-img-1@2x.png" />
          <div className={styles.frameDiv}>
            <div className={styles.heroProtagonistDiv}>
              <div className={styles.rowize}>
              {hostSelector}
              <button className={styles.logoutButton} onClick={handleConnectButton}>
                <div className={styles.logoutButtonText}>{accountButton}</div>
              </button>
              <button className={styles.logoutButton} onClick={handleDisconect}> 
                <div className={styles.logoutButtonText}>Disconnect</div>
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
    <div className={styles.vaultWidgetDiv}>
      <div className={styles.vaultDiv}>Vault</div>
      <div className={styles.vaultBodyDiv}>
        <Skeleton loading={!BankModeler?.result}>
          {BankModeler?.result && BankModeler.result.map((nft, index) => {
            nft = verifyMetadata(nft);
            return (
              <>
                <button className={styles.nFTImageButton}>
                  <img
                    className={styles.nFTImageButton}
                    alt=""
                    src={nft?.image || "error"}
                  />
                </button>
                <div className={styles.nFTInfoDiv}>
                  <b className={styles.nftName}>{nft.name}</b>
                  <div className={styles.nftTokenAddress}>{nft.token_address}</div>
                  <div className={styles.nFTLinksDiv}>
                    <button className={styles.nFTLinkButton}>
                      <FileSearchOutlined
                        onMouseOver={() => nft.name}
                        onClick={() => window.open(
                          `${getExplorer(chainId)}address/${nft.token_address}`,
                          "_blank"
                        )}
                      />
                    </button>
                    <button className={styles.nFTLinkButton}>
                      <SendOutlined onClick={() => handleTransferClick(nft)} />
                    </button>
                    <button className={styles.nFTLinkButton}>
                      <ShoppingCartOutlined
                        onClick={() => alert("OPENSEA INTEGRATION COMING!")} />
                    </button>
                  </div>
                </div>
              </>
            );
          }
          )}
        </Skeleton>
      </div>
    </div>
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

  console.log("BankModeler", BankModeler);

  return (
    <div className={styles.mainViewerBox}>
      <div className={styles.bankModelDiv}>
        {isHostConnected ? (headerDiv) : (homeServerButton) }
        {isHostValid ? (bodyDiv) : (<></>)}
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
