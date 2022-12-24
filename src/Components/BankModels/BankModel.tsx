import { FunctionComponent, useState } from "react";
import styles from "./BankModel.module.css";
import { useVerifyMetadata } from "../../hooks/useVerifyMetadata";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Skeleton } from "antd";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import AddressInput from "../../AddressInput";
//import GuestProfile from "./Account/GuestProfile";

type BankModelType = {
  onClose?: () => void;
};


const { Meta } = Card;

export const BankModel: FunctionComponent<BankModelType> = ({ onClose }) => {
  // const { data: BankModeler } = useNFTBalances();
  const { account, Moralis, chainId } = useMoralis();
  //const  guestProfile  = GuestProfile(account);
  const [visible, setVisibility] = useState(false);
  const [receiverToSend, setReceiver] = useState(null);
  const [amountToSend, setAmount] = useState(null);
  const [nftToSend, setNftToSend]: any = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();
  const { logout } = useMoralis();
  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  async function transfer(nft: any, amount: any, receiver: any) {
    console.log(nft, amount, receiver);
    const options: any = {
      type: nft?.contract_type?.toLowerCase(),
      tokenId: nft?.token_id,
      receiver,
      contractAddress: nft?.token_address,
    };

    if (options.type === "erc1155") {
      options.amount = amount ?? nft.amount;
    }

    setIsPending(true);

    try {
      const tx = await Moralis.transfer(options);
      console.log(tx);
      setIsPending(false);
    } catch (e: any) {
      alert(e.message);
      setIsPending(false);
    }
  }

  const handleTransferClick = (nft: any) => {
    setNftToSend(nft);
    setVisibility(true);
  };

  const handleChange = (e: any) => {
    setAmount(e.target.value);
  };

  //console.log("BankModeler", BankModeler);
  return (
    <div className={styles.bankModelDiv}>
      <button className={styles.logoutButton} onClick={logOut}>
        <div className={styles.logoutButtonText}>Logout</div>
      </button>
      <div className={styles.headerDiv}>
        <img className={styles.avatarImg1} alt="" src="avatar-img-1@2x.png" />
        <div className={styles.frameDiv}>
          <div className={styles.heroProtagonistDiv}>Hero Protagonist</div>
          <div className={styles.formingTheSuperheroAcadamy} >{`Forming the Superhero Acadamy `}</div>
        </div>
      </div>
      <div className={styles.bodyDiv}>
        <div className={styles.bankContentDiv}>
          <div className={styles.vaultWidgetDiv}>
            <div className={styles.vaultDiv}>Vault</div>
            <div className={styles.vaultBodyDiv}>
              {/* <Skeleton loading={!BankModeler?.result}>
                {BankModeler?.result &&
                  BankModeler.result.map((nft, index) => {
                    //Verify Metadata
                    nft = verifyMetadata(nft);
                    return (
                      <>

                        <button className={styles.nFTImageButton}>
                          <img
                            className={styles.nFTImageButton}
                            alt=""
                            //src={nft?.image || "error"}
                          />
                        </button>
                        <div className={styles.nFTInfoDiv}>
                          <b className={styles.nftName}>{nft.name}</b>
                          <div className={styles.nftTokenAddress}>{nft.token_address}</div>
                          <div className={styles.nFTLinksDiv}>
                            <button className={styles.nFTLinkButton}>
                              <FileSearchOutlined
                                onMouseOver={() => nft.name}
                                onClick={() => window.open(
                                  `${getExplorer(chainId)}address/${nft.token_address}`,
                                  "_blank"
                                )}
                              />
                            </button>
                            <button className={styles.nFTLinkButton}>
                              <SendOutlined onClick={() => handleTransferClick(nft)} />
                            </button>
                            <button className={styles.nFTLinkButton}>
                              <ShoppingCartOutlined
                                onClick={() => alert("OPENSEA INTEGRATION COMING!")} />
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }
                  )}
              </Skeleton> */}
            </div>
          </div>
          <div className={styles.skillsWidgetDiv}>
            <div className={styles.skillsDiv}>Skills</div>
            <img
              className={styles.guestWalletIcon2}
              alt=""
              src="guest-wallet47.svg"
            />
            <img
              className={styles.guestWalletIcon3}
              alt=""
              src="guest-wallet48.svg"
            />
            <img
              className={styles.guestWalletIcon4}
              alt=""
              src="guest-wallet49.svg"
            />
            <img
              className={styles.guestWalletIcon5}
              alt=""
              src="guest-wallet50.svg"
            />
            <img
              className={styles.guestWalletIcon6}
              alt=""
              src="guest-wallet51.svg"
            />
            <img
              className={styles.guestWalletIcon7}
              alt=""
              src="guest-wallet52.svg"
            />
            <img
              className={styles.guestWalletIcon8}
              alt=""
              src="guest-wallet53.svg"
            />
            <img
              className={styles.guestWalletIcon9}
              alt=""
              src="guest-wallet54.svg"
            />
            <b className={styles.runningB}>Running</b>
            <b className={styles.runningB1}>Running</b>
            <b className={styles.runningB2}>Running</b>
            <b className={styles.runningB3}>Running</b>
            <b className={styles.runningB4}>Running</b>
            <b className={styles.runningB5}>Running</b>
            <b className={styles.runningB6}>Running</b>
            <b className={styles.runningB7}>Running</b>
            <div className={styles.lVL5EXP4330}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43301}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43302}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43303}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43304}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43305}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43306}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43307}>LVL 5 EXP 4330</div>
          </div>
        </div>
        <div className={styles.bankContentDiv1}>
          <div className={styles.equipmentWidgetDiv}>
            <div className={styles.equipmentDiv}>Equipment</div>
            <img
              className={styles.guestWalletIcon10}
              alt=""
              src="guest-wallet55.svg"
            />
            <img
              className={styles.guestWalletIcon11}
              alt=""
              src="guest-wallet56.svg"
            />
            <img
              className={styles.guestWalletIcon12}
              alt=""
              src="guest-wallet57.svg"
            />
            <img
              className={styles.guestWalletIcon13}
              alt=""
              src="guest-wallet58.svg"
            />
            <img
              className={styles.guestWalletIcon14}
              alt=""
              src="guest-wallet59.svg"
            />
            <img
              className={styles.guestWalletIcon15}
              alt=""
              src="guest-wallet60.svg"
            />
            <img
              className={styles.guestWalletIcon16}
              alt=""
              src="guest-wallet61.svg"
            />
            <img
              className={styles.guestWalletIcon17}
              alt=""
              src="guest-wallet62.svg"
            />
            <b className={styles.runningB8}>Running</b>
            <b className={styles.runningB9}>Running</b>
            <b className={styles.runningB10}>Running</b>
            <b className={styles.runningB11}>Running</b>
            <b className={styles.runningB12}>Running</b>
            <b className={styles.runningB13}>Running</b>
            <b className={styles.runningB14}>Running</b>
            <b className={styles.runningB15}>Running</b>
            <div className={styles.lVL5EXP43308}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP43309}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433010}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433011}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433012}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433013}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433014}>LVL 5 EXP 4330</div>
            <div className={styles.lVL5EXP433015}>LVL 5 EXP 4330</div>
          </div>
          <div className={styles.loadoutWidgetDiv}>
            <div className={styles.loadoutDiv}>Loadout</div>
            <div className={styles.guestWalletDiv} />
            <img
              className={styles.guestWalletIcon18}
              alt=""
              src="guest-wallet63.svg"
            />
            <b className={styles.combatLevel}>Combat Level</b>
            <div className={styles.lVL65EXP23m}>LVL 65 EXP 2.3m</div>
          </div>
        </div>
      </div>
      <Modal
        title={`Transfer ${nftToSend?.name || "NFT"}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
        confirmLoading={isPending}
        okText="Send"
      >
        <AddressInput autoFocus placeholder="Receiver" onChange={setReceiver} />
        {nftToSend && nftToSend.contract_type === "erc1155" && (
          <Input
            placeholder="amount to send"
            onChange={(e) => handleChange(e)}
          />
        )}
      </Modal>
    </div>
  );
}
