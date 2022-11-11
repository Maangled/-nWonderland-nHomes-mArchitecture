import { FunctionComponent, useState, useCallback } from "react";
import styles from "./CatModel.module.css";
import { DaliLamaDao, DaliLamaDaoView } from "./DALIDAO/DaliLamaDao";
import { HPDAO, HPDAOView } from "./HPDAO/HeroProtagonistDao";
import { CatBox, CatBoxView } from "./CatBox/CatBox";
import { CatScratch, CatScratchView } from "./CatScratch/CatScratch";
import { CatFeed, CatFeedView } from "./CatFeed/CatFeed";


type MatterModelType = {
  onClose?: (close: boolean) => void;
  fullscreen?: true;
  hero?: false;
  catModelState?: number;
  setMainViewer: (mainViewer: JSX.Element) => void;
};

//TODO: add ability to drag content to main viewer
//TODO: create skeleton for the matter model
//TODO: create default content and add it to the matter model
//TODO: create default feeds from open source projects and add them to the matter model
//TODO: create a way to take a note based on the content in the matter model e.g. if the user selects a piece of text from the matter model, the user can take a note on that piece of text


export const CatModel: FunctionComponent<MatterModelType> = ({ onClose, setMainViewer, fullscreen, hero, catModelState }) => {
  const [isDaliOpen, setIsDaliOpen] = useState(false);
  const [isHPDOpen, setIsHPDOpen] = useState(false);
  const [isCatBoxOpen, setIsCatBoxOpen] = useState(false);
  const [isCatFeedOpen, setIsCatFeedOpen] = useState(false);
  const [isCatScratchOpen, setIsCatScratchOpen] = useState(false);
  const [catModelTab, setCatModelTab] = useState(catModelState||0);
  
  const openDali = useCallback(() => {
    setIsDaliOpen(true);
  }, []);
  const closeDali = useCallback(() => {
    setIsDaliOpen(false);
  }, []);
  const openHPD = useCallback(() => {
    setIsHPDOpen(true);
  }, []);
  const closeHPD = useCallback(() => {
    setIsHPDOpen(false);
  }, []);
  const openCatBox = useCallback(() => {
    setIsCatBoxOpen(true);
  }, []);
  const closeCatBox = useCallback(() => {
    setIsCatBoxOpen(false);
  }, []);
  const openCatFeed = useCallback(() => {
    setIsCatFeedOpen(true);
  }, []);
  const closeCatFeed = useCallback(() => {
    setIsCatFeedOpen(false);
  }, []);
  const openCatScratch = useCallback(() => {
    setIsCatScratchOpen(true);
  }, []);
  const closeCatScratch = useCallback(() => {
    setIsCatScratchOpen(false);
  }, []);
  const openTab = [
    <CatBox onClose={closeCatBox} />,
    <HPDAO onClose={closeHPD} />,
    <DaliLamaDao onConnect={closeDali} />,
    <CatFeed onClose={closeCatFeed} />,
    <CatScratch onClose={closeCatScratch} />,
  ];
  const openTabView = [
    <CatBoxView onClose={function (): void {
      throw new Error("Function not implemented.");
    } } daliLamaDao={{
      onClose: function (): void {
        throw new Error("Function not implemented.");
      }
    }} />,
    <HPDAOView onClose={function (): void {
      throw new Error("Function not implemented.");
    } } daliLamaDao={{
      onClose: function (): void {
        throw new Error("Function not implemented.");
      }
    }} />,
    <DaliLamaDaoView onClose={closeDali} daliLamaDao={{
      onConnect: function (): void {
        throw new Error("Function not implemented.");
      }
    }} />,
    <CatFeedView onClose={function (): void {
      throw new Error("Function not implemented.");
    } } daliLamaDao={{
      onClose: function (): void {
        throw new Error("Function not implemented.");
      }
    }} />,
    <CatScratchView onClose={function (): void {
      throw new Error("Function not implemented.");
    } } daliLamaDao={{
      onClose: function (): void {
        throw new Error("Function not implemented.");
      }
    }} />,
  ]
    function isTabOpen(index: number) {
      if (catModelState === index) {
        return(styles.tabOpen
      );}
        return(styles.tabClosed);
    }
    function handleDoubleClick() {
      setMainViewer(<CatModel fullscreen={true} setMainViewer={setMainViewer} />);
      onClose?.(true)
    }


  return (
    //TODO: make the center line draggable but mind the carousel
    <div className={fullscreen?styles.matterModelColDivFullscreen:styles.matterModelColDiv} >
      <div className={styles.matterModelDiv} onDoubleClick={handleDoubleClick}>
        {openTab[catModelTab]}
        {openTabView[catModelTab]}
      </div>
      <div className={hero?styles.bountyPageCarouselLocked:styles.bountyPageCarousel}>
        <div className={catModelState == 2 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setCatModelTab(2)}></div>
        <div className={catModelState == 1 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setCatModelTab(1)}></div>
        <div className={catModelState == 0 ? styles.currentViewIcon2_isSelected : styles.currentViewIcon2} onClick = {() => setCatModelTab(0)}></div>
        <div className={catModelState == 3 ? styles.currentViewIcon1_isSelected : styles.currentViewIcon1} onClick = {() => setCatModelTab(3)}></div>
        <div className={catModelState == 4 ? styles.currentViewIcon_isSelected : styles.currentViewIcon} onClick = {() => setCatModelTab(4)}></div>
      </div>
    </div>
  );
};

