'use client';

import {configureStore} from "@reduxjs/toolkit";
import userInfo from './userSlice'
import bankInfo from './bankSlice'
import loadingPage from './loadingSlice'
import bankHistory from './transactionSlice';

export const store = configureStore({
    reducer: {
        userInfo: userInfo,
        bankInfo: bankInfo,
        loadingPage: loadingPage,
        bankHistory: bankHistory
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;