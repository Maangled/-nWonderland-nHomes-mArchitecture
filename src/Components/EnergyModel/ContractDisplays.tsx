import { useState, useEffect, FunctionComponent } from 'react';
import styles from './EnergyModel.module.css';
import { CatModelType, defaultCatModel } from '../CatModel/CatButton/CatModelTypes';


export const NoteContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
    const [noteTitle, setNoteTitle] = useState(attributes[0].title);
    const [noteBody, setNoteBody] = useState('');
    //setNoteTitle(attributes[0].title);
    console.log(attributes[0].title);
    //setNoteBody(attributes[0].content);
    return(//TODO fix the title not updating when the input field is updated ()
        <div>
            <div className={styles.noteContractDisplay}>
                <div className={styles.noteContractDisplayTitle}>
                    <div className={styles.noteContractDisplayTitleText}>
                        {attributes[0].title}
                    </div>
                    <div className={styles.noteContractDisplayContentLeftDescription}>
                        content
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SmallContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    return (
    <div className={styles.smallContractDisplay}>
        <div className={styles.questTitleDiv1}>Quest Title</div>
            <img
                className={styles.questIcon}
                alt=""
                src="../quest-icon.svg"
            />
            <div className={styles.questHeadlineDiv1}>
            Quest Headline: This is a small snippet that describes the quest.
                  </div>
                  <div className={styles.questBodyDiv1}>
                    <div className={styles.questHeadlineDiv2}>Quest Body</div>
                  </div>
                </div>
    );
  };

  export const LargeContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
    return (
      <div className={styles.largeContractDisplay}>
      <div className={styles.frameDiv1}>
        <img
          className={styles.questIcon1}
          alt=""
          src="../quest-icon2.svg"
        />
        <div className={styles.questTitleDiv3}>Quest Title</div>
        <div className={styles.readMoreButton}>
          <b className={styles.postToBoard}>Post to Board</b>
        </div>
      </div>
      <div className={styles.questHeadlineDiv6}>
        Quest Headline: This is a small snippet that describes the
        quest.
      </div>
      <div className={styles.addTagButton}>
        <b className={styles.addTagB}>Add Tag...</b>
      </div>
      <div className={styles.questBodyDiv3}>
        <div className={styles.questHeadlineDiv2}>Quest Body</div>
      </div>
      <div className={styles.tangledNotesDiv1}>
        <div className={styles.noteContractDisplay}>
          <div className={styles.questTitleDiv}>Quest Title</div>
          <div className={styles.questBodyDiv4}>
            <div className={styles.questHeadlineDiv2}>Quest Body</div>
          </div>
        </div>
        <img
          className={styles.taangledNoteIcon}
          alt=""
          src="../taangled-note1.svg"
        />
      </div>
    </div>
    );
  };