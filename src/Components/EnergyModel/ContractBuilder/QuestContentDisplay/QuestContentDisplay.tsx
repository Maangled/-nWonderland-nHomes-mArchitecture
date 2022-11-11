// this is the code editor component for the energy model
// it is a react component that is used to display the content of a quest
// it is designed to house the content of a quest in a way that is easy to read and understand
// it is also designed to be able to display the content of a quest in a way that is easy to edit
// it is designed to fit into the energy model
// it is designed to house the code for the entire website

// import statements
import React from 'react';
import styles from '../../EnergyModel.module.css';

type QuestContentDisplayType = {
    questContent: string;
    onClose?: () => void;
    onEdit?: () => void;
};
export const QuestContentDisplay: React.FunctionComponent<QuestContentDisplayType> = ({ questContent }) => {
    return (
            <div className={styles.frameDiv2}>
            <div className={styles.questHeadlineDiv9}>
              {questContent}
            </div>
          </div>
        )
    }
