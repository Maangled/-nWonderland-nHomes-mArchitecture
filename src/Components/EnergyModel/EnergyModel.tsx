import { FunctionComponent, useState, useCallback, useEffect, ChangeEvent } from "react";
import { NoteContractDisplay, SmallContractDisplay, LargeContractDisplay } from "./ContractDisplays";
import styles from "./EnergyModel.module.css";
import { ContractBuilder, ContractBuilderViewer } from "./ContractBuilder/ContractBuilder";
import { CatalogModel, CatalogModelViewer } from "./CatalogModel/CatalogModel";
import { VideoStudio, VideoStudioViewer } from "./Video Studio/VideoStudio";
import { DreamSequence, DreamSequenceViewer } from "./DreamSequence/DreamSequence";
import { MetaVerse, MetaVerseViewer } from "./MetaVerse/MetaVerse";
import { CatAttributeType, CatModelType, defaultCatModel } from "../CatModel/CatButton/CatModelTypes";
import { BuilderStateVariables } from "./ContractBuilder/BuilderStateVariables";


//TODO: find way to make a the contract displays update when the input fields are updated in the Contract Editor
//TODO: create a skeleton for the Energy Model that will be used to display all of the saved contracts and quests from the blockchain
//TODO: create a way to save the contracts and quests to the blockchain
//TODO: create a way to load the contracts and quests from the blockchain (this will be done in the skeleton using cattributes)
//TODO: work on page system for the Energy Model, the first page will always be the DALI contract, the second page will be the personal contract, and the third page will be the quests

//
// this is the main energy model component
// it is the parent component for all of the other components in the energy model
// it is also the component that is passed to the cat model using the cattributes
//

export const EnergyModel: FunctionComponent<CatModelType> = ({ attributes, functions, energyModelState, setEnergyModelState, ...rest }) => {
  console.log("Energy Model Has Been Rendered");
  const [ size , setSize ] = useState(0);
  // this the the sync state for the energy model and the host bank
  const [ bankContracts, setBankContracts ] = useState(attributes);
  const [ energyModel, setEnergyModel ] = useState(0);
  const [ homeProfile, setHomeProfile ] = useState<any>([]); // this is the contract list
  const [ guestProfile, setGuestProfile ] = useState<any>([]); // this is the guest profile
  const [ edgeProfile, setEdgeProfile ] = useState<any>([]); // this is the edge profile
  const [ wonderlandProfile, setWonderlandProfile ] = useState<any>([]); // this is the wonderland profile
  const [ metaVerseProfile, setMetaVerseProfile ] = useState<any>([]); // this is the metaVerse profile
  const [ contractBuilder, setContractBuilder ] = useState<any>([]); // this is the contract builder
  const [ contractBuilderViewer, setContractBuilderViewer ] = useState<any>([]); // this is the contract viewer
  
  // TODO: add a auth check to make sure that the address in the player profile matches the address in nWonderland profile
  // todo add rgb border to the currently open contract builder
  // clicking on a contract in the viewer will use the functions to set the contract builder state
  // the viewer will receive the Profile contract as an attribute, the viewer will then set the contract builder state
  // using functions from the energy model which will then update the contract builder

  // create a function that will update the contract builder state that is passed to the contract builder
  // when a sub contract is clicked on in the contract builder, the viewer will flip the card to the metadata
  // example: when the admin contract is clicked on in the contract builder, the viewer will flip the hive card to the metadata
  // the builder state variable will be updated to the metadata contract
  // the first sub contract will be the the hive contract, but will be stored in the metadata of the admin contract.
  // The content of the admin contract will be the user authentification information.
  // the hive contract metadata contract will undo the flip and display the hive contract again. 
  const energyModelTabs = [
    // attributes: homeProfile i.e. contractlist
    <MetaVerse  attributes={[homeProfile]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState} />,
    // attributes: guestProfile
    <CatalogModel attributes={[guestProfile]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    // attributes: MoralisUser
    <ContractBuilder attributes={[edgeProfile]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    // attributes: EdgeProfile
    <VideoStudio attributes={[wonderlandProfile]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    // attributes: wonderlandProfile
    <DreamSequence attributes={[metaVerseProfile]} functions={functions} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
  ]; 
  const energyModelTabViewers = [
    <MetaVerseViewer  attributes={[homeProfile]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    <CatalogModelViewer attributes={[guestProfile]}  setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    <ContractBuilderViewer attributes={[edgeProfile]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    <VideoStudioViewer  attributes={[wonderlandProfile]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>,
    <DreamSequenceViewer attributes={[metaVerseProfile]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
  ];

  //Dematter nHive
  useEffect(() => {
    console.log("updating energy model")
    
    try{
      setHomeProfile(attributes[0]);
      setGuestProfile(attributes[1]);
      setEdgeProfile(attributes[2]);
      setWonderlandProfile(attributes[3]);
      setMetaVerseProfile(attributes[4]);
    } catch (error) {
      console.log(error);
    }
      setContractBuilder(energyModelTabs);
      setContractBuilderViewer(energyModelTabViewers);
      setBankContracts(bankContracts);
      setEnergyModel(energyModelState || energyModel);
  }, [attributes, functions, energyModel, energyModelState]);

  // Set the contract builders
  // NOTE: each of these tabs is a contract builder, but has a separate file to allow for later customization
 

  // The contract viewer allows the user to select contracts from the contract profile list
  // we need to pass the selected contract from the viewer back to the energy model
  // Set the contract viewers
  // useEffect(() => {
  //   console.log("updating energy model")
  //   setEnergyModelState(energyModel);
  // }, [energyModel, setEnergyModel]);


  return (
    <div className={styles.energyButton3}>
      <div className={styles.energyModelColDiv}>
          <div className={styles.frameDiv}>
            {contractBuilder[energyModel]}
            {contractBuilderViewer[energyModel]}
          </div>
              <div className={styles.bountyPageCarousel}>
              <div className={energyModel == 0 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setEnergyModel(0)}></div>
              <div className={energyModel == 1 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setEnergyModel(1)}></div>
              <div className={energyModel == 2 ? styles.currentViewIcon2_isSelected : styles.currentViewIcon2} onClick = {() => setEnergyModel(2)}></div>
              <div className={energyModel == 3 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setEnergyModel(3)}></div>
              <div className={energyModel == 4 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setEnergyModel(4)}></div>
              </div>
      </div>
    </div>
  );
};



