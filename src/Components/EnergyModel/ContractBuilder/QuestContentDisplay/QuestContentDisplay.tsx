// this is the code editor component for the energy model
// it is a react component that is used to display the content of a quest
// it is designed to house the content of a quest in a way that is easy to read and understand
// it is also designed to be able to display the content of a quest in a way that is easy to edit
// it is designed to fit into the energy model
// it is designed to house the code for the entire website

// import statements
import React from 'react';
import styles from './QuestContentDisplay.module.css';
import { useMoralis, useNFTBalances } from "react-moralis";

type QuestContentDisplayType = {
    questContent: string;
    onPublish: (questContent: string) => void;
    onMemorize: (questContent: string) => void;
    onClose?: () => void;
    onEdit?: () => void;
};
// Quest content is a form that is used to create new content on the platform.
// at it's core it is a question and response form that interacts with a AI subsystem connected to the host's local server
// the form will automatically generate a response on what is being typed.
// TODO: add a response that is another form that sends the data of first form to the server and picks up the response from the server and displays it.
// TODO: add a voice to text feature that will allow the user to speak into the microphone and have the text be displayed in the form.
// TODO: turn voice to text into a feature that is constantly on and will allow the user to speak into the microphone and have the text be displayed in the form.
// TODO: investigate the possibility of using CHATGPT from open AI to create the bot that will respond to the user.
// TODO: create a contract function that will gather the data created by the user and send it to the server as a package.



export const QuestContentDisplay: React.FunctionComponent<QuestContentDisplayType> = ({ questContent, onPublish, onMemorize }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [content, setContent] = React.useState(questContent);
    const [isSaving, setIsSaving] = React.useState(false);
    const contentFormRef = React.useRef<HTMLFormElement>(null);
    const contentTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const responseFormRef = React.useRef<HTMLFormElement>(null);
    const responseTextAreaRef = React.useRef<HTMLTextAreaElement>(null);
    const { Moralis, chainId, isAuthenticated } = useMoralis();

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


    // create a variable that will hold the response from the server
    let response = 'Hello World';
    

    // create an async function that will send the data to the server and get the response from the server
    async function sendToServer() {
        // create a variable that will hold the data that is being sent to the server
        let data = content;
        // create a variable that will hold the response from the server
        let response = 'Hello World';
        // send the data to the server
        try {
            // send the data to the server
            response = await Moralis.Cloud.run('capitalizeString', { data });
        } catch (error) {
            console.error(error);
        }
        // return the response from the server
        return response;
    }

    // create a function that will update the response from the server
    function updateResponse() {
        // update the response from the server
        sendToServer().then((response) => {
            // update the response from the server
            if (responseTextAreaRef.current) {
                responseTextAreaRef.current.value = response;
            } else {
                console.error('responseTextAreaRef.current is null');
            }
        });
    }

    // create a function that runs updateResponse when the content is updated
    React.useEffect(() => {
        // update the response from the server
        updateResponse();
    }, [content]);
        
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
                className={styles.contentFormDiv}
            />
        </form>
        </>
    );
    const responseForm = (
        <>
        <form
            ref = {responseFormRef}
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
            <div className={styles.contentFrameDiv}>
        {contentForm}
      </div><div className={styles.contentFrameDiv}>
          {responseForm}
        </div></div>
        )
    }
