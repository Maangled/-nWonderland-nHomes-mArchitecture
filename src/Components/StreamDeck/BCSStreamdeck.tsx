import { FunctionComponent, useState, useCallback } from "react";
import { BottomTabsModel } from "../BottomTabDocker/BottomTabsModel";
import { PortalPopup } from "../PortalPopup";
import styles from "./BCSStreamdeck.module.css";
import { useWebcam } from "../../hooks/useWebcam";

type BCSStreamdeckType = {
  onClose?: () => void;
};

export const BCSStreamdeck: FunctionComponent<BCSStreamdeckType> = ({
  onClose,
}) => {
  const [isBottomTabsModelOpen, setBottomTabsModelOpen] = useState(false);
  const {webcamRef} = useWebcam();
  const openBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(true);
  }, []);

  const closeBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(false);
  }, []);

  return (
      <div className={styles.bCSStreamdeckDiv}>
        <div className={styles.frameDiv}>
          <div className={styles.frameDiv1}>
            <div className={styles.webcamView}>
              <video autoPlay={true} muted={true} playsInline={true} ref={webcamRef} />
            </div>
            <div className={styles.frameDiv2}>
              <div className={styles.rightButtonsDiv}>
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet.svg"
                />
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet1.svg"
                />
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet2.svg"
                />
              </div>
              <div className={styles.rightButtonsDiv}>
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet3.svg"
                />
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet4.svg"
                />
                <img
                  className={styles.guestWalletIcon}
                  alt=""
                  src="guest-wallet5.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameDiv3}>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet6.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet7.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet8.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet9.svg"
            />
          </div>
        </div>
        <div className={styles.frameDiv3}>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet10.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet11.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet12.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet13.svg"
            />
          </div>
        </div>
        <div className={styles.frameDiv3}>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet14.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet15.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet16.svg"
            />
          </div>
          <div className={styles.rightButtonsDiv2}>
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet17.svg"
            />
          </div>
        </div>
      </div>
    
  );
};
