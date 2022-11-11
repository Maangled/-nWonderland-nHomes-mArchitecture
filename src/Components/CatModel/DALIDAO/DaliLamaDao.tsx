// this is the first page of the bounty carousel on the catmodel page (formerly known as mattermodel)
// the bounty carousel is a navigation component that cycles through differnent levels (pages) of contracts in the catmodel
// in order, the pages are:
// 1. DaliLamaDao.tsx
// 2. HeroProtagonistDao.tsx
// 3. CatBox.tsx
// 4. CatFeed.tsx
// 5. CatScratch.tsx
// the DaliLamaDao.tsx page contains the code for the base contract. it is/syncs the website with the Decentralized Autonomous Learning Institute network i.e. all other nodes that declare themselves as DaliLamas
// the HeroProtagonistDao.tsx page contains the code for the first bounty contract. it is a personalization template for the base contract. it sets the parameters for the base contract and creates a new contract that is a copy of the base contract with the new parameters.
    // the HeroProtagonistDao is a decentralized autonomous organization that agrees on open source software and hardware that is used to create a decentralized autonomous learning institute network.
    // the HeroProtagonistDao tracks the progress of people who are learning to code and/or learning to build hardware. Eventually, it will be designed to track all different types of skills and knowledge.
// the CatBox.tsx page contains the code for the second bounty contract. it is a personalization template for the Content Agregation Template (CAT) contract. it sets the parameters for the CAT contract and creates a new contract that is a copy of the CAT contract with the new parameters.
    // The CatBox is a template for for different forms of content aggregation. It creates multiple different types of media feeds for different types of content. It is public so that anyone can use it to create their own content aggregation template.
// The CatFeed is a template for a media feed. It displays different types of media in a feed. like tiktok, instagram, youtube, etc. It is linked to the CatModel so that it can be used to create different types of media feeds.
    // The CatFeed links other media sources that are similar in nature to the media source that is being displayed. 
    // like if you are watching a video on youtube, it will link other videos that are similar to the video you are watching
    // if you are reading a article, it might link videos of people talking about the article
// The CatScratch is a template for a scratchpad. It is a place where people can write and draw. It is linked to the CatModel so that it can be used to create different types of scratchpads.
    // The CatScratch is a link to the Energy Model. It is a place where people can write and draw. It is linked to the CatFeed so that it can be used to create see the data around that media source and directly reply to it.
    import { Contract } from "ethers";
import React, { useState, useEffect, FunctionComponent } from "react";
    import styles from "./DaliLamaDao.module.css";
    // the dali lama is responsible for the base contract, it contains code for a Personal Identity Contract (PIC) and a Content Agregation Template (CAT) contract.
    // the PIC is a registration contract that allows people to register as a Dali Lama and create a new contract that is a copy of the base contract with the new parameters.
    // The Dali Lama is then responsible for distributing rewards to the people who complete the bounties in the contracts that they create.
    // The CAT is a code base that allows people to create different types of content aggregation templates. 

    type DaliLamaDaoType = {
        onConnect: () => void;
}

type DaliLamaDaoViewType = {
    onClose: () => void;
    daliLamaDao: DaliLamaDaoType;
}
// the DaliLamaDaoForm is a function that returns a form that allows people to register by creating a new contract that is a copy of the base contract with the new parameters.
// the DaliLamaDaoForm allows you to download the base contract and the contract that you create. it also allows you to upload a contract that you have created to be submitted.
// it initially displays the base contract graphically and urges people to use the hero protagonist contract to customize the base contract.
// it has a checked box that by default is checked that sends the user to the hero protagonist before downloading the contract.
    // when the checked box is unchecked, a warning message appears that tells the user that they are downloading the base contract and that there are no ui elements to customize the contract.
    // when the checked box is checked, the user is taken to the hero protagonist contract where they can customize the base contract by selecting different types of content aggregation templates.
    // they can also select different types of media feeds and scratchpads.
    // they can also select different types of rewards for different types of content.
    // the can also sort the content by different types of tags.
    // they select their reward for completing the hero protagonist contract, which is a bounty contract that assigns default privileges to the user.
        //TODO: consider other possible ways to calculate the reward for completing the hero protagonist contract.
        // The default privileges are:
            // 1. Karma
                // Karma is a point system that tracks the contributions of people to the network. 
                // it is given to people who complete bounties and is used to determine the amount of rewards that they receive.
                // every action is assigned a karma value.
                // Slowly, the karma value of each action will be determined by the community.
                    // Skill level is awarded instantly using the following formula:
                        // Skill level = 1 / (effort * time)
                            // time is the time it takes to complete the action in seconds
                            // effort a value 1-99 that is taken from a normalized distribution of the time it takes to complete the action
                // the karma value is also determined by the amount of effort that it takes to complete the action.
                // the karma value is also determined by the amount of knowledge that it takes to complete the action.
                // the karma value is also determined by the amount of resources that it takes to complete the action.
                // the karma value is calculated   
                // Some bounties require a certain amount (or type) of karma to complete.
                // Karma is also used to purchase machine learning time on the network.
            // 2. Machine Learning Space (MLS)
                // Machine Learning Space is a resource that is used to train machine learning models.
                // MLS uses the energy model to determine the amount of energy that is used to train the machine learning model.
                // MLS is also used to purchase machine learning time on the network.
            // 3. Machine Learning Time (MLT)
                // Machine Learning Time is a resource that is used track the difference between the amount of time that a bounty takes to complete and the amount of MLS that is used to complete the bounty.
                // MLT is contractually awarded to the people who complete the bounties in magnitude of the following formula:
                    // MLT = (MLS * (1 - (time / 1000))) / 1000
                    // where time is the amount of time that it takes to complete the bounty in seconds.
                    // and MLS is the amount of machine learning space that is used to complete the bounty.
                    // the formula is designed to reward people who complete bounties quickly and efficiently.
                // MLT is also used to purchase machine learning time on the network.
            // 3. Artificial Intelligence Space (AIS)
                // Artificial Intelligence Space is a resource that is used to allow machine learning models to be used in unison with each other.
                // AIS guesses the amount of energy that a specific machine learning model will use when it is used in unison with other machine learning models.
                    // AIS compares the MLT of a previous bounty to the karma of the people who completed the bounty.
                    // AIS then returns a guess at the amount of MLS that will be returned based on data inputted by the user.
                // Space is a light weight resource that guesses the result of a MLT calculation and is deigned to be run on any device.
                // AIS is also used to create a decentralized autonomous learning institute network. by default it provides a user interface that retrives the data from the machine learning models and displays it in a way that is easy to understand.
                    // Privileges (contracted trade to HPDAO) can be used to create a decentralized autonomous learning institute network that can run without a data connection:
                        // 1. Access to the Dali Lama Contract
                        // 2. Access to the Hero Protagonist Contract
                        // 3. Access to the CatBox Contract
                        // 4. Access to the CatFeed Contract
                        // 5. Access to the CatScratch Contract
                        // 6. Access to the CatModel Contract
                        // 7. Access to the Energy Model Contract
                        // 8. Access to the Karma Model Contract
                        // 9. Access to the Machine Learning Space Model Contract
                        // 10. Access to the Machine Learning Time Model Contract
                        // 11. Access to the Artificial Intelligence Space Model Contract
                        // 12. Access to the Artificial Intelligence Time Model Contract
                            // This is a contract that submits a bounty to the Dali Lama Contract by running through all of the former contracts.
                                // This attemps to reduce the amount of data that is used to create a karma model.
                                // This uses the user's various settings and customizations to omit blocks of data that are not needed.
            // 4. Artificial Intelligence Time (AIT)
                // Artificial Intelligence Time is a resource that runs through the machine learning models and verifies contracts that are submitted to the Dali Lama Contract.
                // AIT is a heavy weight resource that runs through the machine learning models and is deigned to be run on more capable computing hardware.
                // AIT compares the AIS of a previous bounty (a computational guess at the MLS that will be rewarded) to each of the machine learning models by running through the machine learning models and comparing the results to the data that was inputted by the user.
                // AIT then creates a karma model that is used to determine the amount of karma that is rewarded to the people who complete the bounty.
                // Karma token distribution model that is used to reward people who complete bounties quickly and efficiently and pinpoint accuracy of the machine learning models.
                
            // 5. Energy Karma (EK)
                // Energy Karma is a token that is used to reward network participants for their contributions through a comparative analysis of the amount of energy that is used to complete a bounty and the amount of karma that is rewarded to the people who complete the bounty.
                // EK Splits the bounty into two parts:
                    // 1. The first part is the amount of energy that is used to complete the bounty.
                    // 2. The second part is the amount of karma that is rewarded to the people who complete the bounty.
                    // Karma is based on knowledge, effort, time, and resources. 
                    // Energy Karma is calculated by the following formula:
                        // EK = (Knowledge * Resources * Skill ) / Time
                            // Knowledge is the amount of information that is used to complete the bounty.
                            // Resources is the amount of energy that is used to complete the bounty.
                            // Skill is the amount of skill that is used to complete the bounty.
                            // Time is the time from the last time the bounty was perfected.
                            // The bounty is perfected when the skill level cap is broken. (someone gets a new high score)
                    // Credit 
                        // 1. reward the people who complete the bounty relative to the amount of energy that is used to complete the bounty.
                        // negative credit is a way to reduce spam. 
                    // Degree Credit
                        // 1. reward the people who complete the bounty within a certain degree of accuracy
                        // 2. skill level continues to increase while knowledge and resources are constant.
                    //  Medal Credit
                        // 1. reward the people who complete the bounty within a certain degree of accuracy and within a certain amount of time
                        // 2. skill level continues to increase while knowledge and resources are positive.
                            // creates a positive feedback loop that promotes the use of the network through competition of the application of knowledge and resources.
                    // Discovery Credit
                        // 1. reward the people who discover new information
                        // 2. skill level decreases while knowledge and resources are negative.
                            // makes it easier to achieve a high score using less energy and information.
                    // Foundational Credit
                        // the ek no longer sees spikes in the skill level of the bounty because the cap has not been broken.
                        // EK == 1, the bounty is perfected and karma is no longer contractual, it is no longer redistributed by the network.
                        // Karma becomes transferable and can be used to purchase machine learning time on the network.
                        // Karma can also be sold on the network, or used to fund grants, including:
                            // 1. projects
                            // 2. contracts
                            // 3. contracts that are used to create new contracts
                            // 4. contracts that are used to create new projects
                            // 5. contracts that are used to create new contracts that are used to create new contracts
                    // Certificate Credit
                        // certicates use the same 5 credit structure system but are used to track network connections that could connect isolated networks in a way that is beneficial to the network.
                            // complete a journey by completing a series of interconnected bounties
                            // the bounties are interconnected by the contracts that are used to create the bounties
                            // and contracts that are that run analytics on the Dali Lama Contract
                        // 1. Certification of Completion
                            // 1. complete a journey that is linked through a direct data connection
                        // 2. Certification of Graduation
                            // 1. complete a journey that is linked through a an analitical data connection
                        // 3. Certification of Medallion
                            // 1. complete a Graduation journey in a certain amount of time and with a certain degree of accuracy
                        // 4. Certification of Discovery
                            // 1. complete a journey that leads to new information
                        // 5. Certification of Foundational Intelligence
                            // 1. complete a journey expands the network by creating new projects and contracts
                        // 3. Certification of Mastery
                            // 1. complete multiple Medallion journeys in a certain amount of time and with a certain degree of accuracy
                        // 4. Certification of Mastery of Mastery
                            // 1. complete multiple Mastery journeys in a certain amount of time and with a certain degree of accuracy
                // Karma is conditional because it allows for changes to be made to the network by the people who use the network.
                    // Karma ions are snapshots of the network at a certain point in time, they are rewarded unconditionally to karma holders.
                        //Ions are used to create the Karma Model (formally known as the bank model).
                        // the Karma Model uses the Karma Ions to describe a contract's impact on the network. 
                            // the difference in Karma to Karma ions decribes the time since the contract participated in the network.
                            // Karma ions are used to determine skill levels of the people who complete bounties.
                            // Karma ions can be used to create quests in order to help people become more skilled.
                                // they also are used to calculate the difficulty of a bounty for a specific person.
                                // the time it might take them to complete the bounty.
                                // the amount of energy that they might use to complete the bounty.
                                // determine schedules to work on bounties
                                // determine and prepare grant applications
                // Energy is a resource that is used to purchase machine learning time on the network.

                

// the user is then taken to the contract builder with the parameters specified that they selected in the hero protagonist contract.
    // the AI tool is the algorithm that creates the contract. it's default parameters are set in the hero protagonist contract, but you can change the parameters in the contract builder.
        // it creates a graphical representation of the contract that you can download or upload.
        // it also creates a text representation of the contract that you can download or upload.
        // it also has a section where you can turn off different parts of the AI tool, like the content aggregation template, the reward distribution template, etc.
    // the meta data tool is the tool that allows you to view the data that is stored in the contract. 
        // it allows you to view the data in a graphical representation.
        // it allows you to view the data in a text representation.
        // the metadata explorer is a tool that connects you to contracts that help represent data in the different ways that you can view it.
        // it allows you to view the data in a table representation.
        // it allows you to view the data in a map representation.
        // it allows you to view the data in a graph representation.
        // it allows you to view the data in a chart representation.
        // it allows you to view the data in a timeline representation.
    // the Log tool is the tool that allows you to view the history of the contract.
    // the code editor is a tool that allows you to edit the code of the contract, bringing you back to the DaliLamaDaoForm with the new parameters.
        // however, you can skip the code editor and go straight to the 
        
// this is a display for the Dali Lama Contract, it is doing the following:
    //1. load the contract
    //2. Diplay the the ouline of the contract on the left side of the screen in the cat model exported as 
    //3. Display the actual contract on the right side of the screen in the cat model  exported as 


    

export const DaliLamaDao: FunctionComponent<DaliLamaDaoType> = ({ onConnect }) => {
    // use Dalilama.sol to create a new node and transfer the ownership of the node to the wallet address
    // create a blank PIC contract and transfer the ownership of the pic contract to a multisig wallet
    // create a CAT contract with the following parameters:
        // id: {Dali Lama}
        // name: Hero Protagonist
        // Tag: CatBox
        // Content: CatFeed
        // Description: CatScratch
        // AI: CatScratch lite

        // MetaData: CatFeed lite
        // log: CatBox lite
    // Sign CAT contract with the wallet address
    // create a new node with the following parameters and transfer the ownership of the node to the wallet address:
        // PIC: {CAT}
        // CAT: {CatScratch lite, CatFeed lite, CatBox lite, ContractBuilder, ContractModifier, DreamSequence}
        // This node is the Hero Protagonist Node. every parameter has a default value that can be changed in the contract builder.
        // since the Dali Lama Contract does not have a PIC or CAT, it cannot be initialized without a wrapper contract.
        // the wrapper contract creates a PIC and CAT contract and then claims them to be the Dali Lama's PIC and CAT contracts.
        // the wrapper contract must also creates a node that is the Dali Lama's node, and claims it to be the Dali Lama's node.
        // the wrapper contract can use the DaliLamaII contract to create a submit it's own contract to the Dali Lama Contract.

    
        const [contract, setContract] = useState<Contract | null>(null);
        const [contractAddress, setContractAddress] = useState<string | null>(null);
        const [contractName, setContractName] = useState<string | null>(null);
        const [contractDescription, setContractDescription] = useState<string | null>(null);


        // DLC[0] = {Dalai Lama}
        // PIC{Dali Lama}[] = [id, name, tag, content, description, AI, MetaData, Log]
        // CAT{Dali Lama}[] = [{DalaiLama}, Hero Protagonist, CatBox, CatFeed, CatScratch, CatScratch lite, CatFeed lite, CatBox lite]
        // DLC[1] = [Hero Protagonist{PIC, CAT}]
        // HPC[0] = [Dali Lama{Cat, {CatScratch lite, CatFeed lite, CatBox lite, ContractBuilder, ContractModifier, DreamSequence}}]
    
    function handleContractAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        setContractAddress(event.target.value);
    }
    function handleContractNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setContractName(event.target.value);
    }
    function handleContractDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setContractDescription(event.target.value);

    }

    function setDaliLamaContract() {
        setContractAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    }
    function setHeroProtagonistContract() {
        setContractAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    }
    function returnDaliLamaFunctions() { 
        // create a function that returns just the dalilama contract's function parameters
        // for example, the Dali Lama Contract has a function called "createHeroProtagonistContract" that creates a Hero Protagonist Contract.
    }
    function returnDaliLamaCode(){
        // The Dali Lama Code is created in a way that allows it to include detailed descriptions, instructions, and examples of how to use the contract.
        // For example if the Dali Lama contract contained the following function:
            // // Function: Create Node Contract, creates a new node contract with and transfers ownership of the node contract to the wallet address.
            // function createNode(address _PIC, address _CAT) public returns (address) {
            //
            //     Node node = new Node(_PIC, _CAT);
            //     node.transferOwnership(msg.sender);
            //     return address(node);
            // }
        // this function would be represented in the Cat Model as
            // <h1>Create Node Contract</h1>
            // <p>creates a new node contract with and transfers ownership of the node contract to the wallet address.</p>
            // <h2>Parameters</h2>
            // <p>_PIC: address</p>
            // <p>_CAT: address</p>
            // <h2>Returns</h2>
            // <p>address</p>

        // create a funtion that returns the Dali Lama Contract's code as an array of strings that can be used to help dilineate it's structure into a easier to digest format.
        function indexContract(contract: string){
            const contractArray = contract.split(" ");
            const contractConstructor = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractFunction = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractParameters = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractReturns = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractDescription = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractVariables = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractEvents = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractModifiers = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractLibraries = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractStructs = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractEnums = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractInterfaces = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractInheritance = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractUsingFor = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractFallback = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractReceive = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractAssembly = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractInlineAssembly = contract.match(/function\s+\w+\s*\(([^)]*)\)/);
            const contractIndex = {
                contractConstructor: contractConstructor,
                contractFunction: contractFunction,
                contractParameters: contractParameters,
                contractReturns: contractReturns,
                contractDescription: contractDescription,
                contractVariables: contractVariables,
                contractEvents: contractEvents,
                contractModifiers: contractModifiers,
                contractLibraries: contractLibraries,
                contractStructs: contractStructs,
                contractEnums: contractEnums,
                contractInterfaces: contractInterfaces,
                contractInheritance: contractInheritance,
                contractUsingFor: contractUsingFor,
                contractFallback: contractFallback,
                contractReceive: contractReceive,
                contractAssembly: contractAssembly,
                contractInlineAssembly: contractInlineAssembly,
            }
            return contractIndex
        }
    }
        // create a function that returns a navigation menu that allows the user to navigate to the different sections of the contract.
        // ignore everything but the contract's functions, parameters, returns, and descriptions.
        function returnContractNavigation(contractIndex: any){
            return (
                <div>
                    <h1>Contract Navigation</h1>   
                    <ul>
                        <li>Contract Constructor</li>
                            {contractIndex.contractConstructor ? <p>{contractIndex.contractConstructor}</p> : null}
                        <li>Contract Functions</li>
                            {contractIndex.contractFunction ? <p>{contractIndex.contractFunction}</p> : null}
                        <li>Contract Parameters</li>
                            {contractIndex.contractParameters ? <p>{contractIndex.contractParameters}</p> : null}
                        <li>Contract Returns</li>
                            {contractIndex.contractReturns ? <p>{contractIndex.contractReturns}</p> : null}
                        <li>Contract Description</li>
                            {contractIndex.contractDescription ? <p>{contractIndex.contractDescription}</p> : null}
                    </ul>
                </div>
            )
        }
        return(
            <div className={styles.daliBox}>
            <div className={styles.whiteBorderBlueBox}>
                <img
                    className={styles.guestWalletIcon}
                    alt=""
                    src="../guest-wallet2.svg"
                />
                <div className={styles.categoryTitleDiv}>DLDAO NAV</div>
                <img className={styles.questIcon} alt="" src="../quest-icon6.svg" />
                    <div className={styles.questHeadlineDiv}>Subcategory</div>
                    <button className={styles.settingButton}>
                    <img
                        className={styles.rectangleIcon}
                        alt=""
                        src="../rectangle-9.svg"
                />
                    </button>
            </div>
    </div>
        )
}



export const DaliLamaDaoView: FunctionComponent<DaliLamaDaoViewType> = ({ onClose }) => {
    return(
        <div className={styles.daliBoxView}>
            <div className={styles.whiteBorderBlueBox}>
                <img
                    className={styles.guestWalletIcon}
                    alt=""
                    src="../guest-wallet2.svg"
                />
                <div className={styles.categoryTitleDiv}>DLDAOVIEWER</div>
                <img className={styles.questIcon} alt="" src="../quest-icon6.svg" />
                    <div className={styles.questHeadlineDiv}>Subcategory</div>
                    <button className={styles.settingButton}>
                    <img
                        className={styles.rectangleIcon}
                        alt=""
                        src="../rectangle-9.svg"
                />
                    </button>
            </div>
    </div>
    )
}
