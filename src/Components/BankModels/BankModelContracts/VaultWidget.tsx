// this is the vault component to be used in the bank model
import React, { useState, useEffect, FunctionComponent } from 'react';
import { Skeleton } from "antd";
import { CatModelType } from '../../CatModel/CatButton/CatModelTypes';
import styles from '../HostBankModel.module.css';
import { useMoralis, useNFTBalances } from "react-moralis";
import { useVerifyMetadata } from "../../../hooks/useVerifyMetadata";
import {
  FileSearchOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../../helpers/networks";


export const VaultWidget: FunctionComponent<CatModelType> = ({ attributes }) => {
    const { data: BankModeler } = useNFTBalances();
    const { chainId } = useMoralis();
    const { verifyMetadata } = useVerifyMetadata();
    const [nftToSend, setNftToSend] = useState<any>();
    const [visibility, setVisibility] = useState(false);
    const handleTransferClick = (nft: any) => {
        setNftToSend(nft);
        setVisibility(true);
      };

    return (
        <div className={styles.vaultWidgetDiv}>
            <div className={styles.vaultDiv}>Vault</div>
            <div className={styles.vaultBodyDiv}>
                <Skeleton loading={!BankModeler?.result}>
                    {BankModeler?.result && BankModeler.result.map((nft, index) => {
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
                </Skeleton>
            </div>
        </div>
    )
}