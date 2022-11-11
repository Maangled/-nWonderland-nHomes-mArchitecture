import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatterButton.module.css";

export const MatterButton: FunctionComponent = () => {
  const navigate = useNavigate();

  const onMatterButtonClick = useCallback(() => {
    navigate("/single-view");
  }, [navigate]);

  return (
    <button className={styles.matterButton} onClick={onMatterButtonClick}>
      <div className={styles.rectangleDiv} />
      <div className={styles.rectangleDiv1} />
      <div className={styles.singleViewDiv}>Single View</div>
    </button>
  );
};
