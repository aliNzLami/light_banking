'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState: { bankHistory: any, accountTransfer: any  } = {
    bankHistory: null,
    accountTransfer: null
}

export const transactionSlice = createSlice({
    name: "bankHistory",
    initialState,
    reducers: {
        setBankHistory: (state, action) => {
            state.bankHistory = action.payload;
        },
        setAccountTransfer: (state, action) => {
            state.accountTransfer = action.payload;
        },
    }
})

export const { setBankHistory, setAccountTransfer } = transactionSlice.actions;
export default transactionSlice.reducer;