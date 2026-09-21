import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, signOut as fbSignOut, type User} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import type { Profile } from '../types/site'
import { auth, db } from '../lib/firebase'



type AuthState = {
  uid: string | null
  email: string | null
  profile: Profile | null
  status: 'idle' | 'loading' | 'signedIn' | 'signedOut'
  error: string | null
}

const initialState: AuthState = {
  uid: null,
  email: null,
  profile: null,
  status: 'idle',
  error: null,
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    const snap = await getDoc(doc(db, 'profiles', cred.user.uid))
    return {
      uid: cred.user.uid,
      email: cred.user.email,
      profile: snap.exists() ? (snap.data() as Profile) : null,
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
  await fbSignOut(auth)
})

export const loadProfile = createAsyncThunk('auth/loadProfile', async (user: User) => {
  const snap = await getDoc(doc(db, 'profiles', user.uid))
  return {
    uid: user.uid,
    email: user.email,
    profile: snap.exists() ? (snap.data() as Profile) : null,
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleared: (state) => {
      state.uid = null
      state.email = null
      state.profile = null
      state.status = 'signedOut'
    },
  },
  extraReducers: (builder) => {
    const signedIn = (
      state: AuthState,
      action: PayloadAction<{ uid: string; email: string | null; profile: Profile | null }>
    ) => {
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.profile = action.payload.profile
      state.status = 'signedIn'
      state.error = null
    }

    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signIn.fulfilled, signedIn)
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'signedOut'
        state.error = action.error.message ?? 'Could not sign in'
      })
      .addCase(loadProfile.fulfilled, signedIn)
      .addCase(signOut.fulfilled, (state) => {
        state.uid = null
        state.email = null
        state.profile = null
        state.status = 'signedOut'
      })
  },
})

export const { cleared } = authSlice.actions
export default authSlice.reducer