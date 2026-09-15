import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import siteReducer from './slices/siteSlice';
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        site: siteReducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['payload.updated_at'],
                ignoredPaths: ['site.business.updated_at']
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

if (import.meta.env.DEV){
    (window as any).__store = store
}