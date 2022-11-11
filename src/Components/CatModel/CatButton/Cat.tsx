// This is the model for the cat button
// it's a Cat

import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import styles from "./Cat.module.css";
import { CatType, DefaultCatState } from "./CatTypes";

export const Cat: FunctionComponent<CatType> = ({ cAtributes }) => {
    // create the state for the cat
    const [catState, setCatState] = useState(cAtributes[0].catState);
    const [catBreed, setCatBreed] = useState(cAtributes[0].catBreed);
    const [catPosition, setCatPosition] = useState(cAtributes[0].catPosition);
    const [catDirection, setCatDirection] = useState(cAtributes[0].catDirection);
    const [catSpeed, setCatSpeed] = useState(cAtributes[0].catSpeed);
    const [catSize, setCatSize] = useState(cAtributes[0].catSize);
    const [catColor, setCatColor] = useState(cAtributes[0].catColor);
    const [catImage, setCatImage] = useState(cAtributes[0].catImage);

    // create the ref for the cat
    const catRef = useRef<HTMLDivElement>(null);

    // create the useEffect for the cat
    useEffect(() => {
        // create the cat state
        const catState = {
            catState: "walking",
            catBreed: "normal",
            catPosition: "left",
            catDirection: "right",
            catSpeed: 1,
            catSize: "small",
            catColor: "black",
            catImage: "cat",
        };
        // set the cat state
        setCatState(catState.catState);
        setCatBreed(catState.catBreed);
        setCatPosition(catState.catPosition);
        setCatDirection(catState.catDirection);
        setCatSpeed(catState.catSpeed);
        setCatSize(catState.catSize);
        setCatColor(catState.catColor);
        setCatImage(catState.catImage);
    }, []);





    // create the cat
    const cat = (
        <div className={styles.boundingBox}>
        <div
            ref={catRef}
            className={styles.cat}
        >CAT
        </div>
        </div>
    );

    // return the cat
    return cat;
}