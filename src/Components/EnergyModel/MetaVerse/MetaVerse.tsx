import react from "react";
import styles from "./MetaVerse.module.css";

export const MetaVerse = () => {
    return (
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
    );
}

export const MetaVerseViewer = () => {
    return (
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
    );
}
