import { FunctionComponent, useState, useCallback, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useRef } from "react";
import { PortalPopup } from "../PortalPopup";
import styles from "./BCSStreamdeck.module.css";
import { ToggleSlider } from "react-toggle-slider"
import { StreamDeckView } from "./StreamDeckView";

type BCSStreamdeckType = {
  onClose?: () => void;
};

export const BCSStreamdeck: FunctionComponent<BCSStreamdeckType> = ({
  onClose,
}) => {
  return (
    <div className={styles.bCSStreamdeckDiv}>
      <StreamDeckView />
      <div className={styles.frameDiv3}>
        <div className={styles.rightButtonsDiv2}>
          record
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet6.svg"

          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          draw
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet7.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          layouts
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet8.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          settings
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet9.svg"
          />
        </div>
      </div>
      <div className={styles.frameDiv3}>
        <div className={styles.rightButtonsDiv2}>
          backgrounds
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet10.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          filters
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet11.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          effects
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet12.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          audio
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet13.svg"
          />
        </div>
      </div>
      <div className={styles.frameDiv3}>
        <div className={styles.rightButtonsDiv2}>
          stream
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet14.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          clip
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet15.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          scenes
          <img
            className={styles.guestWalletIcon6}
            alt=""
            src="guest-wallet16.svg"
          />
        </div>
        <div className={styles.rightButtonsDiv2}>
          incognito
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