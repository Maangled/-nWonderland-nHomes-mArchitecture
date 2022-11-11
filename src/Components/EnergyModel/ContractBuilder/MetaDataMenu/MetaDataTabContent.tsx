// this is the content of the tab in the ai tool menu

import React, { FunctionComponent } from 'react';
import styles from './MetaDataMenu.module.css';

type MetaDataMenuTabContentType = {
    children?: React.ReactNode;
};

export const MetaDataMenuTabContent: FunctionComponent<MetaDataMenuTabContentType> = ({
    children,
}) => {
    return (
        <div className={styles.MetaDataMenuTabContent}>
            {children}
        </div>
    );
};
