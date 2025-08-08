'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ""
}

export const bankSlice = createSlice({
    name: "bankInfo",
    initialState,
    reducers: {
        setNewToken: (state, action) => { 
            state.token = action.payload;
        }
    }
})

export const { setNewToken } = bankSlice.actions;
export default bankSlice.reducer;