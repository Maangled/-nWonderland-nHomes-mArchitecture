// This is a single menu tab

import React, { FunctionComponent } from 'react';
import styles from './MetaDataMenu.module.css';

type MetaDataMenuTabType = {
    active?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
};

export const MetaDataMenuTab: FunctionComponent<MetaDataMenuTabType> = ({
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
