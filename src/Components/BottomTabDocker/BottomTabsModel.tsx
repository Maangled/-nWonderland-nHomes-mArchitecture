import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { LiveViewModel } from "./LiveViewModel";
import { PortalPopup } from "../PortalPopup";
import { BankModel } from "../BankModels/BankModel";
import { TradeModel } from "../Trade Components/TradeModel";
import { BCSStreamdeck } from "../StreamDeck/BCSStreamdeck";
import styles from "./BottomTabsModel.module.css";
import { HostBankModel } from "../BankModels/HostBankModel";
import { Cesium } from "../Cesium/Cesium";

type BottomTabsModelType = {
  onClose?: () => void;
  setMainViewer?: (mainViewer: JSX.Element) => void;
};

export const BottomTabsModel: FunctionComponent<BottomTabsModelType> = ({
  onClose, setMainViewer
}) => {
  const [isLiveViewModelOpen, setLiveViewModelOpen] = useState(false);
  const [isBankModelPopupOpen, setBankModelPopupOpen] = useState(false);
  const [isHostBankModelPopupOpen, setHostBankModelPopupOpen] = useState(false);
  const [isTradeModelPopupOpen, setTradeModelPopupOpen] = useState(false);
  const [isBCSStreamdeckPopupOpen, setBCSStreamdeckPopupOpen] = useState(false);
  const [isBCSStreamdeckPopup1Open, setBCSStreamdeckPopup1Open] =useState(false);
  const [isCesiumPopupOpen, setCesiumPopupOpen] = useState(false);

  const openCesiumPopup = useCallback(() => {
    setCesiumPopupOpen(true);
  }, []);

  const closeCesiumPopup = useCallback(() => {
    setCesiumPopupOpen(false);
  }, []);

  const openLiveViewModel = useCallback(() => {
    setLiveViewModelOpen(true);
  }, []);

  const closeLiveViewModel = useCallback(() => {
    setLiveViewModelOpen(false);
  }, []);

  const openBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(true);
  }, []);

  const closeBankModelPopup = useCallback(() => {
    setBankModelPopupOpen(false);
  }, []);

  const openHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(true);
    setBankModelPopupOpen(true);
  }, []);

  const closeHostBankModelPopup = useCallback(() => {
    setHostBankModelPopupOpen(false);
    setBankModelPopupOpen(false);
  }, []);

  const openTradeModelPopup = useCallback(() => {
    setTradeModelPopupOpen(true);
  }, []);

  const closeTradeModelPopup = useCallback(() => {
    setTradeModelPopupOpen(false);
  }, []);

  const openBCSStreamdeckPopup = useCallback(() => {
    setBCSStreamdeckPopupOpen(true);
  }, []);

  const closeBCSStreamdeckPopup = useCallback(() => {
    setBCSStreamdeckPopupOpen(false);
  }, []);

  const openBCSStreamdeckPopup1 = useCallback(() => {
    setBCSStreamdeckPopup1Open(true);
  }, []);

  const closeBCSStreamdeckPopup1 = useCallback(() => {
    setBCSStreamdeckPopup1Open(false);
  }, []);
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  //TODO: turn this into svgs
  return (
    <>
      <div className={styles.bottomTabsModel} data-animate-on-scroll>
        <div className={styles.commentMapButton}>
          <div className={styles.commentMapDiv}>Comment Map</div>
          <img className={styles.commentMapIcon} alt="" src="comment-map.svg" />
        </div>
        <div className={styles.commentMapButton}>
          <div className={styles.commentFeedDiv}>Comment Feed</div>
          <div className={styles.rectangleDiv} />
          <div className={styles.rectangleDiv1} />
          <div className={styles.rectangleDiv2} />
          <div className={styles.rectangleDiv3} />
          <div className={styles.rectangleDiv4} />
          <div className={styles.rectangleDiv5} />
          <div className={styles.lineDiv} />
          <div className={styles.lineDiv1} />
          <div className={styles.lineDiv2} />
          <div className={styles.lineDiv3} />
        </div>
        <button className={styles.liveViewButton} onClick={openLiveViewModel}>
          <div className={styles.rectangleDiv6} />
          <div className={styles.rectangleDiv7} />
          <div className={styles.rectangleDiv8} />
          <div className={styles.rectangleDiv9} />
          <div className={styles.rectangleDiv10} />
          <div className={styles.rectangleDiv11} />
          <div className={styles.rectangleDiv12} />
          <div className={styles.rectangleDiv13} />
          <div className={styles.rectangleDiv14} />
          <div className={styles.rectangleDiv15} />
          <div className={styles.rectangleDiv16} />
          <div className={styles.rectangleDiv17} />
          <div className={styles.rectangleDiv18} />
          <div className={styles.rectangleDiv19} />
          <div className={styles.rectangleDiv20} />
          <div className={styles.rectangleDiv21} />
          <div className={styles.rectangleDiv22} />
          <div className={styles.liveViewsDiv}>Live Views</div>
        </button>
        <button className={styles.bankButton} onClick={openHostBankModelPopup}>
          <img className={styles.bankButtonIcon} alt="" src="bank-button.svg" />
          <div className={styles.bankDiv}>Banks</div>
        </button>
        <button className={styles.tradeButton} onClick={openTradeModelPopup}>
          <div className={styles.tradeDiv}>Trade</div>
          <img
            className={styles.commentMapIcon}
            alt=""
            src="trade-button.svg"
          />
        </button>

      </div>
      <button
          className={styles.cesiumExpanderButton}
          onClick={openCesiumPopup}
        >
          <Cesium/>
          <button
            className={styles.streamDeckButton}
            onClick={openCesiumPopup}
          >
            Cesium
          </button>
        </button>
      <button
          className={styles.streamDeckExpanderButton}
          onClick={openBCSStreamdeckPopup1}
        >
          <BCSStreamdeck/>
          <button
            className={styles.streamDeckButton}
            onClick={openBCSStreamdeckPopup}
          >
            Stream Deck
          </button>
        </button>
      {isCesiumPopupOpen && (
          <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeCesiumPopup}
          setMainViewer={setMainViewer}
          >
          <Cesium/>
          </PortalPopup>
        )}
      {isLiveViewModelOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLiveViewModel}
        >
          <LiveViewModel onClose={closeLiveViewModel} />
        </PortalPopup>
      )}
      {isHostBankModelPopupOpen &&  isBankModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeHostBankModelPopup}
        >
          <div className={styles.bothBankModelPopup}>
          <HostBankModel onClose={closeHostBankModelPopup} />
          <HostBankModel onClose={closeHostBankModelPopup} />
          </div>
        </PortalPopup>
      )}
      {isTradeModelPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeTradeModelPopup}
        >
          <TradeModel onClose={closeTradeModelPopup} />
        </PortalPopup>
      )}
      {isBCSStreamdeckPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeBCSStreamdeckPopup}
        >
          <BCSStreamdeck onClose={closeBCSStreamdeckPopup} />
        </PortalPopup>
      )}
      {isBCSStreamdeckPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeBCSStreamdeckPopup1}
        >
          <BCSStreamdeck onClose={closeBCSStreamdeckPopup1} />
        </PortalPopup>
      )}
    </>
  );
};
