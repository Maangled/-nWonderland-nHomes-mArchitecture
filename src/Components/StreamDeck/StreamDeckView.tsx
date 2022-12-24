import { FunctionComponent, useState, useCallback, useRef, useEffect, useInsertionEffect } from 'react';
import { PortalPopup } from "../PortalPopup";
import styles from "./BCSStreamdeck.module.css";
//import { useWebcam } from "../../hooks/useWebcam";
import  useOutsideClick  from "../../hooks/useOutsideClick";

type StreamDeckViewType = {
    onClose?: () => void;
};

//TODO: figure out how to get the webcam to work


export const StreamDeckView: FunctionComponent<StreamDeckViewType> = ({
    onClose,
}) => {

    const [openViewCount, setOpenViewCount] = useState(0);
    const miniViews: JSX.Element[] = [];
    const [isViewSelectorOpen, setViewSelectorOpen] = useState(false);
    const streamRef = useRef<HTMLDivElement>(null);
    const streamRefs: any[] = [];


    // create a view for each ref
    for (let i = 0; i < openViewCount; i++) {
        miniViews.push(
            <div className={styles.miniView} ref={streamRefs[i]}>
                <div className={styles.miniViewHeader}>
                    <div className={styles.miniViewTitle}>View {i + 1}</div>
                    <div className={styles.miniViewClose} onClick={() => {
                        setOpenViewCount(openViewCount - 1);
                    }}>X</div>
                </div>
            </div>
        );
    }


    // open the view selector
    const openViewSelector = () => {
        setViewSelectorOpen(true);
        console.log("openViewSelector");
    };

    // close the view selector
    const closeViewSelector = () => {
        setViewSelectorOpen(false);
        console.log("closeViewSelector");
    };

    const [stream, setStream] = useState<MediaStream>();
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, closeViewSelector);
    // create a popup using the portal popup component that will be used to select the view
    const ViewSelectorPopup = () => {
        const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
        const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo>();

        // get devices on mount and set devices state
        const getDevices = useCallback(async () => {
            const d1 = await navigator.mediaDevices.enumerateDevices();
            setDevices(d1);
        }, []);

        // get devices on mount
        useEffect(() => {
            getDevices();
        }, [getDevices]);

        // find a way to initialize the webcam
        const initializeWebcam = useCallback(async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: selectedDevice?.deviceId,
                },
            });
            setStream(stream);
        }, [selectedDevice]);
        
        // initialize the webcam when the selected device changes
        const handleDeviceChange = useCallback(async (event: React.ChangeEvent<HTMLSelectElement>) => {
            const deviceId = event.target.value;
            const device = devices.find(d => d.deviceId === deviceId);
            setSelectedDevice(device);
            handleStartStream();
        }, [devices,stream]);

        const handleStartStream = useCallback(async () => {
            const stream1 = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: selectedDevice?.deviceId,
                },
            });
            setStream(stream1);
        }, [selectedDevice, setSelectedDevice]);

        const addWebcam = () => {
            setOpenViewCount(openViewCount + 1);
            console.log("openviewcount", openViewCount);
            setViewSelectorOpen(false);
            streamRefs.push(streamRef);
        };

        if (stream) {
            const video = document.createElement("video");
                    video.srcObject = stream;
                    video.play();
                    streamRef.current?.appendChild(video);
        }

        // return the stream preview for the selected device to be used in the popup

        const StreamPreview = () => {
            return (
                <div className={styles.displayViewDiv} ref={streamRef}>
                </div>
            );
        };

        return (
            <div className={styles.selectorPopupDiv}>
                <div className={styles.topRowDiv}>
                    <div className={styles.selectMediaDropDown}>
                        <select onChange={handleDeviceChange}>
                            {devices.map((device) => (
                                <option key={device.deviceId}>
                                    {device.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.addViewButton} onClick={addWebcam}>add view</div>
                </div>
                <div className={styles.displayViewDiv}>
                    <StreamPreview />
                </div>
            </div>

        );
    };
    
    // split the webcam
    const WebcamView = () => {
        if (openViewCount == 1) {
        return (
            <>
                <div className={styles.displayViewDiv} ref={streamRefs[0]}>
                </div>
            </>
        );
        } else if (openViewCount > 1) {
            return (
                <>
                    <div className={styles.displayViewDivShort} ref={streamRefs[0]}>
                    </div>
                    <div className={styles.displayBottomRow}>
                        {streamRefs.map((streamRefs, index) => {
                            console.log("smallerviews", index);
                            if (index > 0) {
                                return (
                                    <div className={styles.displayViewDiv} ref={streamRefs[index]}>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else {
            return(
                <>
                </>
            )
        }
    }

    
    

    return (
        <><div className={styles.frameDiv}>
            <div className={styles.frameDiv1}>
                <div className={styles.webcamView}>
                    <WebcamView />
                </div>
                <div className={styles.frameDiv2}>
                    <div className={openViewCount == 0 ? styles.centerButton : styles.rightButtonsDiv}>
                        {}
                        <button className={styles.addViewButton} onClick={openViewSelector}>+</button>
                    </div>
                </div>
            </div>
        </div>{isViewSelectorOpen &&
            <div ref={wrapperRef}> 
                <ViewSelectorPopup />
            </div>
            }</>
    );
};