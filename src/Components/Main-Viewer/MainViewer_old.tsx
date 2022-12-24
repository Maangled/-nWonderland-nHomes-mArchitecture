import { FunctionComponent, useState, useCallback, useEffect, useRef } from "react";
import styles from "./MainViewer.module.css";
import { MainButtons } from "../MainButtons";
//import { ScreenQueue } from "./ScreenQueue";
import { PortalPopup } from "../PortalPopup";
import { CatButton } from "../CatModel/CatButton/CatButton";
import { DefaultCatState } from "../CatModel/CatButton/CatTypes";
import { CatModel } from "../CatModel/CatModel";
import { BottomTabsModel } from "../BottomTabDocker/BottomTabsModel";
import { BankModel } from "../BankModels/BankModel";
import { BankModels } from "../BankModels/BankModels";
import { Cat } from "../CatModel/CatButton/Cat";
import { useMainViewer } from "../../hooks/useMainViewer";
import { EnergyModel } from "../EnergyModel/EnergyModel";
import { HostBankModel } from "../BankModels/HostBankModel";
import { WalletModel } from "../BankModels/WalletModel";
import { useMoralis } from "react-moralis";
import { ContractBuilder } from "../EnergyModel/ContractBuilder/ContractBuilder";


//TODO: add a background that that is acts as a canvas for applications within the app to draw on
//TODO: add a secondary background that is a canvas for a secondary application to draw on
//TODO: create infinate canvases that can be added can manipulated by the user
//TODO: keep cat from rerendering when main buttons is shown/hidden
//TODO: keep main buttons from rerendering whe mouse is still

//TODO: we're going to remake every component using the contract builder. This will allow us to make the components themselves a token that can be retrieved from the blockchain.
// Here's how it will work:
// 1. The user will be able to create a new component using the contract builder
// 2. The user will be able to save the component to the blockchain
// 3. The user will be able to retrieve the component from the blockchain
// 4. The user will be able to manipulate data using the component, and request data from other components saved locally or on the blockchain.



//TODO: cleanUp: resize widgets on the screen to keep them in view, and make them fit the frame of the screen
//TODO: cleanUp: make the cat a token that can be retrieved from the blockchain
//TODO: use react draggable to make all the components draggable

//TODO: Functionality host bank model will be the only model that is on the man viewer, all other models will be called from the host bank model 
// (this will allow us to make the host bank model a contract that manages all the other contracts on this screen, determing configuration, and the order in which they are displayed)

// TODO: add a background that that is acts as a canvas for applications within the app to draw on
    // make a hook called newLayer that creates these canvases based on contracts that are delived to the main viewer from the host bank model








export const MainViewer: FunctionComponent = () => {
    // create the state for the main viewer
    const [isCatModelVisible, setIsCatModelVisible] = useState(false);
    const [isBottomTabsModelVisible, setIsBottomTabsModelVisible] = useState(false);
    const [isBankModelPopupOpen, setBankModelPopupOpen] = useState(false);
    const [isBankModelsVisible, setIsBankModelsVisible] = useState(false);
    const [isCatButtonVisible, setIsCatButtonVisible] = useState(false);
    const [isMainViewerViewVisible, setisMainViewerViewVisible] = useState(false);
    const [MainViewer, setMainViewer] = useState(<></>);
    const [isHostBankModelPopupOpen, setHostBankModelPopupOpen] = useState(false);
    const [isHostAuthenticating, setIsHostAuthenticating] = useState(true); // true by default to prevent the user from seeing the main viewer until they have selected a node
    const [hostProfileAddress, setHostProfileAddress] = useState("0x000000");
    const { Moralis, user } = useMoralis();
    const { isAuthenticated } = useMoralis();
    const [isContractBuilderVisible, setisContractBuilderVisible] = useState(false);
    // const [ contractBuilderState, setContractBuilderState ] = useState(stateAttributes.attributes);
    // const [ contractBuilderNewHomeState, setContractBuilderNewHomeState ] = useState(newHomeAttributes.attributes);


    useEffect(() => {
        if (MainViewer == <></>) {
            setisMainViewerViewVisible(false)
        } else {
            setisMainViewerViewVisible(true)
        }
    }, [setMainViewer, MainViewer]);
    // create a function to show the bottom tabs model
    const showBottomTabsModel = useCallback(() => {
        setIsBottomTabsModelVisible(true);
    }, []);
    const hideBottomTabsModel = useCallback(() => {
        setIsBottomTabsModelVisible(false);
        setIsBankModelsVisible(false);
    }, []);
    const openBankModelPopup = useCallback(() => {
        setBankModelPopupOpen(true);
    }, []);
    const closeBankModelPopup = useCallback(() => {
        setBankModelPopupOpen(false);
    }, []);
    const showBankModels = useCallback(() => {
        setIsBankModelsVisible(true);
    }, []);
    const hideBankModels = useCallback(() => {
        setIsBankModelsVisible(false);
    }, []);
    const showCatButton = useCallback(() => {
        setIsCatButtonVisible(true);
    }, []);
    const hideCatButton = useCallback(() => {
        setIsCatButtonVisible(false);
    }, []);
    const openCatModel = useCallback(() => {
        setIsCatModelVisible(true);
    }, []);
    const closeCatModel = useCallback(() => {
        setIsCatModelVisible(false);
    }, []);


    // use timeout to hide the main buttons after a certain amount of time
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    // create a function to hide the main buttons
    const hideMainButtons = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            hideBottomTabsModel();
            hideBankModels();
        }, 500000);
    }, []);
    // create a function to show the main buttons and hide them after a certain amount of time
    const showMainButtons = useCallback(() => {
        showBottomTabsModel();
        showBankModels();
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        hideMainButtons();
    }, []);

    // create the event listeners for the main viewer
    useEffect(() => {
        document.addEventListener("mousemove", showMainButtons);
        document.addEventListener("click", showMainButtons);
        document.addEventListener("keydown", showMainButtons);
        document.addEventListener("touchstart", showMainButtons);
        document.addEventListener("touchmove", showMainButtons);
        document.addEventListener("touchend", showMainButtons);

        return () => {
            document.removeEventListener("mousemove", showMainButtons);
            document.removeEventListener("click", showMainButtons);
            document.removeEventListener("keydown", showMainButtons);
            document.removeEventListener("touchstart", showMainButtons);
            document.removeEventListener("touchmove", showMainButtons);
            document.removeEventListener("touchend", showMainButtons);
        };
    }, []);
    useEffect(() => {
        if (isCatModelVisible) {
            hideCatButton();
        } else {
            showCatButton();
        }
    }, [isCatModelVisible]);
    useEffect(() => {
        if (isBankModelPopupOpen) {
            hideBottomTabsModel();
        } else {
            showBottomTabsModel();
        }
    }, [isBankModelPopupOpen]);
    const catButton = isCatButtonVisible ? (
        <CatButton
            onClick={openCatModel}
        ></CatButton>
    ) : null;

    function changeHost(_string: string) {
        setHostProfileAddress(_string);
        return hostProfileAddress;
    }
    // TODO: create a framework different components can use to make their own models so they can be rendered in the main viewer and dragged around/interacted with

    const guestAuthenticatedModel = isAuthenticated ? ((
        // if the user is authenticated, show the user bank modelzz
        <div className={styles.bankModelsDiv2} onClick={openBankModelPopup}>
            <BankModel />
        </div>
    )) : ((
        // if the user is not authenticated, show a blank bank model with a login button
        <div className={styles.div}>
            <div className={styles.bankModelDiv1}>
                <BankModel />
            </div>
            <div className={styles.walletModelDiv}>
                <WalletModel />
            </div>
        </div>
    ));
    const [newSaveGame, setNewSaveGame] = useState(false);
    const [profileList, setProfileList] = useState(undefined as any);
    




// create a HostBankModel for each profile in the profile list
// if the profile list is empty, show a blank HostBankModel that is linked to the Contract Builder's data
// contract builder Memorize will save the data to the server and the server will update the profile list.
// with one profile in the profile list, it will show that profile as a host bank model
// a second profile will show a add profile button that will open the contract builder again.

// TODO: create a framework different components can use to make their own models so they can be rendered in the main viewer and dragged around/interacted with

// Main Viewer Hud Layer
// contracts will appear in the main viewer in a specific order
// first the host bank model contract will appear. it will scale to fit the screen
// the host bank model contract will have a button that will open the contract builder
// these contracts will be side by side as the user registers the device
// once the user has registered the device, the host bank model contract will open open another contract directly on top of it
// The new contract will be the admin profile the user just made, and that admin profile will open a trade with a unregisted nWonderland bank model, with a wallet contract on top of it
// the unregistered nWonderland bank model represents a person who is using the device for the first time, and so it opens a sandbox contract and an obs contract with default access settings
// These contracts will be pinned to the corners of the screen (the contract builder will turn into a search bar center top)

// Open Contract Layer
// contracts will appear in the open contract layer in a specific order
// they will be given the size of the screen and will show up in the order they were opened
// the contract builder will be the first contract to open
// it will have presets for the most common contracts including layouts for the main viewer
// it can be closed by clicking the x button in the top right corner or esc and it will assend to the Hud Layer as a search bar
// in games built with nWonderland, the contract builder and the banks will be callable from the game engine and using the local server to secure your personal data
// The open contract layer is where contracts go when you open them from the Hud Layer

// The Real World Layer
// this is where the user can see the real world
// this is the sandbox contract, it will be a 3d model of the real world
// the user can interact with the real world by clicking on the sandbox contract, which will move the open contract layer to the back and the sandbox contract to the front

// The Obs Layer (AI Layer)
// this is where the user can see the individual streams of IOT devices. 
// it's called the OBS layer because it's like the OBS software for streaming (but it's not OBS). 
// it will contain data from both the contract layer and the real world layer
// the content will be delivered to the hud layer through the local server.
    // this ensures the data goes through the hud layer in the correct order, and that the data is secure and private
    // this is why it is called the AI layer, because the user's presets will automatically be applied to the data 
    // before it is delivered to the hud layer, and they can mess with the presets to change the data
    // more importantly, it can send alerts to the hud layer when something happens in the real world
    // and finally, it can automatically send data (or pheonix) to other servers based on smart contracts 
    // like auto uploading to youtube when a certain event happens in the real world, or verifying activity
    // and finally, it can be used to create a virtual world that is a mirror of the real world, and then
    // the user can interact with the virtual world and the real world at the same time, and the data will be synced
    // this is the most important part of nWonderland, because it allows the user to interact with the real world
    
// all of these layers will be implemented by the host bank model contract, and the user will be able to customize them through the hud.

// we can use useLayer to allow for the automatic creation of layers
// we can use useBankModel for the automatic creation of security checks

// useBankModel will run through the process of creating the hud layer by building up a layer of contracts
// these contracts will be stored in the local server and the BankModel will assign them to the correct layers.
// the BankModel will also assign the correct security checks to the contracts, and it will assign the correct data to the contracts
// raw data will be delivered to the highest contract in the layer, the Studio where it immediately applies the user's presets.
// The studio will then deliver the data to the next contract in the layer, the home enviornment layer, where the data is filtered and turned into a 3d model.
// The home enviornment layer will then deliver the data to the next contract in the layer, the sandbox layer where the data is integrated into other smart contracts.
// The sandbox layer can be sent contracts from a person's DID, so every contract that the person uses will show a trade that shows the data trail and possible memory leaks.
// The sandbox layer will be hosted on the user's device through the local server and will be duplicated in full creating an AI layer that attempts to predict the next few moves of the user.
// and potential hazards in the real world. The AI layer will be able to send alerts to the user's hud layer, and it will be able to send data to other servers.
// The AI layer will essentailly be a ghost layer that predicts computing to reduce the load on the user's device without sacrificing security or privacy.
// the further out the AI must predict, the more abstract the data will be, unless the user has a very powerful device or uses a cloud server.
// 


    return (
        <div className={styles.mainDiv}>
                <div className={styles.backgroundDiv}>
                    <div className={styles.BankRows}>
                        <div className={styles.profileDiv}>
                            {/* <HostBankModel /> */}
                        </div>
                    </div>
                </div>
        </div>

    );
}


