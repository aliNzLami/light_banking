'use client'

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import { usePlaidLink } from 'react-plaid-link';

// api
import { get_accessToken_plaid, token_generator_plaid } from "@/lib/actions/users.actions";

// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setNewToken } from "@/lib/redux/bankSlice";

function MyBanks() {

    const dispatch = useDispatch(); 
    const userInfo = useSelector((state: RootState) => state.userInfo.value);
    const bankToken = useSelector((state: RootState) => state.bankInfo.token);
    
    const fetchToken = async () => {
      await token_generator_plaid(userInfo, "auth")
      .then(res => {
        dispatch(setNewToken(res.linkToken));
      })
    }
    
    const get_plaidLink = async (token: string) => {
      const handler = window.Plaid.create({
        token: token,
        onSuccess: async (publicToken, metadata) => {
          const accessToken = await get_accessToken_plaid(publicToken);
          console.log(accessToken);
        },
        onExit: (err, metadata) => {
          console.log(err);
          console.log(metadata);
        },
      })
      handler.open();
      handler.exit();
    }

    useEffect(() => {
      fetchToken();
    }, [])

    return (
      <div>
        <button onClick={() => get_plaidLink(bankToken)}>
          ADDDDD
        </button>
      </div>
    )
}

export default MyBanks