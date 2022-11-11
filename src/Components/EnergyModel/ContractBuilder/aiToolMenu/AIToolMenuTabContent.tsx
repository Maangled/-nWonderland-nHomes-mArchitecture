// this is the content of the tab in the ai tool menu

import React, { FunctionComponent } from 'react';
import styles from './AIToolMenu.module.css';

type AIToolMenuTabContentType = {
    children?: React.ReactNode;
};

export const AIToolMenuTabContent: FunctionComponent<AIToolMenuTabContentType> = ({
    children,
}) => {
    return (
        <div className={styles.AIToolMenuTabContent}>
            {children}
        </div>
    );
};
