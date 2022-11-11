// this is the AI Marketplace Tab

import React, { FunctionComponent } from 'react';
import styles from './AIToolMenu.module.css';


type AIToolMenuTabContentExplorerType = {
    onClose?: () => void;

};

export const AIToolMenuTabContentExplorer: FunctionComponent<AIToolMenuTabContentExplorerType> = ({ onClose }) => {
    return (
        <div className={styles.AIToolMenuTabContent}>
        </div>
    );
};

