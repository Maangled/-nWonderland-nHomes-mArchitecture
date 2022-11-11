// this shows the interactions of the AI tools selected in the AI tool menu

import React, { FunctionComponent } from 'react';
import styles from './MetaDataMenu.module.css';


type MetaDataMenuTabContentViewerType = {
    onClose?: () => void;
};

export const MetaDataMenuTabContentViewer: FunctionComponent<MetaDataMenuTabContentViewerType> = ({ onClose }) => {
    return (
        <>
            <div className={styles.MetaDataMenuTabContentViewerTitle}>
                AI Tool Viewer
            </div>
            <div className={styles.MetaDataMenuTabContentViewerClose} onClick={onClose}>
                Close
            </div>
            <div className={styles.MetaDataMenuTabContentViewerContent}>
                <div className={styles.MetaDataMenuTabContentViewerContentTitle}>
                    AI Tool Viewer Content
                </div>
                <div className={styles.MetaDataMenuTabContentViewerContentDescription}>
                    This is the AI tool viewer content
                </div>
            </div>
        </>
    );
};


