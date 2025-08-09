'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    linkToken: "",
    publicToken: "",
    accessToken: "",
    banksList: []
}

export const bankSlice = createSlice({
    name: "bankInfo",
    initialState,
    reducers: {
        setLinkToken: (state, action) => {
            state.linkToken = action.payload;
        },
        setPublicToken: (state, action) => { 
            state.publicToken = action.payload;
        },
        setAccessToken: (state, action) => { 
            state.accessToken = action.payload;
        },
        setBanks: (state, action) => { 
            localStorage.setItem("banks", JSON.stringify(action.payload))
            state.banksList = action.payload;
        },
    }
})

export const { setPublicToken, setAccessToken, setLinkToken, setBanks } = bankSlice.actions;
export default bankSlice.reducer;