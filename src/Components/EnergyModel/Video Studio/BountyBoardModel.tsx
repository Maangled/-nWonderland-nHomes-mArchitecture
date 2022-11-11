import { FunctionComponent } from "react";
import styles from "./BountyBoardModel.module.css";

type BountyBoardModelType = {
  onClose?: () => void;
};

const BountyBoardModel: FunctionComponent<BountyBoardModelType> = ({
  onClose,
}) => {
  return (
    <div className={styles.bountyBoardModel}>
      <div className={styles.bodyDiv}>
        <div className={styles.bountyLoaderDiv}>
          <div className={styles.questBrowserDiv}>
            <div className={styles.smallQuestObject}>
              <img
                className={styles.guestWalletIcon}
                alt=""
                src="../guest-wallet3.svg"
              />
              <div className={styles.questTitleDiv}>Quest Title</div>
              <img
                className={styles.questIcon}
                alt=""
                src="../quest-icon5.svg"
              />
              <div className={styles.readMoreButton}>
                <b className={styles.qUESTREWARDB}>QUEST REWARD!!</b>
              </div>
              <div className={styles.questHeadlineDiv}>
                Quest Headline: This is a small snippet that describes the
                quest.
              </div>
            </div>
          </div>
          <div className={styles.bountyPageCarousel}>
            <img
              className={styles.currentViewIcon}
              alt=""
              src="../current-view10.svg"
            />
            <img
              className={styles.currentViewIcon1}
              alt=""
              src="../current-view11.svg"
            />
            <img
              className={styles.currentViewIcon2}
              alt=""
              src="../current-view12.svg"
            />
            <img
              className={styles.currentViewIcon1}
              alt=""
              src="../current-view13.svg"
            />
            <img
              className={styles.currentViewIcon}
              alt=""
              src="../current-view14.svg"
            />
          </div>
        </div>
        <div className={styles.activeQuest}>
          <div className={styles.questInformationDiv}>
            <div className={styles.questTitleDiv1}>Quest Title</div>
            <div className={styles.questHeadlineDiv1}>
              Quest Headline: This is a small snippet that describes the quest.
            </div>
            <img
              className={styles.questIcon1}
              alt=""
              src="../quest-icon6.svg"
            />
            <img
              className={styles.questContentIcon}
              alt=""
              src="../quest-content.svg"
            />
            <div className={styles.readMoreButton1}>
              <b className={styles.readMoreB}>Read More...</b>
            </div>
          </div>
          <div className={styles.rewardsDiv}>
            <div className={styles.rewardsDiv1}>Rewards</div>
            <img
              className={styles.guestWalletIcon}
              alt=""
              src="../guest-wallet4.svg"
            />
            <b className={styles.orangeCreamSodaPowerUp}>
              Orange Cream Soda Power-up
            </b>
            <div className={styles.purachaseAmount25699}>
              <p className={styles.purachaseAmount256991}>
                Purachase amount 256.99
              </p>
            </div>
            <div className={styles.claimRewardButton}>
              <b className={styles.claimRewardB}>Claim Reward</b>
            </div>
            <div className={styles.readMoreButton2}>
              <b className={styles.claimRewardB}>Connect</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyBoardModel;
