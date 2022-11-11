// this is the AI tool menu that appears when you click on the AI tool button
// it contAIns the AI tool market, the AI tool editor, and the AI tool
// explorer
//
// the AI tool market is where you can buy AI tools
// the AI tool editor is where you can edit your AI tools
// the AI tool explorer is where you can explore AI tools
//

import React, { FunctionComponent, useState } from 'react';
import styles from './AIToolMenu.module.css';
import { AIToolMenuTabType } from './types/AIToolMenuTabType';
import { AIToolMenuTabContent } from './AIToolMenuTabContent';
import { AIToolMenuTabContentType } from './types/AIToolMenuTabContentType';
import { AIToolMenuTabContentViewer } from './AIToolMenuTabContentViewer';
import { AIToolMenuTabContentEditor } from './AIToolMenuTabContentEditor';
import { AIToolMenuTabContentExplorer } from './AIToolMenuTabContentExplorer';


type AIToolMenuType = {
    onClose?: () => void;
};

export const AIToolMenu: FunctionComponent<AIToolMenuType> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<AIToolMenuTabType>('viewer');
    const [activeTabContent, setActiveTabContent] = useState<AIToolMenuTabContentType>('viewer');
    
    const handleTabClick = (tab: AIToolMenuTabType) => {
        setActiveTab(tab);
        setActiveTabContent(tab);
    };
    
    return (
        <div className={styles.AIToolMenu}>
        <div className={styles.AIToolMenuTabs}>
            <button className={styles.AIToolMenuTab} onClick={() => handleTabClick('viewer')}>AI Tool Viewer</button>
            <button className={styles.AIToolMenuTab} onClick={() => handleTabClick('editor')}>AI Tool Editor</button>
            <button className={styles.AIToolMenuTab} onClick={() => handleTabClick('explorer')}>AI Tool Explorer</button> 
        </div>
        <>
            <AIToolMenuTabContent>
            {activeTabContent === 'viewer' && (
                <AIToolMenuTabContentViewer onClose={onClose} />
            )}
            {activeTabContent === 'editor' && (
                <AIToolMenuTabContentEditor onClose={onClose} />
            )}
            {activeTabContent === 'explorer' && (
                <AIToolMenuTabContentExplorer onClose={onClose} />
            )}
            </AIToolMenuTabContent>
        </>
        </div>
    );
    }
    export function exportAITool() {
    // export the AI tool to binary to be hashed and stored on the blockchain
    const aiTool = {
    // the default AI tool will automatically tag quests based on the quest's name
    // and the quest's description
    
    };
    const aiToolBinary = JSON.stringify(aiTool);
    return aiToolBinary;
    

    }