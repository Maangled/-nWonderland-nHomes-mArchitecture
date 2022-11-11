// this is the file that is responsible for displaying a component on the main viewer
// this file will take the component and display it on the main viewer


import React, { useState, useCallback, useEffect, useRef, FunctionComponent } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedbackBase } from "react-native";
import { EnergyModel } from "../Components/EnergyModel/EnergyModel";
// create a function that can be called in components to make a button that saves the state of the component and returns true to close the component


// create a react hook useDisplayOnMainViewer that will be used to display a component on the main viewer
export const useMainViewer = () => {
    
};
