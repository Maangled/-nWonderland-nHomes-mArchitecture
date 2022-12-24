import { FunctionComponent, useState, useCallback } from "react";
import { BottomTabsModel }  from "./Components/BottomTabDocker/BottomTabsModel";
import { PortalPopup } from "./Components/PortalPopup";
import { WalletModel } from "./Components/BankModels/WalletModel";
import { BankModel } from "./Components/BankModels/BankModel";
import { HostBankModel } from "./Components/BankModels/HostBankModel";
import styles from "./css/SingleView.module.css";
import { useMoralis } from "react-moralis";


export const SingleView: FunctionComponent = () => {
  const [isBottomTabsModelOpen, setBottomTabsModelOpen] = useState(false);
  const [isWalletModelPopupOpen, setWalletModelPopupOpen] = useState(false);
  const [isBankModelPopupOpen, setBankModelPopupOpen] = useState(false);
  const [isHostBankModelOpen, setHostBankModelPopupOpen] = useState(false);
  const { isAuthenticated } = useMoralis();
  const openBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(true);
  }, []);

  const closeBottomTabsModel = useCallback(() => {
    setBottomTabsModelOpen(false);
  }, []);
  
  const openBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(true);
  } , []);

  const closeBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(false);
  } , []);

  const openWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(true);
  }, []);

  const closeWalletModelPopup = useCallback(() => {
    setWalletModelPopupOpen(false);
  }, []);

  const openHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(true);
  }, []);

  const closeHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(false);
  }, []);


const isWalletModelPopupOpenOrWalletVerifiedModelPopupOpen = isWalletModelPopupOpen || isBankModelPopupOpen;

const buttonAuthenticated = isAuthenticated ? styles.buttonAuthenticated : styles.buttonNotAuthenticated;
const buttonAuthenticatedText = isAuthenticated ? "Open Bank" : "Connect to Wallet";
const buttonOnClick = isAuthenticated ? openBankModelPopup : openWalletModelPopup;
const buttonStyle = isAuthenticated ? styles.guestWalletButton : styles.guestWalletVerifiedButton;

return (
    <>
      <main className={styles.singleViewMain}>
        <div className={styles.desktopViewDiv}>
          <img 
            className={styles.desktopViewIcon}
            alt=""
            src="desktop-view@2x.png"
            onClick={openBottomTabsModel}
          />
          <button
            className={buttonStyle}
            onClick={buttonOnClick}
            >
            <b className={styles.authenticateB}>{buttonAuthenticatedText}</b>
          </button>
          <button
            className={styles.hostWalletButton}
            onClick={openHostBankModelPopup}
            >
            <b className={styles.authenticateB}>Host Wallet</b>
          </button>
        </div>
      </main>
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
      {isWalletModelPopupOpen && !isAuthenticated && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeWalletModelPopup}
          setMainViewer={closeWalletModelPopup}
        >
          <WalletModel onClose={closeWalletModelPopup} />
        </PortalPopup>
      )}
      {isBankModelPopupOpen && isAuthenticated && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeBankModelPopup}
          setMainViewer={closeBankModelPopup}
        >
          <BankModel onClose={closeBankModelPopup} />
        </PortalPopup>
      )}
      {isHostBankModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHostBankModelPopup}
          setMainViewer={closeHostBankModelPopup}
        >
          {/* <HostBankModel onClose={closeHostBankModelPopup} /> */}
        </PortalPopup>
      )}
    </>
  );
};
