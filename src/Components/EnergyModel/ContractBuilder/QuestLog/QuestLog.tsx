// this is the quest log component
// it is a react component that is used to display the quest log
// it is designed to house the quest log in a way that is easy to read and understand
// it is also designed to be able to display the quest log in a way that is easy to reformat
// it is designed to fit into the energy model
// it is designed to house the log for the entire website

// import statements
import React from 'react';
import styles from '../../EnergyModel.module.css';

type QuestLogType = {
    questLog: string;
    onClose?: () => void;
    onEdit?: () => void;
};
export const QuestLog: React.FunctionComponent<QuestLogType> = ({ questLog }) => {
    return (
            <div className={styles.frameDiv2}>
            <div className={styles.questHeadlineDiv9}>
              {questLog}
            </div>
          </div>
        )
    }
