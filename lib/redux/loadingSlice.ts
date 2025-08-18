'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState: { isPageLoading: any } = {
    isPageLoading: false
}

export const loadingSlice = createSlice({
    name: "loadingPage",
    initialState,
    reducers: {
        setPageLoading: (state, action) => {
            state.isPageLoading = action.payload;
        },
    }
})

export const { setPageLoading } = loadingSlice.actions;
export default loadingSlice.reducer;