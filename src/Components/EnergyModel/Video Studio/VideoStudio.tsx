import react, { FunctionComponent } from "react";
import styles from "./VideoStudio.module.css";

export const VideoStudio: FunctionComponent = () => {
    return (
        <div className={styles.videoStudio}>
            <div className={styles.videoStudioTitle}>
                <div className={styles.videoStudioTitleText}>
                    Video Studio
                </div>
            </div>
        </div>
    );
};

export const VideoStudioViewer: FunctionComponent = () => {
    return (
        <div className={styles.videoStudioViewer}>
            <div className={styles.videoStudioViewerBody}>
                <div className={styles.videoStudioTitleText}>
                    Video Studio Viewer
                </div>
            </div>
        </div>
    );
}
