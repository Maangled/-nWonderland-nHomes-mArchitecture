// this is the code editor component for the energy model
// it is a react component that is used to display the content of a quest
// it is designed to house the content of a quest in a way that is easy to read and understand
// it is also designed to be able to display the content of a quest in a way that is easy to edit
// it is designed to fit into the energy model
// it is designed to house the code for the entire website

// import statements
import React, { useEffect } from 'react';
import styles from './QuestContentDisplay.module.css';
import { useMoralis, useNFTBalances } from "react-moralis";
import { QuestLogInterface, TimeStamp } from '../QuestLog/QuestLogTypes';


type QuestContentDisplayType = {
    questContent: string;
    questAttributes: any;
    onPublish: (questContent: string) => void;
    onMemorize: (questContent: string) => void;
    onClose?: () => void;
    onEdit?: () => void;
    addUpdate?: (update: QuestLogInterface) => void;
};
// Quest content is a form that is used to create new content on the platform.
// at it's core it is a question and response form that interacts with a AI subsystem connected to the host's local server
// the form will automatically generate a response on what is being typed.
// TODO: add a response that is another form that sends the data of first form to the server and picks up the response from the server and displays it.
// TODO: add a voice to text feature that will allow the user to speak into the microphone and have the text be displayed in the form.
// TODO: turn voice to text into a feature that is constantly on and will allow the user to speak into the microphone and have the text be displayed in the form.
// TODO: investigate the possibility of using CHATGPT from open AI to create the bot that will respond to the user.
// TODO: create a contract function that will gather the data created by the user and send it to the server as a package.
// TODO: log all responses from the server in a log file that will be displayed in the log tab.
// TODO: manage brain so that it creates a local copy of the brain constantly training itself to be more accurate.
// this specific instance is isolated to the contract builder until the user hits the memorize or publish button
// memorizing saves the entire conversation to the user's profile and stores it on the blockchain
// TODO: split the form using the dual view component after the rework of the dual view component
// it will be designed to pull data from two different sources and display it in a way that is easy to read and understand through a contract agreement

// add a brain button for each of the AI tools that are available



export const QuestContentDisplay: React.FunctionComponent<QuestContentDisplayType> = ({ questContent, questAttributes, onPublish, onMemorize }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [content, setContent] = React.useState(questContent);
    const [isSaving, setIsSaving] = React.useState(false);
    const contentFormRef = React.useRef<HTMLFormElement>(null);
    const contentTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const responseFormRef = React.useRef<HTMLFormElement>(null);
    const responseTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const { Moralis, chainId, isAuthenticated } = useMoralis();
    const [responseAuthorized, setResponseAuthorized] = React.useState(false);
    const [aiTools, setAiTools] = React.useState([]);
    const [aiTitle, setAiTitle] = React.useState('Ask Brain');

    const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSaving) {
            return;
        }
        setIsSaving(true);
        try {
            await onPublish(content);
        } catch (error) {
            console.error(error);
        }
        setIsSaving(false);
    };

    useEffect(() => {
        setAiTools(questAttributes?.aiTools);
    }, [questAttributes]);

    // map each of the ai tools to a button
    // when the button is clicked it will send the content to the server and update the response
    // const AiTools = aiTools.map((data) => {
    //     return (
    //         <button
    //             className={styles.connectToServerContainer}
    //             onClick={() => {
    //                 setAiTitle(data);
    //             }}
    //         >
    //             {data}
    //         </button>
    //     );
    // });

    // lets make an ask brain button that covers the response form so that updates the response on the initial input
    const UseBrainButton = () => {

        return (
            <button
                className={styles.connectToServerContainer}
                onClick={() => {
                    if (contentTextAreaRef.current) {
                        updateResponse(contentTextAreaRef.current.value as unknown as React.ChangeEvent<HTMLTextAreaElement>);
                        setResponseAuthorized(true);
                    }
                }}
            >
                {aiTitle}
            </button>
        );
    };

    let response = 'hello world';


    // use moralis to send the data to the server
    const sendToServer = async (_data: React.ChangeEvent<HTMLTextAreaElement>) => {
        // create a variable that will hold the data that is being sent to the server
        const data = _data.target.value;
        // create a variable that will hold the response from the server
        let response = 'Hello World';
        // send the data to the server
        try {
            // send the data to the server
            response = await Moralis.Cloud.run('useBrain', { data });
        } catch (error) {
            console.error(error);
        }
        // return the response from the server
        return response;
    }

    // create a function that will update the response from the server
    function updateResponse(data: React.ChangeEvent<HTMLTextAreaElement>) {
        // update the response from the server
        sendToServer(data).then((response) => {
            // update the response from the server
            if (responseTextAreaRef.current) {
                responseTextAreaRef.current.value = response;
            } else {
                console.error('responseTextAreaRef.current is null');
            }
        });
    }

    //TODO: implement a function that will update the quest log with content and response edits based on timestamps of the edits
    // const updateQuestLog = async (data: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     // create a variable that will hold the data that is being sent to the server
    //     const data = _data.target.value;
    //     // create a variable that will hold the response from the server
    //     let response = 'Hello World';
    // }


    // create a function that runs updateResponse when the content is updated
    const contentForm = (
        <>
            <form
                ref={contentFormRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSaving(true);
                    if (contentTextAreaRef.current) {
                        setContent(contentTextAreaRef.current.value);
                    }
                    setIsSaving(false);
                    setIsEditing(false);
                }}
            >
                <textarea
                    ref={contentTextAreaRef}
                    defaultValue={content}
                    onChange={(e) => updateResponse(e)}
                    className={styles.contentFormDiv}
                />
            </form>
        </>
    );
    const responseForm = (
        <>
            <form
                ref={responseFormRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSaving(true);
                    if (responseTextAreaRef.current) {
                        setContent(responseTextAreaRef.current.value);
                    }
                    setIsSaving(false);
                    setIsEditing(false);
                }}
            >
                <textarea
                    ref={responseTextAreaRef}
                    defaultValue={response}
                    className={styles.responseFormDiv}
                />
            </form>
        </>
    );
    return (
        <div className={styles.colomize}>

            <div className={styles.contentFormDiv}>
                {contentForm}
            </div>
            {responseAuthorized ? (<div className={styles.contentFormDiv}>
                {responseForm}
            </div>) : (<UseBrainButton />)}
        </div>
    )
}
