
import React, { useEffect, useState } from 'react';
import { useMoralis, useNFTBalances } from "react-moralis";
import { useVerifyMetadata } from '../hooks/useVerifyMetadata';


// Use the useVerifyMetadata hook to verify the metadata of the host
// and set the hasProfile state to true if the metadata contains the correct data
// and the host is connected to the blockchain
// account is the address of the host
// metadata is the metadata of the host
// 

export default function Account(props:any) {

    const { account, metadata } = props;
    const { verifyMetadata } = useVerifyMetadata();
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        if (account && metadata) {
            verifyMetadata(account)
                .then((result: any) => {
                    setHasProfile(result);
                });
        }
    }, [account, metadata]);

    return (
        <div>
            {hasProfile ? "Profile" : "No Profile"}
        </div>
    );
}