import { FunctionComponent, useState, useCallback, useEffect, useRef } from "react";
import { HostBankModel } from "../BankModels/HostBank/HostBankModel";
import { DataManager, DataType, ProfileType } from "../EnergyModel/ContractBuilder/DataLayerTypes";
import { HeroHud } from "./HeroHud";
import { OpenWorld } from "./OpenWorld";
import { AiTools } from "./AI Tools";
import { DigitalTwin } from "./DigitalTwin";
import styles from "./MainViewer.module.css";

//TODO: add the dataLayer to the props
// Datalayer is going to be a program that is created by the AI assistant
// the datalayer will pass data controlled by the contracts on the hud layer
// to the AI tools layer and the Digital Twin layer. The AI tools layer will
// be used to build the Open World layer and the Digital Twin layer will be used
// to track the data in the Open World layer.
// We're going the data layer type will form the bases of the AI tools layer and the Digital Twin layer
// for example, the content of a card from the HUD layer will be passed to the AI tools layer
// which will turn the card into a program (like a react module) that can be used to build the Open World layer
// the AI tools layer will also be used to build the Digital Twin layer which will be used to track the data
// the of the host machine and the data in the Open World layer
// For example: the Hud layer can pass a card that says "I want to add an animation to the initial bank model" to the AI tools layer
//TODO: pass data to the MainViewer through the props
// lets have hostbankmodel verify the contract profile logic here so when we lose connection to the host machine
// the web app will pause and show a message that the host machine is offline
// the hero hud layer will send a message to the host machine to pause the app when the host machine is offline
// the pause will be a contract that is created by the host bank model, this model will be contractually obligated to pause the app
// this contract will pause pause each layer as pased on priority, this will keep important layers from closing such as AI protocals
// that are designed to keep the host machine safe or human occupants safe
// Things the host bank model will send to the hero hud layer:



type DataLayer = {
    dataLayer: typeof DataManager | undefined;
    data: any;
}

export const MainViewer: FunctionComponent = () => {
// TODO: create a pause function that will pause the app when the host machine is offline
const [isPaused, setIsPaused] = useState(false);
const [isHostBankModelOpen, setIsHostBankModelOpen] = useState(false);
return(
    <>
    <HeroHud dataLayer={undefined} data={undefined} />
    {/* <OpenWorld dataLayer={undefined} data={undefined} />
    <DigitalTwin dataLayer={undefined} data={undefined} />
    <AiTools dataLayer={undefined} data={undefined} /> */}
    </>
)
}
