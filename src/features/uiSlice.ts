import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UiState = {
  activePage: string
  navOpen: boolean
  toast: string | null
}

const initialState: UiState = { activePage: '', navOpen: false, toast: null }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openNav: (state) => { state.navOpen = true },
    closeNav: (state) => { state.navOpen = false },
    showToast: (state, action: PayloadAction<string>) => { state.toast = action.payload },
    dismissToast: (state) => { state.toast = null },
  },
})

export const { openNav, closeNav, showToast, dismissToast } = uiSlice.actions
export default uiSlice.reducer