import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./WalletModel.module.css";
import { useMoralis } from "react-moralis";


type WalletModelType = {
  onClose?: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};
export const WalletModel: FunctionComponent<WalletModelType> = ({
  onClose,
  setIsAuthenticated,
}) => {
  
  const { authenticate, isAuthenticated} = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authenticate, setIsAuthenticated]);
  
  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Connect To Hero Protagonist" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  
  return (
    <div className={styles.walletModelDiv}>
      <div className={styles.frameDiv}>
        <button className={styles.frameButton} onClick={login}>
          <img className={styles.image1Icon} alt="" src="image-1@2x.png" />
          <div className={styles.metaMaskDiv}>MetaMask</div>
        </button>
        <button className={styles.frameButton1}>
          <img className={styles.image3Icon} alt="" src="image-3@2x.png" />
          <div className={styles.metaMaskDiv}>Trust Wallet</div>
        </button>
        <button className={styles.frameButton2}>
          <img className={styles.image5Icon} alt="" src="image-5@2x.png" />
          <div className={styles.metaMaskDiv}>TokenPocket</div>
        </button>
        <button className={styles.frameButton3}>
          <img className={styles.image5Icon} alt="" src="image-7@2x.png" />
          <div className={styles.metaMaskDiv}>Token98</div>
        </button>
      </div>
      <div className={styles.frameDiv1} />
      <div className={styles.frameDiv}>
        <button className={styles.frameButton4}>
          <img className={styles.image2Icon} alt="" src="image-2@2x.png" />
          <div className={styles.metaMaskDiv}>WalletConnect</div>
        </button>
        <button className={styles.frameButton5}>
          <img className={styles.image4Icon} alt="" src="image-4@2x.png" />
          <div className={styles.metaMaskDiv}>MathWallet</div>
        </button>
        <button className={styles.frameButton6}>
          <img className={styles.image5Icon} alt="" src="image-6@2x.png" />
          <div className={styles.metaMaskDiv}>SafePal</div>
        </button>
      </div>
    </div>
  );
};
