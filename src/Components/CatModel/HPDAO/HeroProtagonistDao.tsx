// the HeroProtagonistDao.tsx page contains the code for the first bounty contract. it is a personalization template for the base contract. it sets the parameters for the base contract and creates a new contract that is a copy of the base contract with the new parameters.
    // the HeroProtagonistDao is a decentralized autonomous organization that agrees on open source software and hardware that is used to create a decentralized autonomous learning institute network.
    // the HeroProtagonistDao tracks the progress of people who are learning to code and/or learning to build hardware. Eventually, it will be designed to track all different types of skills and knowledge.

    import React, { useState, useEffect, FunctionComponent } from "react";
    import styles from "./HPDAO.module.css";

type HPDAOType = {
    onClose: () => void;
}
type HPDAOViewType = {
    onClose: () => void;
    daliLamaDao: HPDAOType;
}


export const HPDAO: FunctionComponent<HPDAOType> = ({ onClose }) => {
return(
    <div className={styles.HPDBox}>
            <div className={styles.whiteBorderBlueBox}>
                <img
                    className={styles.guestWalletIcon}
                    alt=""
                    src="../guest-wallet2.svg"
                />
                <div className={styles.categoryTitleDiv}>HPDAO</div>
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
export const HPDAOView: FunctionComponent<HPDAOViewType> = ({ onClose }) => {
    return(
        <div className={styles.HPDBoxView}>
            <div className={styles.whiteBorderBlueBox}>
                <img
                    className={styles.guestWalletIcon}
                    alt=""
                    src="../guest-wallet2.svg"
                />
                <div className={styles.categoryTitleDiv}>HPDAOVIEWER</div>
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