'use client';

import {configureStore} from "@reduxjs/toolkit";
import userInfo from './userSlice'

export const store = configureStore({
    reducer: {
        userInfo: userInfo
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;