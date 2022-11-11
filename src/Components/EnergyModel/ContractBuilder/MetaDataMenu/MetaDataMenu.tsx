// this is the AI tool menu that appears when you click on the AI tool button
// it contAIns the AI tool market, the AI tool editor, and the AI tool
// explorer
//
// the AI tool market is where you can buy AI tools
// the AI tool editor is where you can edit your AI tools
// the AI tool explorer is where you can explore AI tools
//

import React, { FunctionComponent, useState } from 'react';
import styles from './MetaDataMenu.module.css';
import { MetaDataMenuTabType } from './types/MetaDataMenuTabType';
import { MetaDataMenuTabContent } from './MetaDataMenuTabContent';
import { MetaDataMenuTabContentType } from './types/MetaDataMenuTabContentType';
import { MetaDataMenuTabContentViewer } from './MetaDataMenuTabContentViewer';
import { MetaDataMenuTabContentEditor } from './MetaDataMenuTabContentEditor';
import { MetaDataMenuTabContentExplorer } from './MetaDataMenuTabContentExplorer';


type MetaDataMenuType = {

    onClose?: () => void;
};

export const MetaDataMenu: FunctionComponent<MetaDataMenuType> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<MetaDataMenuTabType>('viewer');
    const [activeTabContent, setActiveTabContent] = useState<MetaDataMenuTabContentType>('viewer');
    
    const handleTabClick = (tab: MetaDataMenuTabType) => {
        setActiveTab(tab);
        setActiveTabContent(tab);
    };
    
    return (
        <div className={styles.MetaDataMenu}>
        <div className={styles.MetaDataMenuTabs}>
            <button className={styles.MetaDataMenuTab} onClick={() => handleTabClick('viewer')}>MetaData Viewer</button>
            <button className={styles.MetaDataMenuTab} onClick={() => handleTabClick('editor')}>MetaData Editor</button>
            <button className={styles.MetaDataMenuTab} onClick={() => handleTabClick('explorer')}>MetaData Explorer</button> 
        </div>
        <>
            <MetaDataMenuTabContent>
            {activeTabContent === 'viewer' && (
                <MetaDataMenuTabContentViewer onClose={onClose} />
            )}
            {activeTabContent === 'editor' && (
                <MetaDataMenuTabContentEditor onClose={onClose} />
            )}
            {activeTabContent === 'explorer' && (
                <MetaDataMenuTabContentExplorer onClose={onClose} />
            )}
            </MetaDataMenuTabContent>
        </>
        </div>
    );
    }