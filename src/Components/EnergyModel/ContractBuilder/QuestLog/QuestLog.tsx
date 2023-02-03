// this is the quest log component
// it is a react component that is used to display the quest log
// it is designed to house the quest log in a way that is easy to read and understand
// it is also designed to be able to display the quest log in a way that is easy to reformat
// it is designed to fit into the energy model
// it is designed to house the log for the entire website

// TODO: BASIC FUNCTIONALITY: add log items to the log as they come in from the server.
// TODO: allow the user to edit the log items to fix any errors that may have been made or to clarify the log.
// TODO: add contract functionality to the log so that the editability/manipulation of the log is assignable to profiles (for secure chain of custody situations)

// import statements
import React from 'react';
import styles from '../../EnergyModel.module.css';
import { QuestLogInterface, TimeStamp } from './QuestLogTypes';

export type QuestLogType = {
  questLog?: QuestLogInterface[];
  onClose?: () => void;
  onEdit?: () => void;
  addUpdate?: (update:QuestLogInterface) => void;
};

export const QuestLog: React.FunctionComponent<QuestLogType> = ({ questLog, addUpdate }) => {
  
  questLog = [
    {
      eventType: "quest",
      timeStamp: {
        date: "2021-09-01",
        time: "12:00:00"
      },
      update: "quest created"
    }
  ]

  addUpdate = (update:QuestLogInterface) => {
    questLog?.push(update)
  }

  const questLogDisplay = questLog.map((questLog, index) => {
    return(
      <li key={index}>
        <div className={styles.questLogDiv}>
          {questLog.update[index]}
        </div>
      </li>
    )
  })

    


    return (
            <div className={styles.frameDiv2}>
            <div className={styles.questHeadlineDiv9}>
              {questLogDisplay}
            </div>
          </div>
        )
    }
