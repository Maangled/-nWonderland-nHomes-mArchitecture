import { FunctionComponent } from "react";
import styles from "./HostWalletModel.module.css";

type HostWalletModelType = {
  onClose?: () => void;
};

export const HostWalletModel: FunctionComponent<HostWalletModelType> = ({
  onClose,
}) => {
  return (
    <div className={styles.hostWalletModel}>
      <div className={styles.walletAdressDiv}>
        <div className={styles.x919365069De1326BAab363eE8a277Div}>
          0x919365069De1326BAab363eE8a2774849c561563
        </div>
      </div>
      <div className={styles.mainEthAddress}>Main Eth Address</div>
      <img className={styles.image8Icon} alt="" src="image-8@2x.png" />
    </div>
  );
};
