// animation that goes from this:
//
// <div className = {styles.loadingScreenText}>
// <p>Operation: D.A.L.I. L.A.M.A</p>
// </div>
//
// to this:
//
// <div className = {styles.loadingScreenTextRows}>
// <div className = {styles.loadingScreenText1}>
//    <div className = {styles.cyan}>
//        <p><text className={styles.underlineBold}>D</text>ecentralized</p>
//        <p><text className={styles.underlineBold}>A</text>utonomous</p>
//        <p><text className={styles.underlineBold}>L</text>earning</p>
//        <p><text className={styles.underlineBold}>I</text>nstitute</p>
//   </div>
//    <div className = {styles.red}>
//        <p><text className={styles.underlineBold}>L</text>everaging</p>
//        <p><text className={styles.underlineBold}>A</text>lgorithmic</p>
//        <p><text className={styles.underlineBold}>M</text>edia</p>
//        <p><text className={styles.underlineBold}>A</text>ssets</p>
//    </div>
//</div>
//<div className = {styles.loadingScreenText2}>
//    <p> The D.A.L.I. L.A.M.A is <text className={styles.cyan}>an online school</text> that <text className={styles.red}>tracks and categorizes learning habits.</text> </p>
//</div>
//</div>

import React, { useState, useEffect } from "react";
import styles from "../css/LoadingScreen.module.css";
import { animated, useSpring } from "@react-spring/web";
import { useMeasure } from "react-use";
import { useWindowSize } from "react-use";
import { usePrevious } from "react-use";
import { useToggle } from "react-use";

export const Dalillamaacroynmanimation: React.FC = () => {
    // create the first page
    const [pages, setPages] = useState<JSX.Element[]>([]);
    const [page, setPage] = useState(0);
    const [props, set] = useSpring(() => ({
        opacity: 0,
        x: 0,
        height: 0,
        config: { mass: 5, tension: 500, friction: 80 },
    }));
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, x } = props;
    const { width } = useWindowSize();
    const prevPage = usePrevious(page);
    const [isLoaded, toggleIsLoaded] = useToggle(false);
    
    useEffect(() => {
        set({ height: viewHeight });
    }
    , [viewHeight]);

    useEffect(() => {
        set({ x: page * width, opacity: 1, height: viewHeight });
    }
    , [page, width, viewHeight]);

    useEffect(() => {
        if (prevPage === page) return;
        // set({ x: (page - prevPage) * width, opacity: 1 });
        set({ x: 0, opacity: 0 });
    }
    , [page, prevPage, width]);

    useEffect(() => {
        const newPages: JSX.Element[] = [];
        newPages.push(
            <animated.div className={styles.loadingScreenText} style={{ opacity: opacity.interpolate((o) => 1 - o), transform: x.interpolate((x) => `translate3d(${x}px,0,0)`) }}>
                <p>Operation: D.A.L.I. L.A.M.A</p>
            </animated.div>
        );
        newPages.push(
            <animated.div className={styles.loadingScreenTextRows} style={{ opacity, height: height.interpolate((h) => h + "px"), transform: x.interpolate((x) => `translate3d(${x}px,0,0)`) }
            }>
                <div className={styles.loadingScreenText1}>
                    <div className={styles.cyan}>
                        <p><text className={styles.underlineBold}>D</text>ecentralized</p>
                        <p><text className={styles.underlineBold}>A</text>utonomous</p>
                        <p><text className={styles.underlineBold}>L</text>earning</p>
                        <p><text className={styles.underlineBold}>I</text>nstitute</p>
                    </div>
                    <div className={styles.red}>
                        <p><text className={styles.underlineBold}>L</text>everaging</p>
                        <p><text className={styles.underlineBold}>A</text>lgorithmic</p>
                        <p><text className={styles.underlineBold}>M</text>edia</p>
                        <p><text className={styles.underlineBold}>A</text>ssets</p>
                    </div>
                </div>
                <div className={styles.loadingScreenText2}>
                    <p> The D.A.L.I. L.A.M.A is <text className={styles.cyan}>an online school</text> that <text className={styles.red}>tracks and categorizes learning habits.</text> </p>
                </div>
            </animated.div>
        );
        setPages(newPages);
        toggleIsLoaded();
    }
    , [opacity, height, x, toggleIsLoaded]);
    
    return (
        <div className={styles.loadingScreenTextContainer} {...bind}>
            {pages}
        </div>
    );
};


