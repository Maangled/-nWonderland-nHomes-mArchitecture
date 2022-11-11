// dream sequence component is an animated view that will be used to display the dream sequence
// the dream sequence will be a series of computer generated images that will be displayed in a sequence
// the dream uses data from, the Cat-o-Log, the OACIS, the contract builder, and the video studio to create the dream sequence

import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedbackBase } from "react-native";
import styles from "./DreamSequence.module.css";

// dream sequence component is an animated view that renders the entire sequence of actions performed or encoded in the previous components
// the dream sequence will be a series of computer generated images that will be displayed in a sequence
// the dream uses data from, the Cat-o-Log, the OACIS, the contract builder, and the video studio to create the dream sequence
// the dream sequence will use the data from the previous components and offer a reward for any computer that can guess the sequence.

export const DreamSequence: FunctionComponent = () => {
    return (
        <div className={styles.dreamSequence}>
            <Text>Dream Sequence</Text>
        </div>
        
    );
}
export const DreamSequenceViewer: FunctionComponent = () => {
    return (
        <div className={styles.dreamSequenceViewer}>
            <Text>Dream Sequence Viewer</Text>
        </div>
        
    );
}