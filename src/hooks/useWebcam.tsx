// hook for webcam
import { useRef, useEffect, useState, useCallback } from 'react';
//TODO: figure out how to get the webcam to work


export const useWebcam = () => {
    const webcamRef = useRef(null);
    const [isWebcamOn, setWebcamOn] = useState(false);
    
    const startWebcam = useCallback(() => {
        setWebcamOn(true);
    }, []);
    
    const stopWebcam = useCallback(() => {
        setWebcamOn(false);
    }, []);
    
    const toggleWebcam = useCallback(() => {
        setWebcamOn((prev) => !prev);
    }, []);
    
    useEffect(() => {
        if (webcamRef.current && isWebcamOn && !webcamRef.current.srcObject?) {
            console.log(isWebcamOn, webcamRef.current);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
            webcamRef.current.srcObject = stream;
            });
        } else  {
            
            if (webcamRef.current && webcamRef.current.srcObject) {
                console.log(isWebcamOn,webcamRef.current);
                webcamRef.current.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
                webcamRef.current.srcObject = null;
            }
        }

    }, [webcamRef, isWebcamOn, setWebcamOn, toggleWebcam]);    
    return { webcamRef, toggleWebcam, startWebcam, stopWebcam, isWebcamOn };
};


//     async function enableWebcam() {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             setIsWebcamOn(true);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     if (isWebcamOn) {
//         enableWebcam();
//     }
//     else if(webcamRef.current !== null) {
//         return function cleanup() {
//             webcamRef.current.srcObject.getTracks().forEach((track: { stop: () => any; }) => track.stop());
//         }
//     } else {
//         return {webcamRef, isWebcamOn, setIsWebcamOn};
//     }
//     return {webcamRef, isWebcamOn, setIsWebcamOn};
// };
    