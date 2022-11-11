// this file will replace the MatterButton.tsx file
// create an animated cat button that will be used to navigate to the Matter Model
// the cat will slowly walk around the edges of the screen, and when the user clicks on the cat, the a box will appear with a radioactive symbol
// the cat will then jump into the box and the box will close, and then expand into the Matter Model (the matter model will be renamed CatBox.tsx)
// The cat will then be sitting on top of the matter model, sleeping
// when the matter model is to be closed, the cat will wake up and jump into the matter model, and then the matter model will shrink back into the box, and the cat will jump out of the box and walk around the edges of the screen again
// the box will then disappear

// import the React and React Native components
import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedbackBase } from "react-native";
import { Cat } from "./Cat";
import { CatType, DefaultCatState, CatState } from "./CatTypes";
import { Dimensions } from "react-native";
import styles from "./CatButton.module.css";
import { CatModel } from "../CatModel";
import { PortalPopup } from "../../PortalPopup";

type CatButtonType = {
    onClick: () => void;
}



export const CatButton: FunctionComponent<CatButtonType> = (onClick) => {
    // create the cat state
    const [catState, setCatState] = useState(DefaultCatState.catState);
    const [catBreed, setCatBreed] = useState(DefaultCatState.catBreed);
    const [catPosition, setCatPosition] = useState(DefaultCatState.catPosition);
    const [catDirection, setCatDirection] = useState(DefaultCatState.catDirection);
    const [catSpeed, setCatSpeed] = useState(DefaultCatState.catSpeed);
    const [catSize, setCatSize] = useState(DefaultCatState.catSize);
    const [catColor, setCatColor] = useState(DefaultCatState.catColor);
    const [catImage, setCatImage] = useState(DefaultCatState.catImage);
    const [isCatModelVisible, setIsCatModelVisible] = useState(false);
    
        // get the size of the screen
        const screenWidth = Dimensions.get("window").width;
        const screenHeight = Dimensions.get("window").height;
    // create a function that will pass all the states to a cat component
    const [catX, setCatX] = useState(0);
    const [catY, setCatY] = useState(0);
    // create a funtion that 
    let cAtributes=[
        {
            catState,
            catBreed,
            catPosition,
            catDirection,
            catSpeed,
            catSize,
            catColor,
            catImage,
        }
        ];
        
    function setCatStateFunction(props: any) {
        setCatState(props);
        cAtributes[0] = props;
    }
    function setCatBreedFunction(props: any) {
        setCatBreed(props);
        cAtributes[1] = props;
    }
    function setCatPositionFunction(props: any) {
        setCatPosition(props);
        cAtributes[2] = props;
    }
    function setCatDirectionFunction(props: any) {
        setCatDirection(props);
        cAtributes[3] = props;
    }
    function setCatSpeedFunction(props: any) {
        setCatSpeed(props);
        cAtributes[4] = props;
    }
    function setCatSizeFunction(props: any) {
        setCatSize(props);
        cAtributes[5] = props;
    }
    function setCatColorFunction(props: any) {
        setCatColor(props);
        cAtributes[6] = props;
    }
    function setCatImageFunction(props: any) {
        setCatImage(props);
        cAtributes[7] = props;
    }
    function openCatModel() {
        setIsCatModelVisible(true);
    }
    function closeCatModel() {
        setIsCatModelVisible(false);
    }
    // create the cat ref
    const catRef = useRef<HTMLDivElement>(null);
    // create the cat animation
    const catAnimation = useRef(new Animated.Value(0)).current;
    const catAnimation2 = useRef(new Animated.Value(0)).current;
    // set the 
    const catPassThrough = () => {
        cAtributes.map((cat) => {
            if (cat.catState === catState) {
                setCatPositionFunction(cat.catPosition);
                setCatDirectionFunction(cat.catDirection);
                setCatSpeedFunction(cat.catSpeed);
                setCatSizeFunction(cat.catSize);
                setCatColorFunction(cat.catColor);
                setCatImageFunction(cat.catImage);
            }
        });
    };
    //
    useEffect(() => {
        catPassThrough();
    }, [catState]);

    // Set the duration based on the cat speed
    let catDuration = 9999 / catSpeed;
    console.log(catDuration);
    // create the cat animation
    // create an array of animations
    const catAnimations = [
        Animated.timing(catAnimation, {
            toValue: 1,
            duration: catDuration,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
        Animated.timing(catAnimation, {
            toValue: 0,
            duration: catDuration,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ];
    // create a function that will animate the cat

        Animated.loop(
            Animated.sequence(catAnimations)
        ).start();
    
    // useEffect to keep the main buttons on the screen




    
    const updateCatPosition = () => {
        // get the cat position
        if (catPosition === "left") { setCatPosition('bottom;');  }
        if (catPosition === "bottom") { setCatPosition('right'); }
        if (catPosition === "right") { setCatPosition('top'); }
        if (catPosition === "top") { setCatPosition('left'); }
    };
    const catStart = () => {
        if (catPosition === "left") { return 0 }
        if (catPosition === "bottom") { return 0 }
        if (catPosition === "right") { return 0 }
        if (catPosition === "top") { return 0 }
        return 0;
    };
    const catEnd = () => {
        if (catPosition === "left") { return screenHeight -100 }
        if (catPosition === "bottom") { return screenWidth - 100 }
        if (catPosition === "right") { return screenHeight - 100 }
        if (catPosition === "top") { return screenWidth - 100 }
        return 0;
    };
    // create the cat animation style
    // creat a function that will return the cat animation style based on the cat's position and direction. The cat will move in a straight line until it reaches the edge of the screen, and then it will turn around and walk back in the opposite direction
    const getCatAnimationStyle = () => {
        // create the cat animation style
            return({ transform: [{ translateY: catAnimation.interpolate({ inputRange: [0, 1], outputRange: [catStart(), catEnd()] }) }] });
    }
    // create the cat animation style
    useEffect (() => {
        setCatAnimationStyle(getCatAnimationStyle());
    }, [catAnimation]);
    
    const [catAnimationStyle, setCatAnimationStyle] = useState(getCatAnimationStyle());
    
    return(
        <>
        <div className ={styles.catWalkDiv} >
        <Animated.View style={catAnimationStyle}>
            <div ref={catRef} className={styles.catContainer} onClick = {openCatModel}>
                <Cat cAtributes={cAtributes}/>
            </div>
        </Animated.View>
        </div>
            </>
    );
}
