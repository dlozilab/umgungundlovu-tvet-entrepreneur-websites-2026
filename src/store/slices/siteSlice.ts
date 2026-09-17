import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp} from 'firebase/firestore'
import { db } from "../../lib/firebase";
import type { Business, GalleryRow, Area, GallerySlot,Service } from "../../types/site";
import type { RootState } from "../index";

interface SiteSlice {
    businessId: string | null;
    business: Business | null;
    services: Service[];
    media: GalleryRow[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    saveStatus: string | null
    error: string | null
    dirty: boolean
}
const initialState: SiteSlice = {
    businessId: null,
    business:null,
    services: [],
    media: [],
    status: 'idle',
    saveStatus: 'idle',
    error: null,
    dirty: false
};

export const loadSite = createAsyncThunk(
    'site/loadSite', async (businessId: string, {rejectWithValue}) => {
        try {
            const businessSnap = await getDoc(doc(db, 'businesses', businessId))
            if (!businessSnap.exists()){
                return rejectWithValue('No business found for this id');
            } const business = {id: businessSnap.id, ...(businessSnap.data() as Omit<Business, 'id'>)}
            const serviceSnap = await getDocs(
                collection(db, 'businesses', businessId, 'services')
            );
            const services = serviceSnap.docs
            .map((d) => d.data() as Service)
            .sort((a, b)=> a.position - b.position);
            const mediaSnap = await getDocs(collection(db, 'businesses', businessId, 'media'))
            const media = mediaSnap.docs.map((d)=> d.data() as GalleryRow);
            return {businessId, business, services, media};
        } catch (err: any) {
            return rejectWithValue(err.code || err.message)
            
        }
    }
);

export const  saveArea = createAsyncThunk(
    'site/saveArea',
    async(
        {businessId, area, patch}: {businessId: string; area: Area; patch: Partial<Business> | Service[]},
        {rejectWithValue}
    ) => {
        try {
            if (area === 'services') {
                const rows = patch as Service[];
                await Promise.all (
                    rows.map((row) => 
                    setDoc(doc(db, 'businesses', businessId, 'services', String(row.position)), row, {
                        merge: true
                    }))
                )
            } else {
                await setDoc(
                    doc(db, 'businesses', businessId),
                    { ...(patch as Partial<Business>), updated_at: serverTimestamp()},
                    {merge: true}
                )
            }
            return {area, patch};

        }catch (err: any){
            return rejectWithValue(err.code || err.message)
        }
    }
);


export const setMedia = createAsyncThunk(
  'site/setMedia',
  async (
    { businessId, slot, image_path, label, alt }: { businessId: string; slot: GallerySlot; image_path: string; label?: string; alt?: string },
    { rejectWithValue }
  ) => {
    try {
      const row: GalleryRow = { slot, imagePath: image_path, label: label ?? '', alt: alt ?? '' };
      await setDoc(doc(db, 'businesses', businessId, 'media', String(slot)), row, { merge: true });
      return row;
    } catch (err: any) {
      return rejectWithValue(err.code || err.message);
    }
  }
);

export const clearMedia = createAsyncThunk(
  'site/clearMedia',
  async ({ businessId, slot }: { businessId: string; slot: GallerySlot }, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, 'businesses', businessId, 'media', String(slot)), { image_path: '' }, { merge: true });
      return slot;
    } catch (err: any) {
      return rejectWithValue(err.code || err.message);
    }
  }
);



const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    // Local, batched edit on the business record — held until saveArea('details' | ...) runs.
    setField(state, action: { payload: { path: string; value: unknown } }) {
      if (!state.business) return;
      (state.business as any)[action.payload.path] = action.payload.value;
      state.dirty = true;
    },
    // Local, batched edit on one service row.
    setService(
      state,
      action: { payload: { position: 1 | 2 | 3; field: 'name' | 'description'; value: string } }
    ) {
      const row = state.services.find((s) => s.position === action.payload.position);
      if (row) row[action.payload.field] = action.payload.value;
      state.dirty = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSite.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadSite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.businessId = action.payload.businessId;
        state.business = action.payload.business;
        state.services = action.payload.services;
        state.media = action.payload.media;
        state.dirty = false;
      })
      .addCase(loadSite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Could not load the site';
      })
      .addCase(saveArea.pending, (state) => {
        state.saveStatus = 'loading';
      })
      .addCase(saveArea.fulfilled, (state) => {
        state.saveStatus = 'succeeded';
        state.dirty = false;
      })
      .addCase(saveArea.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.error = (action.payload as string) || 'Could not save your changes';
      })
      .addCase(setMedia.fulfilled, (state, action) => {
        const i = state.media.findIndex((m) => m.slot === action.payload.slot);
        if (i >= 0) state.media[i] = action.payload;
        else state.media.push(action.payload);
      })
      .addCase(clearMedia.fulfilled, (state, action) => {
        const row = state.media.find((m) => m.slot === action.payload);
        if (row) row.imagePath = '';
      });
  },
});

export const {setField, setService} = siteSlice.actions;
export default siteSlice.reducer;

export const selectBusiness = (state: RootState) => state.site.business;
export const selectServices = (state: RootState) => state.site.services;
export const selectMedia = (state: RootState) => state.site.media;
export const selectSiteStatus = (state: RootState) => state.site.status;
export const selectSiteSaveStatus = (state: RootState) => state.site.saveStatus;
export const selectSiteDirty = (state: RootState) => state.site.dirty;
export const selectSiteError = (state: RootState) => state.site.error;
export const selectBusinessId = (state: RootState) => state.site.businessId;
