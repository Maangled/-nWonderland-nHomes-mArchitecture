// hook for webcam
import { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

export const useWebcam = () => {
    const webcamRef = useRef(null);
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            let imgSrc = webcamRef.current;
            imgSrc.srcObject = stream;
            imgSrc.play();
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });
        return {webcamRef};
    };
    