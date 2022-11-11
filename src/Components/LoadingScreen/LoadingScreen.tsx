// This is the new file
import { FunctionComponent } from 'react';
import { useMoralis } from "react-moralis";
import  styles  from './LoadingScreen.module.css';
import { NamePopup } from './Name Popup/NamePopup';


export const LoadingScreen: FunctionComponent = () => {
    return (
        <div className={styles.backgroundDivFaded}>
            <div className={styles.loadingScreenText}>
            <NamePopup />
            </div>
        </div>
    );
}