// The CatFeed is a template for a media feed. It displays different types of media in a feed. like tiktok, instagram, youtube, etc. It is linked to the CatModel so that it can be used to create different types of media feeds.
    // The CatFeed links other media sources that are similar in nature to the media source that is being displayed. 
    // like if you are watching a video on youtube, it will link other videos that are similar to the video you are watching
    // if you are reading a article, it might link videos of people talking about the article

    import React, { useState, useEffect, FunctionComponent } from "react";
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
export const CatFeedView: FunctionComponent<CatFeedViewType> = ({ onClose }) => {
    return(
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