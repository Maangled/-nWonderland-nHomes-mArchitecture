import { FunctionComponent, useEffect, useState } from 'react';
import styles from './CatBox.module.css';
import { useMoralis } from 'react-moralis';
import { CatBoxType, CatBoxViewType } from './CatBoxType';

type CatBoxContractDisplayType = {
  feed: string;
};

export const CatBoxContractDisplay: FunctionComponent<CatBoxContractDisplayType> = ({ feed }) => {
  
  const { Moralis } = useMoralis();
  const [catBoxContract, setCatBoxContract] = useState({});
  const [catBoxImage, setCatBoxImage] = useState('');
  const [catBoxName, setCatBoxName] = useState('');
  const [catBoxDescription, setCatBoxDescription] = useState('');


  const getCatBoxContract = async () => {
    const query = new Moralis.Query('CatBoxContract');
    query.equalTo('feed', feed);
    const results = await query.find();
    setCatBoxContract(results[0]);
  };

    useEffect(() => {
      getCatBoxContract();
    }, []);
    return (
        <div className={styles.contractHolderModel}>
          <img
            className={styles.guestWalletIcon}
            alt=""
            src="../guest-wallet2.svg"
          />
          <div className={styles.categoryTitleDiv}>{feed}</div>
          <img className={styles.questIcon} alt="" src="../quest-icon6.svg" />
          <div className={styles.questHeadlineDiv}>Subcategory</div>
          <button className={styles.settingButton}>
            <img
              className={styles.rectangleIcon}
              alt=""
              src="../rectangle-9.svg"
            />
          </button>
        </div>
    );
    }