// this is the first screen that the user sees when they open the app
// it shows a name input, a dropdown menu, and a button to submit the name
// the name and Occupation is sent to the dalai lama contract to be to be stored on the blockchain
// the dalai lama contract returns a unique id that is used to identify the user
// the ID is stored in the moralis database
// the next screen is the main view

import React, { useState, useEffect, useCallback, FunctionComponent } from 'react';
import { useMoralis } from "react-moralis";
import  styles  from './NamePopup.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// create a type for the props
type NamePopupType = {
    // onClose lets the parent component know when the user closes the popup
    onClose?: () => void;

};

// create a dropdown menu that lets the user choose a Occupation
// use formik to validate the name input


export const NamePopup: FunctionComponent<NamePopupType> = ({ onClose }) => {
    const { user, isAuthenticated, authenticate, logout, setUserData } = useMoralis();
    const [name, setName] = useState("Dalai Lama");
    const [Occupation, setOccupation] = useState("Hero");
    const [isNamePopupOpen, setNamePopupOpen] = useState(false);
    const [isOccupationPopupOpen, setOccupationPopupOpen] = useState(false);
    const [isSubmitPopupOpen, setSubmitPopupOpen] = useState(false);
    const [id, setId] = useState("");
    
    function handleSubmit() {
        console.log("submitting name and Occupation to the blockchain");
        console.log("name: " + name);
        console.log("Occupation: " + Occupation);
        console.log("sending name and Occupation to the blockchain");
        console.log("getting id from the blockchain");
        console.log("id: " + id);
        console.log("storing id in the moralis database");
        console.log("opening the main view");
    }

    return (
        <div className={styles.namePopupDiv}>
            <Formik
                initialValues={{ name: 'Dalai Lama' , Occupation: 'Hero'}}
                validate={values => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field type="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <label htmlFor="Occupation">Field</label>
                        <Field as="select" name="Occupation">
                            <option value="Hero">Hero</option>
                            <option value="Villain">Villain</option>
                            <option value="Neutral">Neutral</option>
                        </Field>
                        <ErrorMessage name="Occupation" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}