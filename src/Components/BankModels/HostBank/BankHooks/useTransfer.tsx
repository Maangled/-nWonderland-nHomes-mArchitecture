import { useState, useEffect } from "react";
import Moralis from "moralis-v1/types";
import { useMoralis } from "react-moralis";
import {useServer} from "./useServer";

export const useTransfer = () => {
    const [isPending, setIsPending] = useState(false);
    const { serverUrl, appId } = useMoralis();
    const { profileList } = useServer(true);
    const [transferStatus, setTransferStatus] = useState("Hello World");

    const transfer = async (nft: any, amount: any, receiver: any) => {
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
    };

    return { transfer, isPending, transferStatus };
};
