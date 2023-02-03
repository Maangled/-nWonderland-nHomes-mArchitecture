import { useState, useEffect, FunctionComponent } from 'react';
import styles from './EnergyModel.module.css';
import { CatModelType, defaultCatModel } from '../CatModel/CatButton/CatModelTypes';



//
// this is the display for the note contract
//

//TODO: note content is not rendering properly, not reading styles from cardScroll
export const NoteContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
  console.log("NoteContractDisplay has refreshed")
  const [noteTitle, setNoteTitle] = useState('Title');
  const [noteBody, setNoteBody] = useState('Content' as any);
  const [isExpanded, setIsExpanded] = useState(false);
  // use effect to update the title and body of the note when the attributes are updated
  useEffect(() => {
    try {
      setNoteTitle(attributes?.[0]?.data?.title?.[0] || 'Title');
      // check the id of the note, if it is 0x00a then render the website in the note body
      if (attributes?.[0]?.data?.id?.[0] === '0x00a') {
        setNoteBody(
          <iframe
            src={attributes?.[0]?.data?.content?.[0]}
            allowFullScreen
            ></iframe>
            );
      } else {
      setNoteBody(attributes?.[0]?.data?.content?.[0] as any || 'Content');
      }
    } catch (error) {
      console.log(error);
    }
  }, [attributes]);
  // check the note content 

  return (//TODO fix the title not updating when the input field is updated ()
    <div className={styles.cards}>
        
        <div className={styles.noteCardDisplay}>
          <div className={styles.noteContractDisplayTitleText}>
            {noteTitle}
          </div>
          <div className={styles.cardScroll}>
            <div className={styles.cardMedText}>
              {noteBody}
            </div>
          </div>
      </div>
    </div>
  );
};

//
// this is the medium display for the quest contract
//

export const SmallContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  useEffect(() => {
    try {
      setTitle(attributes?.[0]?.data?.title?.[0] || 'Title');
      setDescription(attributes?.[0]?.data?.description?.[0] || 'Description')
      setBody(attributes?.[0]?.data?.content?.[0] as any || 'Content');
    } catch (error) {
      console.log(error);
    }
  }, [attributes]);
  return (
    <div className={styles.smallContractDisplay}>
      <div className={styles.questTitleDiv1}>{title}</div>
      <img
        className={styles.questIcon}
        alt=""
        src="../quest-icon.svg"
      />
      <div className={styles.questHeadlineDiv1}>{description}</div>
      <div className={styles.questBodyDiv1}>
        <div className={styles.questHeadlineDiv2}>{body}</div>
      </div>
    </div>
  );
};

//
// this is the large display for the quest contract
//


export const LargeContractDisplay: FunctionComponent<CatModelType> = ({ attributes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  //TODO: fix the tages to map the tags array
  useEffect(() => {
    try {
      setTitle(attributes?.[0]?.data?.title?.[0] || 'Title');
      setDescription(attributes?.[0]?.data?.description?.[0] || 'Description')
      setBody(attributes?.[0]?.data?.content?.[0] as any || 'Content');
      setTags(attributes?.[0]?.data?.tags?.[0] as any || 'Tags');
    } catch (error) {
      console.log(error);
    }
  }, [attributes]);
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