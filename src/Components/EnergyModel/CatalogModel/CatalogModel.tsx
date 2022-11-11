// the catalog model is used to link content from the CatModel to the EnergyModel.
// it essentially a wrapper for the CatModel that allows the CatModel to be used in the EnergyModel.
// for example:
  // someone is browsing in the CatModel and they click on a video of some sort.
  // They decide to reply to the video and they click the generate quest button.
    // The quest is generated and the user is taken to the EnergyModel.
    // The user is taken to the contract builder where they can describe how they want to reply to the video.
    // The user can then click the generate contract button which will open the video studio 
    // and the user can record a video of them replying to the video.
    // The video studio will take the note that the user wrote in the contract builder 
    // and help them create a video that is a reply to the video that they clicked on in the CatModel in the fasion they specified in the contract builder.
    // The video studio will then take the video that the user created render it into a dream sequence.
    
import React, { FunctionComponent, useCallback, useState } from 'react';
import styles from './CatalogModel.module.css';


export const CatalogModel = () => {
    return (
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

export const CatalogModelViewer = () => {
    return (
        <div className={styles.catFeedViewBox}>
        <div className={styles.catFeedView}>
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
    )
}