import { FunctionComponent, useState, useCallback } from "react";
import {BankModel} from "./BankModels/BankModel";
import { BankModels } from "./BankModels/BankModels";
import {PortalPopup} from "./PortalPopup";
import styles from "./MainButtons.module.css";
import { CatButton } from "./CatModel/CatButton/CatButton";
type MainButtonsType = {
  onClose?: () => void;
};
//TODO: add a background that is a gradient of the colors of the currently open popup
const MainButtons: FunctionComponent<MainButtonsType> = ({ onClose }) => {
  const [isBankModelPopup1Open, setBankModelPopup1Open] = useState(false);
  const [isBankModelPopup3Open, setBankModelPopup3Open] = useState(false);

  const openBankModelPopup1 = useCallback(() => {
    setBankModelPopup1Open(true);
  }, []);

  const closeBankModelPopup1 = useCallback(() => {
    setBankModelPopup1Open(false);
  }, []);

  const openBankModelPopup3 = useCallback(() => {
    setBankModelPopup3Open(true);
  }, []);

  const closeBankModelPopup3 = useCallback(() => {
    setBankModelPopup3Open(false);
  }, []);

  const onBankButtonClick = useCallback(() => {
    
  }, []);

  return (
    <>
      <div className={styles.mainButtonsDiv}>
        
    <div>
      <BankModels setMainViewer={close}/>
    </div>
      </div>
      {isBankModelPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Top left"
          onOutsideClick={closeBankModelPopup1}
        >
          <BankModel onClose={closeBankModelPopup1} />
        </PortalPopup>
      )}
      {isBankModelPopup3Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeBankModelPopup3}
        >
          <BankModel onClose={closeBankModelPopup3} />
        </PortalPopup>
      )}
    </>
  );
};

export default MainButtons;
