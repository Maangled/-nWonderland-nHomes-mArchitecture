// The CatScratch is a template for a scratchpad. It is a place where people can write and draw. It is linked to the CatModel so that it can be used to create different types of scratchpads.
    // The CatScratch is a link to the Energy Model. It is a place where people can write and draw. It is linked to the CatFeed so that it can be used to create see the data around that media source and directly reply to it.

    import React, { useState, useEffect, FunctionComponent } from "react";
    import styles from "./CatScratch.module.css";

type CatScratchType = {
    onClose: () => void;
}
type CatScratchViewType = {
    onClose: () => void;
    daliLamaDao: CatScratchType;
}


export const CatScratch: FunctionComponent<CatScratchType> = ({ onClose }) => {
return(
    <div className={styles.catScratchBox}>
    <div className={styles.catScratch}>
        <img
          className={styles.guestWalletIcon}
          alt=""
          src="../guest-wallet2.svg"
        />
        <div className={styles.categoryTitleDiv}>CatScratch</div>
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
export const CatScratchView: FunctionComponent<CatScratchViewType> = ({ onClose }) => {
    return(
      <div className={styles.matterContentBrowser}>
      <div className={styles.questBrowserDiv}>
          <div className={styles.matterHolderModel}>
              <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="../guest-wallet2.svg"
              />
              <div className={styles.categoryTitleDiv}>DLDAO</div>
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