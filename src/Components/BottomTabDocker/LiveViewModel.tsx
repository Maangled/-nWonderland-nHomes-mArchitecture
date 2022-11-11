import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveViewModel.module.css";

type LiveViewModelType = {
  onClose?: () => void;
};

export const LiveViewModel: FunctionComponent<LiveViewModelType> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const onLiveViewButtonClick = useCallback(() => {
    navigate("/single-view");
  }, [navigate]);

  const onDualViewButtonClick = useCallback(() => {
    navigate("/dual-view");
  }, [navigate]);

  const onTriViewButtonClick = useCallback(() => {
    navigate("/tri-view");
  }, [navigate]);

  const onQuadViewButtonClick = useCallback(() => {
    navigate("/quad-view");
  }, [navigate]);

  const onPentaViewButtonClick = useCallback(() => {
    navigate("/penta-view");
  }, [navigate]);

  return (
    <div className={styles.liveViewModel}>
      <button className={styles.liveViewButton} onClick={onLiveViewButtonClick}>
        <div className={styles.rectangleDiv} />
        <div className={styles.rectangleDiv1} />
        <div className={styles.singleViewDiv}>Single View</div>
      </button>
      <button className={styles.dualViewButton} onClick={onDualViewButtonClick}>
        <div className={styles.rectangleDiv} />
        <div className={styles.rectangleDiv3} />
        <div className={styles.rectangleDiv4} />
        <div className={styles.singleViewDiv}>Dual View</div>
      </button>
      <button className={styles.triViewButton} onClick={onTriViewButtonClick}>
        <div className={styles.rectangleDiv} />
        <div className={styles.rectangleDiv3} />
        <div className={styles.rectangleDiv4} />
        <div className={styles.rectangleDiv8} />
        <div className={styles.singleViewDiv}>Triple View</div>
      </button>
      <button className={styles.quadViewButton} onClick={onQuadViewButtonClick}>
        <div className={styles.rectangleDiv} />
        <div className={styles.rectangleDiv10} />
        <div className={styles.rectangleDiv11} />
        <div className={styles.rectangleDiv12} />
        <div className={styles.rectangleDiv13} />
        <div className={styles.singleViewDiv}>Quad View</div>
      </button>
      <button
        className={styles.pentaViewButton}
        onClick={onPentaViewButtonClick}
      >
        <div className={styles.rectangleDiv} />
        <div className={styles.rectangleDiv10} />
        <div className={styles.rectangleDiv11} />
        <div className={styles.rectangleDiv12} />
        <div className={styles.rectangleDiv13} />
        <div className={styles.rectangleDiv19} />
        <div className={styles.singleViewDiv}>Penta View</div>
      </button>
    </div>
  );
};
