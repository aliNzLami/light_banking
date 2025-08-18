'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: any } = {
    value: {}
}

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setNewUser: (state, action) => { 
            state.value = action.payload;
        }
    }
})

export const { setNewUser } = userSlice.actions;
export default userSlice.reducer;