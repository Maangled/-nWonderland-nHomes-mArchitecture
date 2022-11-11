// import { FunctionComponent, useState, useEffect, Key } from "react";
// import styles from "./LoadingScreen.module.css";
// import { BCSStreamdeck } from "../StreamDeck/BCSStreamdeck";
// import { 
//     EnergyModel, 
//     } from "../EnergyModel/EnergyModel";
// import { ContractBuilder } from "../EnergyModel/ContractBuilder/ContractBuilder";
// import {
//     LargeContractDisplay, 
//     NoteContractDisplay, 
//     SmallContractDisplay 
//     } from "../EnergyModel/ContractDisplays";
// import { CatModel } from "../CatModel/CatModel";
// import { BankModel } from "../BankModels/BankModel";
// import { TradeModel } from "../Trade Components/TradeModel";
// import { PortalPopup } from "../PortalPopup";
// import { BottomTabsModel } from "../BottomTabDocker/BottomTabsModel";
// import { Dalillamaacroynmanimation } from "../../Animations/dalillamaacroynmanimation";
// import { useNavigate } from "react-router-dom";
// import { defaultCatModel } from "../CatModel/CatButton/CatModelTypes";




// // this is the loading screen popup for the app. it allows all of the background images to load before the app is rendered
// // this is to prevent the app from rendering before the images are loaded, which causes a white flash
// // 


// export const LoadingScreen: FunctionComponent = () => {
//     const [ isBCSStreamdeckPopupOpen, setBCSStreamdeckPopupOpen ] = useState(false);
//     const openBCSStreamdeckPopup = () => {
//         setBCSStreamdeckPopupOpen(true);
//     };
//     const closeBCSStreamdeckPopup= () => {
//         setBCSStreamdeckPopupOpen(false);
//     };
//     const navigate = useNavigate();


//     const [ isPortalPopupOpen, setPortalPopupOpen ] = useState(false);
//     const [ page, setPage ] = useState(0);
//     const pages = [    // this needs a background image for each page   
//         <>
//         <div className = {styles.loadingScreenText} >
//             <p>This is the Dali Lama School of Hero Protagonists.</p>
//             <p>
//                 Do not continue if you are not ready to change the world.
//             </p>
//             <p>
//                 <text className={styles.small}>Click anywhere to continue</text>
//             </p>
//         </div>
//         </>
//         ];

//     pages.push( //TODO: load in tool buttons one by one to emphasize the loading process, and to make it more interesting
//         // TODO: add a loading bar
//         // TODO: add background loading animation that becomes more complex as the app loads
//         // TODO: background animation on this page is a spinning globe that is being painted with the colors of the flags of the countries that have the most users of the app
//         // TODO: add a button to skip the loading process
//         // TODO: add a button to go back to the previous page
//         <>
//         <div className={styles.backgroundDivFaded} >
//             <div className={styles.loadingScreenText}>
//             <p>Synchonizing Stream Tools</p>
            
//         </div>
//         </div>
//         <BCSStreamdeck />
//         </>       
//     );
//     pages.push( // TODO: load in Bank parts one by one to emphasize the loading process, and to make it more interesting
//         // TODO: add a loading bar
//         // TODO: add background loading animation that becomes more complex as the app loads
//         // TODO: background animation on this page is a spinning globe that is being painted with the colors of the flags of the countries that have the most users of the app
//         // TODO: add to background animation connection lines that represent connections between users around the world
//         <><div className={styles.backgroundDivFaded}>
//             <div className={styles.loadingScreenText}>
//             <p>Activating Public and Private Media Profiles</p>
//         </div>
//         </div>
//         <BankModel /></>
//     );
//     pages.push(
//         // TODO: load in Trade parts one by one to emphasize the loading process, and to make it more interesting
//         // TODO: add a loading bar
//         // TODO: add background loading animation that becomes more complex as the app loads
//         // TODO: have background animation zoom in on random users around the world

//         <><div className={styles.backgroundDivFaded}>
//         <div className={styles.loadingScreenText}>
//             <p>Loading Custom Algorithms</p>
//         </div>
//         </div>
//         <CatModel /></>
//     );
//     pages.push(// TODO: load in Energy parts one by one to emphasize the loading process, and to make it more interesting
//         // TODO: add a loading bar
//         // TODO: add background loading animation that becomes more complex as the app loads
//         // TODO: have background loading animation build a pyramid that is then destroyed by a meteor that is then rebuilt by an army of robots into a cybernetic pyramid
//         <>
//         <div className={styles.backgroundDivFaded}>
//         <div className={styles.loadingScreenText}>
//             <p>Loading Build Tools</p>
//         </div>
//         </div>
//         <EnergyModel /></>
//     );
//     pages.push( // TODO: load in Matter parts one by one to emphasize the loading process, and to make it more interesting
//         // TODO: add a loading bar
//         // TODO: add background loading animation that becomes more complex as the app loads
//         // TODO: have background animation show a civilization being built from the ground up around the pyramid and then other merging civilizations with other pyramid civilizations
//         <>
//         <div className={styles.backgroundDivFaded}>
//         <div className={styles.loadingScreenText}>
//             <p>Acquiring Media Assets</p>
//         </div>
//         </div>
//         <TradeModel />
//         </>
//     );
//     pages.push(// TODO: have the background animation show a nondescript avatar being beamed down from the sky into the pyramid and then the whole screen digitizes into the matrix
    
//         <div className = {styles.loadingScreenText}>
//             <p>Blockchain protocol has been activated</p>
//             <p>Thank you for your patience</p>
//         </div>
//     );
//     pages.push(// TODO have the text flash on and off
//         <div className = {styles.loadingScreenText}>
//             <p>...</p>
//         </div>
//     );
//     pages.push( // TODO: have to text type itself out one letter at a time and then rearange itself into the final message
//                 // dalilamaacroynmanimation
//         <div className = {styles.loadingScreenText}>
//             <p>Operation: D.A.L.I. L.A.M.A</p>
//         </div>
//     );
//     pages.push(
//         <div className = {styles.loadingScreenTextRows}>
//         <div className = {styles.loadingScreenText1}>
//            <div className = {styles.cyan}>
//                <p><text className={styles.underlineBold}>D</text>ecentralized</p>
//                <p><text className={styles.underlineBold}>A</text>utonomous</p>
//                <p><text className={styles.underlineBold}>L</text>earning</p>
//                <p><text className={styles.underlineBold}>I</text>nstitute</p>
//           </div>
//            <div className = {styles.red}>
//                <p><text className={styles.underlineBold}>L</text>everaging</p>
//                <p><text className={styles.underlineBold}>A</text>lgorithmic</p>
//                <p><text className={styles.underlineBold}>M</text>edia</p>
//                <p><text className={styles.underlineBold}>A</text>ssets</p>
//            </div>
//        </div>
//        <div className = {styles.loadingScreenText2}>
//            <p> The D.A.L.I. L.A.M.A is <text className={styles.cyan}>an online school</text> that <text className={styles.red}>tracks and categorizes learning habits.</text> </p>
//        </div>
//        </div>
//     );
//     pages.push( // TODO: background animation is a notebook with a pen that is writing the text
//         <div className = {styles.loadingScreenTextRows}>
//             <NoteContractDisplay attributes={defaultCatModel.attributes}/>
//             <div className = {styles.loadingScreenText2}>
//                 <p>Every note you take, comment you make, and piece of content you upload gives you credit towards your future goals</p>
//             </div>
//         </div>
//     );
//     pages.push( // TODO: background animation takes the note out of the notebook and turns it into a 3d model
//         <div className = {styles.loadingScreenTextRows}>
//             <ContractBuilder attributes={[]} />
//             <div className = {styles.loadingScreenText2}>
//                 <p>Every Note is a smart contract and can be given special permissions to create different programs. It's completely decentralized and
//                     autonomous, so it can't be censored or manipulated.</p>
//             </div>
//         </div>
//     );
//     pages.push( // TODO: background animation is a 3d model of a pyramid that is being built by a robot army
//                 // TODO: have the robot army be made of the avatars of the users of the app
//                 // TODO: have large contract display show the D.A.L.I. L.A.M.A contract
//         <div className = {styles.loadingScreenTextRows}>
//             <div className = {styles.loadingScreenText2}>
//                 <p>
//                     This was the first note taken in the Dali Lama school system. It acts as an identifying token to 
//                     link all of the notes together. This is how we are able to track our own learning habits and 
//                     while building a communal foundation of knowledge. 
//                 </p>
//                 </div>
//             <LargeContractDisplay attributes={defaultCatModel.attributes} />
//         </div>
//     );
//     pages.push( // TODO: background animation zooms in to show one of the robots adding small particles using a laser to a model of the pyramid made of small particles suspended in mid air using sound waves coming from an array of tiny speakers
//         <div className = {styles.loadingScreenTextRows}>
//             <ContractBuilder attributes={[]} />
//             <div className = {styles.loadingScreenText4}>
//                 <p>
//                     This is the <text className={styles.cyan}>Buddah Quest</text>. It is a program that is designed to help you learn the basics of
//                     the Dali Lama school system. It is a series of notes that are linked together to create a learning path. 
//                     It is a great way to get started.
                    
//                 </p>
//                 </div>
//         </div>
//     );
//     pages.push( // TODO: have one button link to the buddah quest and the other download the app
//                 // TODO: have the background animation show an avatar being sucked into the pyramid and launched into the matrix after a button is pressed.
//             <div className={styles.loadingScreentext}>
//                 <CatModel fullscreen={true} hero={false} />
//                 </div>
//     );

//     const [ loadingScreenText, setLoadingScreenText ] = useState(pages[0]);
//     function renderLoadingScreenText() {
//         return (
//             <div className={styles.backgroundDiv}>
//                 {loadingScreenText}
//             </div>
//         );
//     }
//     const nextPage = () => {
//         if (page < pages.length) {
//             setPage(page + 1);
//             setLoadingScreenText(pages[page]);
//         } else {
//             navigate('/main-viewer');
//         }
//         return {loadingScreenText}
//     };
//         // useEffect (() => { 
//         //     const interval = setInterval(() => {
//         //         nextPage();
//         //     }, 3000);
//         //     return () => clearInterval(interval);
//         // }, [isTimed]);

//     return (
//         <main className ={styles.mainDiv} onClick={nextPage}> 
//                 {renderLoadingScreenText()}
//             </main>
//     )
// }
