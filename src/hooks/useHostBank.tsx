// this hook is used to create a private session with the user's wallet

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { useVerifyMetadata } from "./useVerifyMetadata";

export const useHostBank = () => {

    const [hasProfile, setHasProfile] = useState(false);
    const [account, setAccount] = useState("");
    const [metadata, setMetadata] = useState("");
    const { user, authenticate, logout, isAuthenticating } = useMoralis();
    const { verifyMetadata } = useVerifyMetadata();

    useEffect(() => {
        if (user) {
            setAccount(user.get("ethAddress"));
            setMetadata(user.get("metadata"));
        }
    }, [user]);

    useEffect(() => {
        if (account && metadata) {
            setHasProfile(verifyMetadata(account));
        }
    }, [account, metadata]);

    return {
        hasProfile,
        account,
        metadata,
        authenticate,
        logout,
        isAuthenticating,
    };
};