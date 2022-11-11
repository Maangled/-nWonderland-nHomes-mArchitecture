// this is the AI Marketplace Tab

import React, { FunctionComponent } from 'react';
import styles from './MetaDataMenu.module.css';


type MetaDataMenuTabContentExplorerType = {
    onClose?: () => void;

};

export const MetaDataMenuTabContentExplorer: FunctionComponent<MetaDataMenuTabContentExplorerType> = ({ onClose }) => {
    return (
        <div className={styles.MetaDataMenuTabContent}>
        </div>
    );
};

