// import required modules
import { FunctionComponent, useState, useCallback, useEffect, ReactNode } from "react";
import { EnergyModel } from "../EnergyModel/EnergyModel";
import { PortalPopup } from "../PortalPopup";
import { BankModel } from "./BankModel";
import { HostBankModel } from "./HostBankModel";
import { WalletModel } from "./WalletModel";
import styles from "./BankModels.module.css";
import { useMoralis } from "react-moralis";

// create a type for the props
type BankModelsType = {
  // onClose lets the parent component know when the user closes the popup
  onClose?: () => void;
  // setMainView lets the parent know what the user wants to see on the main view
  setMainViewer: (mainViewer: JSX.Element) => void;
};

// create a function component that displays the user bank model and host bank model in a popup
// the banks should be tabs with hover effects that show the user a preview of the bank (quick view)
// the user should be able to click on the bank to open it
//TODO: Rename this Folder to TopTabsDocker
export const BankModels: FunctionComponent<BankModelsType> = ({ onClose, setMainViewer }) => {

  const [isEnergyModelPopupOpen, setEnergyModelPopupOpen] = useState(false);
  const [isMatterModelPopupOpen, setMatterModelPopupOpen] = useState(false);
  //TODO: Remake HostBankModel as a type of BankModel
  const [isBankModelPopupOpen, setBankModelPopupOpen] = useState(false);
  const [isHostBankModelPopupOpen, setHostBankModelPopupOpen] = useState(false);
  const { isAuthenticated } = useMoralis();
  const [exitButton, setExitButton] = useState(false);

  //
  const openEnergyModelPopup = useCallback(() => {
    setEnergyModelPopupOpen(true);
  }, []);

  const closeEnergyModelPopup = useCallback(() => {
    setEnergyModelPopupOpen(false);
  }, []);

  const openBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(true);
  }, []);

  const closeBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(false);
  }, []);

  const openHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(true);
  }, []);

  const closeHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(false);
  }, []);

  const guestAuthenticatedModel = isAuthenticated ? ((
    // if the user is authenticated, show the user bank model
    <div className={styles.bankModelsDiv2} onClick={openBankModelPopup}>
      <BankModel />
    </div>
  )) : ((
    // if the user is not authenticated, show a blank bank model with a login button
    <div className={styles.div}>
      <div className={styles.bankModelDiv1}>
        <BankModel />
      </div>
      <div className={styles.walletModelDiv}>
        <WalletModel />
      </div>
    </div>
  ));
  return (
    <>
    <div className={styles.energyButton3} onClick={openEnergyModelPopup}>
          {/* <EnergyModel onClose={closeEnergyModelPopup} setMainViewer={setMainViewer} /> */}
        </div>
        {guestAuthenticatedModel}
      {isEnergyModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeEnergyModelPopup}
          setMainViewer={setMainViewer}
        >
          {/* <EnergyModel onClose={closeEnergyModelPopup} setMainViewer={setMainViewer} /> */}
        </PortalPopup>
      )}
      {isBankModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeBankModelPopup}
          setMainViewer={setMainViewer}
        >
          <BankModel onClose={closeBankModelPopup} />
        </PortalPopup>
      )}

    </>
  );
};


