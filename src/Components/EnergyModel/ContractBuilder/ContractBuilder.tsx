import { FunctionComponent, useState, useCallback, ChangeEvent, useEffect, Key } from "react";
import { CatModelFunctions, CatModelType, CatAttributeType } from "../../CatModel/CatButton/CatModelTypes";
import styles from "./ContractBuilder.module.css";
import { AIToolMenu } from "./aiToolMenu/AIToolMenu";
import { MetaDataMenu } from "./MetaDataMenu/MetaDataMenu";
import { QuestContentDisplay } from "./QuestContentDisplay/QuestContentDisplay";
import { QuestLog } from "./QuestLog/QuestLog";
import { MemorizeButton } from "./MemorizeButton";
import { PublishButton } from "./PublishButton";
import { defaultCatModel } from "../../CatModel/CatButton/CatModelTypes";
import { LargeContractDisplay, NoteContractDisplay, SmallContractDisplay } from "../ContractDisplays";
import { Skeleton } from "antd";
import { WalletModel } from "../../BankModels/WalletModel";

//TODO make the photo upload work
//TODO make the tags work
//TODO add a skeleton checklist for the AI Tool Viewer
//TODO add a code editor to the AI Tool Editor 
//TODO add AI Tool marketplace to the AI Tool Explorer
//TODO add first Quest to log, which is the quest to save the profile.
//TODO add a way to imput default values for contract attributes.
//TODO change type to profileContractType to match the addProfileContract function on the backend
//TODO fix the description styling
//TODO fix the image upload button
//TODO fix the add tag button
//TODO save the state of the the tabbed menu when tthe user switches between the log and the content, yadda yadda
// when the main viewer opens contract builder it will pass the attributes of the contract that is being edited
// if that case, the attributes will be to create a new node in the contract tree. specifically the first one.

// switch the quest that is open in the contract builder with the quest that is selected in the quest browser
// the selected quest will be passed in as a prop from the quest browser

export const ContractBuilder: FunctionComponent<CatModelType> = ({ attributes, functions, setEnergyModelState, energyModelState }) => {
  console.log("ContractBuilder has refreshed");
  // create the initial content popup that is displayed when the Energy Model is opened
  // create the quest content popup that is displayed when the user clicks on the quest content button
  // create the quest log popup that is displayed when the user clicks on the quest log button
  // create the AI tool popup that is displayed when the user clicks on the AI tool button
  // a lot of this is just setting up the state variables and functions to open and close the popups
  // the actual content of the popups is in the openTab arrays
  const [isQuestContentPopupOpen, setIsQuestContentPopupOpen] = useState(false);
  const [useDataFunction, setUseDataFunction] = useState(functions as CatModelFunctions[]);
  const [isQuestLogPopupOpen, setIsQuestLogPopupOpen] = useState(false);
  const [isAIToolPopupOpen, setIsAIToolPopupOpen] = useState(false);
  const [isQuestMetadataPopupOpen, setIsQuestMetadataPopupOpen] = useState(true);

  const [content, setContent] = useState("Hello World");
  // Quest Metadata is the array of subnotes that are displayed below the main note.
  // by default there will be a login subnote, which will be the first one in the array
  // the publish button will be greyed out until the user authenticates the first note
  // the second one will be a add subnote button, which will be greyed out until the user memorizes or publishes the contract
  // after the user memorizes or publishes the contract, the energy model animation will be displayed

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const[expandedWallet, setExpandedWallet] = useState({name: "Wallet", level: 1, experience: 0, health: 100, mana: 100, inventory: [], equipment: []});
  // for the initial metadata, the title is the name of the contract, the description is the description of the contract, and the content is a wallet model
  // this allows the user to add a wallet to the contract, which will unlock the guest wallet during the server side rendering process
  const walletButton = (
    <>
      {isAuthenticating ? (<div>Click To Auth</div>) : (<WalletModel setIsAuthenticated={setIsAuthenticated} />)}
    </>
  )
  // create the default metadata, which is a catAttributeType array
  // the default metadata will include a title, description, and content and the rest will be empty
  const [metadata, setMetadata] = useState<CatAttributeType[]>([]);
  //const [Player, setPlayer] = useState({name: "Player", level: 1, experience: 0, health: 100, mana: 100, inventory: [], equipment: []});

  // when the user click on the note, the note will be expanded and the user will be able to edit the note
  // for the Auth note, a wallet model will be displayed, which will allow the user to authenticate the note
  // walletbutton is a picture of a wallet, which will be displayed in the note
  // when the user clicks on the wallet, the wallet will be expanded and the user will be able to edit the wallet

  // update the attributes when the attributes change
  useEffect(() => {
    if (attributes !== undefined) {
      useDataFunction?.[0]?.dataFunctions?.setAttributes(attributes);
    } else {
      useDataFunction?.[0]?.dataFunctions?.setAttributes(defaultCatModel.attributes);
    }
  }, [attributes]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    useDataFunction?.[0]?.dataFunctions?.setTitle(event.target.value);
  };
  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    useDataFunction?.[0]?.dataFunctions?.setContent(event.target.value);
  };
  // create a function that will open the quest content popup
  const openQuestContentPopup = useCallback(() => {
    setIsQuestContentPopupOpen(true);
  }, []);
  // create a function that will close the quest content popup
  const closeQuestContentPopup = useCallback(() => {
    setIsQuestContentPopupOpen(false);
  }, []);
  // create a function that will open the quest log popup
  const openQuestLogPopup = useCallback(() => {
    setIsQuestLogPopupOpen(true);
  }, []);
  // create a function that will close the quest log popup
  const closeQuestLogPopup = useCallback(() => {
    setIsQuestLogPopupOpen(false);
  }, []);
  // create a function that will open the AI tool popup
  const openAIToolPopup = useCallback(() => {
    setIsAIToolPopupOpen(true);
  }, []);
  // create a function that will close the AI tool popup
  const closeAIToolPopup = useCallback(() => {
    setIsAIToolPopupOpen(false);
  }, []);
  // create a function that will open the quest metadata popup
  const openQuestMetadataPopup = useCallback(() => {
    setIsQuestMetadataPopupOpen(true);
  }, []);
  // create a function that will close the quest metadata popup
  const closeQuestMetadataPopup = useCallback(() => {
    setIsQuestMetadataPopupOpen(false);
  }, []);
  const [contractBuilderState, setContractBuilderState] = useState(0);
  // create a function that will open the quest metadata popup
  const handlePublish = () => {
    setContractBuilderState(1);
  };
  const handleMemorize = () => {
    setContractBuilderState(2);
  };
  useEffect(() => {
    try {
      setContent(attributes?.[0]?.data?.content?.[0] || "Hello World");
    } catch (e) {
    }
  }, [attributes]);

  const openTab = [
    <QuestContentDisplay onClose={closeQuestContentPopup}
      questContent={content}
      questAttributes={attributes}
      onPublish={handlePublish}
      onMemorize={handleMemorize} />,
    <QuestLog onClose={closeQuestLogPopup} />,
    <AIToolMenu onClose={closeAIToolPopup} />,
    <MetaDataMenu onClose={closeQuestMetadataPopup} />,
  ];

  // 
  function isTabOpen(index: number) {
    if (contractBuilderState === index) {
      return (styles.tabOpen
      );
    }
    return (styles.tabClosed);
  }

  const openTabIcon = [
    "../quest-content-icon.svg",
    "../quest-log-icon.svg",
    "../ai-tool-icon.svg",
    "../meta-data-icon.svg",
  ];
  const openTabIconSelected = [
    "../quest-content-icon-selected.svg",
    "../quest-log-icon-selected.svg",
    "../ai-tool-icon-selected.svg",
    "../meta-data-icon-selected.svg",
  ];
  // a popup to select an image from the user's computer
  const imageSelector = (index: number) => {
    if (index === 0) {
      return (
        <div className={styles.imageSelector}>
          <input type="file" accept="image/*" />
        </div>
      );
    }
  };

  const imageUploadButton = (
    <button className={styles.imageUploadButton}>
      <div className={styles.imageUploadButton}>
        <img src="../quest-icon3.svg" />
        <p>Upload Image</p>
      </div>
    </button>
  );
  const [cardTitle, setCardTitle] = useState("Quest Title");
  const [cardDescription, setCardDescription] = useState("Quest Title");
  const [cardTags, setCardTags] = useState(["Quest Tags"]);
  useEffect(() => {
    try {
      console.log("attributes", attributes)
      setCardTitle(attributes?.[0]?.data?.title?.[0]);
      setCardDescription(attributes?.[0]?.data?.description?.[0]);
      setCardTags(attributes?.[0]?.data?.tags);
      setMetadata(attributes?.[0]?.data?.metadata);
      console.log("MetaDATA", attributes?.[0]?.data?.metadata)
    } catch (e) {
      console.log(e);
    }
  }, [attributes]);

  // stateContent is added through the ./QuestContentDisplay component
  // it should be renamed to brain-body diolog 
  let setTags: any = [];
  if (cardTags) {
    setTags = cardTags.map((stateTags, index) => {
      return (
        <li key={stateTags[index]}>
          <div className={styles.addTagButton1}>
            <b className={styles.addTagB}>{stateTags?.[index]}</b>
          </div>
        </li>
      );
    });
  }

  //
  // quest Metadata will hold sub profiles
  //

  const noteDisplay = metadata?.map((data, index: Key | null | undefined) => {
    const content = () => {
      // if the content is useWallet then display the walletmodel
      if (data?.data?.content?.[0] === "useWallet") {
        return (
          <div className={styles.card}>
            {!isAuthenticating ? (
              <div>
                <button onClick={() => setIsAuthenticating(true)}>Log In</button>
              </div>
            ) : (
              <WalletModel setIsAuthenticated={setIsAuthenticated} onClose={() => setIsAuthenticating(false)} />
            )}
          </div>
        )
      } else {
        return (
          data?.data?.content?.[0] || "Quest Content"
        );
      }
    }


    return (
      <li key={index}>
        <div className={styles.subContractsDiv}>
          <div className={styles.questTitleDiv}>
            {data?.data?.title?.[0] || "Quest Title"}
          </div>
          <b className={styles.orangeCreamSodaPowerUp}>
            {data?.data?.description?.[0] || "Quest Description"}
          </b>
          <div className={styles.frameDiv2}>
            <div className={styles.questHeadlineDiv9}>
              {content()}
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.contractBuilderBox}>
      <div className={styles.contractBuilderBox}>
        <div className={styles.questInformationDiv}>
          <div className={styles.questHeaderDiv}>
            <input
              className={styles.addTitleInput}
              id="title"
              type="text"
              placeholder={cardTitle}
              onChange={(e) => handleTitleChange(e)}
            />
            {imageUploadButton}
            <div className={styles.tagRows}>
              {setTags}
              <div className={styles.addTagButton1}>
                <b className={styles.addTagB}>add tag...</b>
              </div>
            </div>
            <input
              className={styles.questHeadlineInput}
              type="text"
              placeholder={cardDescription}
            />
          </div>
          <div className={styles.closedButtonModel}>
            <div className={isTabOpen(2)} onClick={() => setContractBuilderState(2)}>AI Tools</div>
            <div className={isTabOpen(3)} onClick={() => setContractBuilderState(3)}>Metadata</div>
            <div className={isTabOpen(1)} onClick={() => setContractBuilderState(1)}>Log</div>
            <div className={isTabOpen(0)} onClick={() => setContractBuilderState(0)}>Code Editor</div>
          </div>
          <div className={styles.logButtonDiv1}>
            {openTab[contractBuilderState]}
          </div>
        </div>
        <div className={styles.frameDiv3}>
          <div className={styles.frameDiv4}>
            <div className={styles.closedButtonModel}>
              <MemorizeButton attributes={attributes} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
            </div>
            <div className={styles.closedButtonModel}>
              <PublishButton questId={""} title={''} description={''} content={''} tags={''} AITools={''} Metadata={''} Log={''} onPublish={function (_questId: any, _title: any, _description: any, _content: any, _tags: any, _AITools: any, _Log: any, _Metadata: any): { questId: string; title: string; description: string; content: string; tags: string; AITools: string; Log: string; Metadata: string; } {
                throw new Error("Function not implemented.");
              }} />
            </div>
          </div>
          <div className={styles.rowCard}>
            {noteDisplay}
          </div>
        </div>
      </div>
      <div className={styles.modelTitle}>Contract Builder</div>
    </div>
  );
};

















//
//  ContractBuilderViewer.tsx
//



export const ContractBuilderViewer: FunctionComponent<CatModelType> = ({ attributes, functions }) => {
  const [size, setSize] = useState(0);
  const [contractBuilderState, setContractBuilderState] = useState(attributes);
  const [energyModelState, setEnergyModelState] = useState(0);
  const [visableContract, setVisableContract] = useState([] as any);
  const lines = [
    styles.lineDiv,
    styles.lineDivHalfFull,
    styles.lineDivFull,
  ];
  const lines2 = [
    styles.lineDiv2,
    styles.lineDivHalfFull2,
    styles.lineDivFull2,
  ];
  const [line, setLine] = useState(lines[0]);
  const [line2, setLine2] = useState(lines2[0]);

  useEffect(() => {
    setContractBuilderState(attributes);
    setVisableContract(visableContract);
  }, [attributes]);

  // create a function that will map the data from attributes to the contract type and then map any nodes from the data from attributes to the contract type


  // map the data from attributes to the contract type
  // create a function that will return noteDisplay, smallDisplay, and largeDisplay based on a number passed to it
  useEffect(() => {
    if (contractBuilderState?.length > 0) {
    const noteDisplay = contractBuilderState.map((data, index) => {
      console.log("data", data)
      // map any nodes from the data from attributes to the contract type
      let nodeArray: any = [];
      nodeArray = data?.data?.nodes.map((node: any, index: number) => {
        // map the metadata from the node to the contract type
        let metadataArray: any = [];
        if(node?.metadata?.length > 0){
          metadataArray = node?.metadata?.map((metadata: any, index: number) => {
            const metaDatacontractType = [
              <NoteContractDisplay attributes={[ metadata ]}  setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
              <SmallContractDisplay attributes={[ metadata ]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
              <LargeContractDisplay attributes={[ metadata ]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
            ];
            return (
              <li key={index}>
                <div className={styles.hoverClickDoubleClickAccessCard}>
                  <div className={styles.card}>
                    {metaDatacontractType[size]}
                  </div>
                </div>
              </li>
            );
          });
      }
        const contractType = [
          <NoteContractDisplay attributes={[{ data: node }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
          <SmallContractDisplay attributes={[{ data: node }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
          <LargeContractDisplay attributes={[{ data: node }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
        ];
        console.log("node", node)
        return (
          <li key={index}>
            <div className={styles.hoverClickDoubleClickAccessCard}>
              <div className={styles.card}>
                {contractType[size]}
                {metadataArray}
              </div>
            </div>
          </li>
        );
      });
      const contractType = [
        <NoteContractDisplay attributes={[data]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
        <SmallContractDisplay attributes={[data]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
        <LargeContractDisplay attributes={[data]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
      ];

      // make a new card tyoe called hoverClickDoubleClickAccessCard
      // it will have a hover state that will show the double click and click buttons
      // the click will expand the card
      // the double click will open the card in the contract builder
      // drag and drop will create a 3d model of the card and place it in the 3d world
      let dataMetadataArray: any = [];
      if(data?.data?.metadata?.length > 0){
        dataMetadataArray = data?.data?.metadata?.map((metadata: any, index: number) => {
          console.log ("metadata", metadata)
          const metaDatacontractType = [
            <NoteContractDisplay attributes={[{ data: metadata }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
            <SmallContractDisplay attributes={[{ data: metadata }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>, 
            <LargeContractDisplay attributes={[{ data: metadata }]} setEnergyModelState={setEnergyModelState} energyModelState={energyModelState}/>
          ];
          return (
            <li key={index}>
              <div className={styles.hoverClickDoubleClickAccessCard}>
                <div className={styles.card}>
                  {metaDatacontractType[size]}
                </div>
              </div>
            </li>
          );
        });
      }

      // return the contract type, and any nodes from the data from attributes to the contract type
      return (
        <li key={index}>
          <div className={styles.rowCard}>
            <div className={styles.hoverClickDoubleClickAccessCard}>
              <div className={styles.rowCard}>
                {contractType[size]}
                {dataMetadataArray}
              </div>
            </div>
          </div>
          {nodeArray}
        </li>
      );
    });
    setVisableContract(noteDisplay);
  } else setVisableContract([]);
  }, [contractBuilderState, size]);

  const handleBigClick = () => {
    if (size < visableContract.length - 1) {
      setSize(size + 1);
      setLine(lines[size + 1]);
      setLine2(lines2[size + 1]);
    }
    return { visableContract }
  };
  const handleSmallClick = () => {
    if (size > 0) {
      setSize(size - 1);
      setLine(lines[size - 1]);
      setLine2(lines2[size - 1]);
    }
    return { visableContract }
  };

  return (
    <div className={styles.contractBuilderBoxView}>
      <div className={styles.questBrowserDiv}>
        <div className={styles.zoomBarDiv}>
          <button className={styles.div} onClick={handleSmallClick}>-</button>
          <div className={styles.eatSpace}>
            <div className={line} />
            <div className={line2} />
          </div>
          <button className={styles.div} onClick={handleBigClick}>+</button>
        </div>
        <div className={styles.cardScroll}>
          <div className={styles.questDetailSliders}>
            {visableContract}
          </div>
        </div>
      </div>
    </div>
  )
}