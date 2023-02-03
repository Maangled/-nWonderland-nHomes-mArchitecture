// The CatFeed is a template for a media feed. It displays different types of media in a feed. like tiktok, instagram, youtube, etc. It is linked to the CatModel so that it can be used to create different types of media feeds.
    // The CatFeed links other media sources that are similar in nature to the media source that is being displayed. 
    // like if you are watching a video on youtube, it will link other videos that are similar to the video you are watching
    // if you are reading a article, it might link videos of people talking about the article

    import React, { useState, useEffect, FunctionComponent } from "react";
import { LargeContractDisplay, NoteContractDisplay, SmallContractDisplay } from "../../EnergyModel/ContractDisplays";
import { CatModelType } from "../CatButton/CatModelTypes";
    import styles from "./CatFeed.module.css";

type CatFeedType = {
    onClose: () => void;
}
type CatFeedViewType = {
    onClose: () => void;
    daliLamaDao: CatFeedType;
}


export const CatFeed: FunctionComponent<CatFeedType> = ({ onClose }) => {
return(
    <div className={styles.matterContentBrowser}>
    <div className={styles.questBrowserDiv}>
      <div className={styles.matterHolderModel}>
        <img
          className={styles.guestWalletIcon}
          alt=""
          src="../guest-wallet2.svg"
        />
        <div className={styles.categoryTitleDiv}>CatFeed</div>
        <img className={styles.questIcon} alt="" src="../quest-icon6.svg" />
        <div className={styles.questHeadlineDiv}>Subcategory</div>
        <button className={styles.settingButton}>
          <img
            className={styles.rectangleIcon}
            alt=""
            src="../rectangle-9.svg"
          />
        </button>
      </div>
    </div>
     </div>
)
}
export const CatFeedView:FunctionComponent<CatModelType> = ({attributes, ...rest}) => {
  const [ size , setSize ] = useState(0);
  const [ contractBuilderState, setContractBuilderState ] = useState(attributes);
  const [ energyModelState, setEnergyModelState ] = useState(0);
  const lines = [
    styles.lineDiv,
    styles.lineDivHalfFull,
    styles.lineDivFull,
  ];
  const lines2 = [
    styles.lineDiv2,
    styles.lineDivHalfFull2,
    styles.lineDivFull2,
  ];
  const [ line , setLine ] = useState(lines[0]);
  const [ line2 , setLine2 ] = useState(lines2[0]);
  const contractType = [
    <div className={styles.questDetailSliders}>
      <NoteContractDisplay attributes={attributes} />
    </div>
  ];
  contractType.push(<div className={styles.questDetailSliders}>
    <SmallContractDisplay attributes={attributes} />
  </div>);
  contractType.push(<div className={styles.questDetailSliders}>
    <LargeContractDisplay attributes={attributes} />
  </div>);
  const [ visableContract, setVisableContract ] = useState(contractType[size]);
  const handleBigClick = () => {
    if (size < contractType.length - 1) {
      setSize(size + 1);
      setVisableContract(contractType[size + 1]);
      setLine(lines[size + 1]);
      setLine2(lines2[size + 1]);
    }
    return {visableContract}
    };
  const handleSmallClick = () => {
    if (size > 0) {
      setSize(size - 1);
      setVisableContract(contractType[size-1]);
      setLine(lines[size - 1]);
      setLine2(lines2[size - 1]);
    }
    return {visableContract}
  };
  function questDetailSliders() {
    return (
      <div className={styles.questDetailSliders}>
        {visableContract}
      </div>
    );
  }
  return (
    <div className={styles.contractBuilderBoxView}>
    <div className={styles.questBrowserDiv}>
      <div className={styles.zoomBarDiv}>
        <button className={styles.div} onClick={handleSmallClick}>-</button>
        <div className={styles.eatSpace}>
          <div className={line} />
          <div className={line2} />
        </div>
        <button className={styles.div} onClick={handleBigClick}>+</button>
      </div>
      <div className={styles.questBrowserBody}>
        {questDetailSliders()}
      </div>     
  </div> 
  </div>
  )
}