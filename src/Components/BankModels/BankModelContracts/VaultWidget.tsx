import React, { useState, useEffect, FunctionComponent } from 'react';
import { Skeleton } from "antd";
import { CatAttributeType, CatModelType } from '../../CatModel/CatButton/CatModelTypes';
import styles from '../HostBankModel.module.css';
import { useMoralis, useNFTBalances } from "react-moralis";
import { useVerifyMetadata } from "../../../hooks/useVerifyMetadata";
import {
    FileSearchOutlined,
    SendOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../../helpers/networks";

//TODO: create a loader for the vault to pick up and display contract profiles from the Local Server
// specifically we're going to create 5 vaults that are locked by a hash signature.
// the vaults will create the 5 tabs for the energy model.
// the vaults will be locked by a hash signature that is created by the user's wallet address
// the vaults are:
// 1. the host's profile
// 2. the guest's profile (blank UI functionality)
// 3. the engery model (contract builder UI functionality)
// 4. the node video studio (connected external device ui functionality)
// 5. the dream sequence (AI generated video layout outpuit)

// TODO: create a function that opens the vaults and displays the contract profiles in the energy model
// turn the hive server vault green after the user has memorized the contract profile
// turn the player vault green after the user has memorized the authentication profile
// after the player has authenticated, open their empty plot and display it in the 


export const VaultWidget: FunctionComponent<CatModelType> = ({ attributes, functions, setEnergyModelState, energyModelState, ...rest }) => {
    const { data: BankModeler } = useNFTBalances();
    const { chainId } = useMoralis();
    const { verifyMetadata } = useVerifyMetadata();
    const [nftToSend, setNftToSend] = useState<any>();
    const [visibility, setVisibility] = useState(false);
    console.log(attributes)
    const [vaultBox, setVaultBox] = useState<CatAttributeType[]>(attributes);
    const handleTransferClick = (nft: any) => {
        setNftToSend(nft);
        setVisibility(true);
    };
    const [bodyContentState, setBodyContentState] = useState<any>([]);


    // for each profile in the attributes, create a vault object box
    // for nwonderland profiles, the attributes will be nfts through moralis
    // for nhive profiles, the attributes will be nfts through the nhive

    // if the attribute trade is "unAuth" turn the card to yellow
    // if the attribute trade is another AI turn the card to red
    const [energyModel, setEnergyModel] = useState(0);


    useEffect(() => {
        // for each profile in the attributes, create a vault object box

        // create an array using attributes.attributes and delete the first index
        // then map the array to create the vault boxes

        //const safe = attributes.attributes.filter((nft) => nft !== undefined);

        // on clicking the vault box, open the vault and display the profile in the energy model
        // if the vault is locked, jump to the unAuth vault writting in the data.trades array


        const bodyContent = (
            <>
                <div className={styles.colCard}>
                    {attributes.map((attributes, index) => {
                        let cardColor = "rgba(0, 255, 255, 0.25)";
                        let trade = attributes.data?.trades?.[0];
                        let energyModel = 0;
                        if (trade === "unAuth") {
                            cardColor = "rgba(255, 255, 0, 0.25)";
                            energyModel = 1;
                        } else if (trade === "0x001") {
                            cardColor = 'rgba(255, 0, 0, 0.25)';
                            energyModel = 1;
                        } else if (trade === "0x002") {
                            energyModel = 2;
                        } else if (trade === "0x003") {
                            cardColor = 'rgba(0, 0, 255, 0.25)';
                            energyModel = 3;
                        } else if (trade === "0x004") {
                            cardColor = 'rgba(255, 0, 255, 0.25)';
                            energyModel = 4;
                        } else if (trade === "0x005") {
                            cardColor = 'rgba(255, 255, 0, 0.25)';
                            energyModel = 5;
                        } else if (trade === "0x006") {
                            cardColor = 'rgba(0, 255, 255, 0.25)';
                            energyModel = 6;
                        } else if (trade === "0x007") {
                            cardColor = 'rgba(255, 0, 255, 0.25)';
                            energyModel = 7;
                        }
                        const handleClick = () => {
                            console.log("click");
                            console.log(energyModel);
                            setEnergyModelState(energyModel);
                        }
                        return (
                            <li key={index}>
                                <div className={styles.card} style={{ backgroundColor: cardColor }} onClick={handleClick}>
                                    <div className={styles.cardTitle}>
                                        {attributes.data?.title ? attributes.data?.title?.[0] : "No Title"}
                                    </div>
                                    <div className={styles.cardText}>
                                        {attributes.data?.description ? attributes.data?.description?.[0] : "No Description"}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    }
                </div>
            </>
        );
        setBodyContentState(bodyContent);
        console.log(bodyContentState);
    }, [attributes]);

    const wonderlandBodyContent = (
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
    )

    return (

        <div className={styles.vaultWidgetDiv}>
            <div className={styles.vaultDiv}>Vault</div>
            <div className={styles.card}>
                {bodyContentState}
            </div>
        </div>
    )
}