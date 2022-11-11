// this is the user interface for controling AI functions

import React, { FunctionComponent } from 'react';
import styles from './AIToolMenu.module.css';

type AIToolMenuTabContentEditor = {
    onClose?: () => void;
};

export const AIToolMenuTabContentEditor: FunctionComponent<AIToolMenuTabContentEditor> = ({ onClose }) => {
    return (
        <div className={styles.AIToolMenuTabContent}>
        </div>
    );
};

