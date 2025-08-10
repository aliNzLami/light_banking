'use client'

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { usePlaidLink } from 'react-plaid-link';

// api
import { get_accessToken_plaid, get_linkToken_plaid } from "@/lib/actions/users.actions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setLinkToken, setAccessToken } from "@/lib/redux/bankSlice";

function MyBanks() {

      const linkToken = useSelector((state: RootState) => state.bankInfo.linkToken);
      const userInfo = useSelector((state: RootState) => state.userInfo.value);
      const dispatch = useDispatch();
        
        
      const handleClick = async () => {
        const handler = window.Plaid.create({
          token: linkToken,
          onSuccess: async (publicToken, metadata) => {
            const accessToken = await get_accessToken_plaid(publicToken);
            dispatch(setAccessToken(accessToken));
          },
          onExit: (err, metadata) => {
            console.log(err);
            console.log(metadata);
          },
        })
        handler.open();
        handler.exit();
      }

    const fetchLinkToken = async () => {
        await get_linkToken_plaid(userInfo, ['auth', 'transactions', 'identity'])
        .then(res => {
            dispatch(setLinkToken(res.linkToken));
        })
    }

    useEffect(() => {
      if(!linkToken) {
        fetchLinkToken();
      }
    }, [])

    return (
      <div>
        <button onClick={handleClick}>
          ADDDDD
        </button>
      </div>
    )
}

export default MyBanks