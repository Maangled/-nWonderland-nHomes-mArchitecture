import { FunctionComponent, useState, useCallback, useEffect, useRef } from "react";
import styles from "./MainViewer.module.css";
import MainButtons from "../MainButtons";
//import { ScreenQueue } from "./ScreenQueue";
import { PortalPopup } from "../PortalPopup";
import { CatButton } from "../CatModel/CatButton/CatButton";
import { DefaultCatState } from "../CatModel/CatButton/CatTypes";
import { CatModel } from "../CatModel/CatModel";
import { BottomTabsModel } from "../BottomTabDocker/BottomTabsModel";
import { BankModel } from "../BankModels/BankModel";
import { BankModels } from "../BankModels/BankModels";
import { Cat } from "../CatModel/CatButton/Cat";
import { useMainViewer } from "../../hooks/useMainViewer";
import { EnergyModel } from "../EnergyModel/EnergyModel";


//TODO: add a background that that is acts as a canvas for applications within the app to draw on
//TODO: add a secondary background that is a canvas for a secondary application to draw on
//TODO: create infinate canvases that can be added can manipulated by the user
//TODO: keep cat from rerendering when main buttons is shown/hidden
//TODO: keep main buttons from rerendering whe mouse is still



export const MainViewer: FunctionComponent = () => {
    // create the state for the main viewer
    const [isCatModelVisible, setIsCatModelVisible] = useState(false);
    const [isBottomTabsModelVisible, setIsBottomTabsModelVisible] = useState(true);
    const [isBankModelPopupOpen, setBankModelPopupOpen] = useState(false);
    const [isBankModelsVisible, setIsBankModelsVisible] = useState(true);
    const [isCatButtonVisible, setIsCatButtonVisible] = useState(true);
    const [isMainViewerViewVisible, setisMainViewerViewVisible] = useState(false);
    const [MainViewer, setMainViewer] = useState(<></>);

    useEffect(() => {
        if (MainViewer == <></>) {
            setisMainViewerViewVisible(false)
        } else {
            setisMainViewerViewVisible(true)
        }
    }, [setMainViewer, MainViewer]);
    // create a function to show the bottom tabs model
    const showBottomTabsModel = useCallback(() => {
        setIsBottomTabsModelVisible(true);
    }, []);
    const hideBottomTabsModel = useCallback(() => {
        setIsBottomTabsModelVisible(false);
        setIsBankModelsVisible(false);
    }, []);
    const openBankModelPopup = useCallback(() => {
        setBankModelPopupOpen(true);
    }, []);
    const closeBankModelPopup = useCallback(() => {
        setBankModelPopupOpen(false);
    }, []);
    const showBankModels = useCallback(() => {
        setIsBankModelsVisible(true);
    }, []);
    const hideBankModels = useCallback(() => {
        setIsBankModelsVisible(false);
    }, []);
    const showCatButton = useCallback(() => {
        setIsCatButtonVisible(true);
    }, []);
    const hideCatButton = useCallback(() => {
        setIsCatButtonVisible(false);
    }, []);
    const openCatModel = useCallback(() => {
      setIsCatModelVisible(true);
    }, []);
    const closeCatModel = useCallback(() => {
      setIsCatModelVisible(false);
    }, []);


        // use timeout to hide the main buttons after a certain amount of time
        const timeoutRef = useRef<NodeJS.Timeout | null>(null);
        // create a function to hide the main buttons
        const hideMainButtons = useCallback(() => {
            timeoutRef.current = setTimeout(() => {
                hideBottomTabsModel();
                hideBankModels();
            }, 500000);
        }, []);
        // create a function to show the main buttons and hide them after a certain amount of time
        const showMainButtons = useCallback(() => {
            showBottomTabsModel();
            showBankModels();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            hideMainButtons();
        }, []);
    
    // create the event listeners for the main viewer
    useEffect(() => {
        document.addEventListener("mousemove", showMainButtons);
        document.addEventListener("click", showMainButtons);
        document.addEventListener("keydown", showMainButtons);
        document.addEventListener("touchstart", showMainButtons);
        document.addEventListener("touchmove", showMainButtons);
        document.addEventListener("touchend", showMainButtons);
        
        return () => {
            document.removeEventListener("mousemove", showMainButtons);
            document.removeEventListener("click", showMainButtons);
            document.removeEventListener("keydown", showMainButtons);
            document.removeEventListener("touchstart", showMainButtons);
            document.removeEventListener("touchmove", showMainButtons);
            document.removeEventListener("touchend", showMainButtons);
        };
    }, []);
    useEffect(() => {
        if (isCatModelVisible) {
            hideCatButton();
        } else {
            showCatButton(); 
        }
    }, [isCatModelVisible]);
    useEffect(() => {
        if (isBankModelPopupOpen) {
            hideBottomTabsModel();
        } else {
            showBottomTabsModel();
        }
    }, [isBankModelPopupOpen]);
    const catButton = isCatButtonVisible ? (
        <CatButton
            onClick={openCatModel}
            ></CatButton>
    ) : null;

        // useeffect to render the cat button at all times



    
    // create the state for the cat model
    // const [catState, setCatState] = useState(DefaultCatState);
    // const [catModel, setCatModel] = useState<CatModel>(new CatModel(catState));
    // const [catModelVisible, setCatModelVisible] = useState(false);
    // const [catModelPosition, setCatModelPosition] = useState({x: 0, y: 0});
    // const [catModelSize, setCatModelSize] = useState({width: 0, height: 0});
    // const [catModelDirection, setCatModelDirection] = useState({x: 0, y: 0});
    // const [catModelSpeed, setCatModelSpeed] = useState(0);
    // const [catModelColor, setCatModelColor] = useState("black");
    // const [catModelImage, setCatModelImage] = useState("https://i.imgur.com/4ZQ3Z4Q.png");
    // const [catModelBreed, setCatModelBreed] = useState("Tabby");
    // const [catModelType, setCatModelType] = useState("Cat");
    // const [catModelName, setCatModelName] = useState("Cat");
    // const [catModelId, setCatModelId] = useState(0);
    // const [catModelIsVisible, setCatModelIsVisible] = useState(false);

    // create the state for the cat button



return (
    
    <div className={styles.mainDiv}>
        <button onClick={openCatModel}>{catButton}</button>
        <div className={styles.MainDiv} >
            <div className={styles.backgroundDiv}>
            {isMainViewerViewVisible ? (
                    <div className={styles.mainViewer} >
                    {MainViewer}
                    </div>
                ) : null}
                {isBottomTabsModelVisible ? (
                    <BottomTabsModel setMainViewer={setMainViewer}/>
                ): null}
                {isBankModelsVisible ? (
                        <BankModels setMainViewer={setMainViewer}/>
                    ) : null}


        </div>
    </div>

  {isCatModelVisible && (
    <PortalPopup
      overlayColor="rgba(113, 113, 113, 0.3)"
      placement="Centered"
      onOutsideClick={closeCatModel}
      setMainViewer={setMainViewer}
    >
      <CatModel onClose={closeCatModel} setMainViewer={setMainViewer} />
    </PortalPopup>
  )}
  {isBankModelPopupOpen && (
    <PortalPopup
      overlayColor="rgba(113, 113, 113, 0.3)"
      placement="Top left"
      onOutsideClick={closeBankModelPopup}
      setMainViewer={setMainViewer}
      >
        <BankModel onClose={closeBankModelPopup} />
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
  </div>
  );
}
