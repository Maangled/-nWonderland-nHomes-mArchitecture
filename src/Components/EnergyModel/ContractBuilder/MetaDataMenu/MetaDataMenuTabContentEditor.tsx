// this is the user interface for controling AI functions

import React, { FunctionComponent } from 'react';
import styles from './MetaDataMenu.module.css';

type MetaDataMenuTabContentEditor = {
    onClose?: () => void;
};

export const MetaDataMenuTabContentEditor: FunctionComponent<MetaDataMenuTabContentEditor> = ({ onClose }) => {
    return (
        <div className={styles.MetaDataMenuTabContent}>
        </div>
    );
};

