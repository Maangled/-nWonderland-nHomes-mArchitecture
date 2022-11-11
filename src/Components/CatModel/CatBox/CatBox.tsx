import React, { useState, useEffect, FunctionComponent } from "react";
import styles from "./CatBox.module.css";
import { CatBoxContractDisplay } from "./CatBoxContractDisplay";


type CatBoxType = {
    onClose: () => void;
}
type CatBoxViewType = {
    onClose: () => void;
    daliLamaDao: CatBoxType;
}
//TODO: add a skeleton that loads contracts specified in the HPDAO Page of the CatModel
//TODO: These Contracts load aggregated data from 

export const CatBox: FunctionComponent<CatBoxType> = ({ onClose }) => {
  const [catBoxContract, setCatBoxContract] = useState(true);
//TODO: /1/ turn this into a skeleton
return(
    <div className={styles.catBox}>
        <CatBoxContractDisplay feed={'catbox 1'} />
        <CatBoxContractDisplay feed={'catbox 2'} />
        <CatBoxContractDisplay feed={'catbox 3'} />
        <CatBoxContractDisplay feed={'catbox 4'} />
        <CatBoxContractDisplay feed={'catbox 5'} />
      </div>
)
}
export const CatBoxView: FunctionComponent<CatBoxViewType> = ({ onClose }) => {
    return(
        <div className={styles.matterContentBrowser}>
            <div className={styles.catBoxViewer}>
                <div className={styles.rightViewerControls}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <img
                            className={styles.closeIcon}
                            alt=""
                            src="../close-icon.svg"
                        />
                    </button>
                </div>
                <div className={styles.leftViewerControls}>
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