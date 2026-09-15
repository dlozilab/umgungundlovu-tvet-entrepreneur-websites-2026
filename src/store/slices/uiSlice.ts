import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../store";
interface UiState {
    navOpen: boolean;
    activePage: string;
    toast: {message:string; visible: boolean};
}

const initialState: UiState = {
    navOpen :false,
    activePage: 'dashboard',
    toast: {message: '', visible: false}
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openNav: (state) => {
            state.navOpen = true;
        },
        closeNav(state){
            state.navOpen=false
        },
        setPage(state, action:PayloadAction<string>){
            state.activePage = action.payload;
            state.navOpen = false
        },
        showToast(state, action:PayloadAction<string>){
            state.toast = {message:action.payload, visible:true}
        },
        dismissToast(state){
            state.toast.visible =false
        }
        
    },
});

export const { openNav, closeNav, showToast, dismissToast} = uiSlice.actions;
export default uiSlice.reducer;

let toastTimer:number | undefined;
export function flashToast(message: string, ms =1800){
    return (dispatch: AppDispatch) => {
        window.clearTimeout(toastTimer)
        dispatch(showToast(message))
        toastTimer = window.setTimeout(() => dispatch(dismissToast()), ms)
    }
}

export const selectNavOpen = (state: RootState) => state.ui.navOpen;
export const selectActivePage = (state: RootState): string =>
    state.ui.activePage;
export const selectToast = (state: RootState) => state.ui.toast;