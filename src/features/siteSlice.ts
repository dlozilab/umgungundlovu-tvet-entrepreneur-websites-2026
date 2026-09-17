import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Business } from '../types/site'

type SiteState = {
  slug: string | null
  data: Business | null
  status: 'idle' | 'loading' | 'ready' | 'error'
  saving: boolean
  error: string | null
}

const initialState: SiteState = {
  slug: null,
  data: null,
  status: 'idle',
  saving: false,
  error: null,
}

export const loadSite = createAsyncThunk(
  'site/load',
  async (slug: string) => {
    const snap = await getDoc(doc(db, 'businesses', slug))
    if (!snap.exists()) throw new Error(`No business found for "${slug}"`)
    return { slug, data: snap.data() as Business }
  }
)

export const saveSite = createAsyncThunk(
  'site/save',
  async (fields: Partial<Business>, { getState }) => {
    const { site } = getState() as { site: SiteState }
    if (!site.slug) throw new Error('No site loaded')
    await updateDoc(doc(db, 'businesses', site.slug), fields)
    return fields
  }
)

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setField: <K extends keyof Business>(
      state: SiteState,
      action: PayloadAction<{ key: K; value: Business[K] }>
    ) => {
      if (state.data) state.data[action.payload.key] = action.payload.value
    },
    setService: (
      state,
      action: PayloadAction<{ index: 0 | 1 | 2; key: 'name' | 'description' | 'imagePath'; value: string }>
    ) => {
      const { index, key, value } = action.payload
      if (state.data) {
        const services = (state.data as unknown as {
          services: Array<Record<'name' | 'description' | 'imagePath', string>>
        }).services
        services[index][key] = value
      }
    },
    setGallery: (
      state,
      action: PayloadAction<{ index: number; imagePath: string }>
    ) => {
      if (state.data) {
        const gallery = (state.data as unknown as {
          gallery: Array<{ imagePath: string }>
        }).gallery
        gallery[action.payload.index].imagePath = action.payload.imagePath
      }
    },
    setHero: (state, action: PayloadAction<{ index: 0 | 1; imagePath: string }>) => {
      if (state.data) {
        const hero = (state.data as unknown as { hero: string[] }).hero
        hero[action.payload.index] = action.payload.imagePath
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSite.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadSite.fulfilled, (state, action) => {
        state.status = 'ready'
        state.slug = action.payload.slug
        state.data = action.payload.data
      })
      .addCase(loadSite.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Could not load the site'
      })
      .addCase(saveSite.pending, (state) => {
        state.saving = true
      })
      .addCase(saveSite.fulfilled, (state) => {
        state.saving = false
      })
      .addCase(saveSite.rejected, (state, action) => {
        state.saving = false
        state.error = action.error.message ?? 'Could not save'
      })
  },
})

export const { setField, setService, setGallery, setHero } = siteSlice.actions
export default siteSlice.reducer