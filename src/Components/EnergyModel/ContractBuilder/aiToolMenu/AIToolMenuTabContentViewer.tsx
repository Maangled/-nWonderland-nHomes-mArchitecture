// this shows the interactions of the AI tools selected in the AI tool menu

import React, { FunctionComponent } from 'react';
import styles from './AIToolMenu.module.css';


type AIToolMenuTabContentViewerType = {
    onClose?: () => void;
};

export const AIToolMenuTabContentViewer: FunctionComponent<AIToolMenuTabContentViewerType> = ({ onClose }) => {
    return (
        <>
            <div className={styles.AIToolMenuTabContentViewerTitle}>
                AI Tool Viewer
            </div>
            <div className={styles.AIToolMenuTabContentViewerClose} onClick={onClose}>
                Close
            </div>
            <div className={styles.AIToolMenuTabContentViewerContent}>
                <div className={styles.AIToolMenuTabContentViewerContentTitle}>
                    AI Tool Viewer Content
                </div>
                <div className={styles.AIToolMenuTabContentViewerContentDescription}>
                    This is the AI tool viewer content
                </div>
            </div>
        </>
    );
};


