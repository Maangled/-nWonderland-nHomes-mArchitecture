// This is a single menu tab

import React, { FunctionComponent } from 'react';
import styles from './AIToolMenu.module.css';

type AIToolMenuTabType = {
    active?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
};

export const AIToolMenuTab: FunctionComponent<AIToolMenuTabType> = ({
    active,
    onClick,
    children,
}) => {
    return (
        <div
            className={active ? styles.active : styles.inactive}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
