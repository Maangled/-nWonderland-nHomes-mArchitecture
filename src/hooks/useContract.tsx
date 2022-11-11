// this hook is used to get the contract instance

import { useMoralis } from "react-moralis";
import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";

export const useContract = (address: string, ABI: any) => {
    const { user, chainId } = useMoralis();
    const contract = useMemo(() => {
        if (!user) return null;
        return new Contract(address, ABI, user.get("web3").get("provider"));
    }, [user, chainId]);

    return useMemo(() => {
        if (!address || !ABI || !user) return null;
        try {
            return new Contract(address, ABI, user.get("web3").get("provider"));
        } catch (error) {
            console.log("error in useContract", error);
            return null;
        }
    }, [address, ABI, user, chainId]);
};

