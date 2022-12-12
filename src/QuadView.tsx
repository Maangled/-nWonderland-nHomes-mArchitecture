import { FunctionComponent, useState, useCallback } from "react";
import { BottomTabsModel } from "./Components/BottomTabDocker/BottomTabsModel";
import { PortalPopup } from "./Components/PortalPopup";
import { WalletModel } from "./Components/BankModels/WalletModel";
import { HostWalletModel } from "./Components/BankModels/HostWalletModel";
import styles from "./css/QuadView.module.css";

export const QuadView: FunctionComponent = () => {
  const [isBottomTabsModelOpen, setBottomTabsModelOpen] = useState(false);
  const [isWalletModelPopupOpen, setWalletModelPopupOpen] = useState(false);
  const [isHostWalletModelOpen, setHostWalletModelOpen] = useState(false);

  const openBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(true);
  }, []);

  const closeBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(false);
  }, []);

  const openWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(true);
  }, []);

  const closeWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(false);
  }, []);

  const openHostWalletModel = useCallback(() => {
    setHostWalletModelOpen(true);
  }, []);

  const closeHostWalletModel = useCallback(() => {
    setHostWalletModelOpen(false);
  }, []);

  return (
    <>
      <div className={styles.quadViewDiv}>
        <div className={styles.rightStreamDiv}>
          <img
            className={styles.rightStreamIcon}
            alt=""
            src="right-stream2@2x.png"
          />
        </div>
        <div className={styles.rightStreamDiv1}>
          <img
            className={styles.rightStreamIcon1}
            alt=""
            src="right-stream3@2x.png"
          />
        </div>
        <img
          className={styles.leftStreamIcon}
          alt=""
          src="left-stream2@2x.png"
        />
        <div className={styles.leftStreamDiv}>
          <img
            className={styles.leftStreamIcon1}
            alt=""
            src="left-stream3@2x.png"
          />
        </div>
        <img
          className={styles.bTPopUpWindow}
          alt=""
          src="desktop-view4@2x.png"
          onClick={openBottomTabsModel}
        />
        <button
          className={styles.guestWalletButton}
          onClick={openWalletModelPopup}
        >
          <b className={styles.authenticateB}>Authenticate</b>
        </button>
        <button
          className={styles.hostWalletButton}
          onClick={openHostWalletModel}
        >
          <b className={styles.authenticateB}>0x919...1563</b>
        </button>
      </div>
      {isBottomTabsModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom center"
          onOutsideClick={closeBottomTabsModel}
          setMainViewer={closeBottomTabsModel}
        >
          <BottomTabsModel onClose={closeBottomTabsModel} />
        </PortalPopup>
      )}
      {isWalletModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeWalletModelPopup}
          setMainViewer={closeWalletModelPopup}
        >
          <WalletModel onClose={closeWalletModelPopup} />
        </PortalPopup>
      )}
      {isHostWalletModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHostWalletModel}
          setMainViewer={closeHostWalletModel}
        >
          <HostWalletModel onClose={closeHostWalletModel} />
        </PortalPopup>
      )}
    </>
  );
};
