import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc} from 'firebase/firestore'
import {auth, db} from '../../lib/firebase'
import type { Profile } from '../../types/site';
import type { RootState } from '../';

interface AuthUser {
    uid: string;
    email: string | null;
}

interface AuthState {
    user: AuthUser | null;
    profile: Profile | null;
    status:'idle' | 'loading' | 'succeeded'| 'failed';
    ready: boolean;
    error: string | null
};

const initialState: AuthState = {
    user: null,
    profile: null,
    status:'idle',
    ready: false,
    error: null
}

async function fetchProfile(uid:string): Promise<Profile | null> {
    const snap = await getDoc(doc(db, 'profiles', uid));
    return snap.exists() ? ({id:snap.id, ...(snap.data() as Omit<Profile, 'id'>)}) : null;

    
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (
        {email, password}: {email: string; password: string},
        {rejectWithValue}
    ) => {
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const profile = await fetchProfile(cred.user.uid);
            return {user: {uid: cred.user.uid, email: cred.user.email}, profile};


        } catch (err:any){
            return rejectWithValue(err.code || err.message)
        }
    }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
    await firebaseSignOut(auth)
});

export const restoreSession = createAsyncThunk(
    'auth/restoreSession', async (_, { dispatch}) => {
        onAuthStateChanged(auth, async (fbUser) => {
            if (!fbUser){
                dispatch(authSlice.actions.setSession({user: null, profile:null}));
                return;
            }
            const profile = await fetchProfile(fbUser.uid);
            dispatch(
                authSlice.actions.setSession({
                    user:{uid:fbUser.uid, email:fbUser.email}, profile,
                })
            );
            });
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState, reducers: {
        setSession(state, action: {payload: {user: AuthUser | null; profile: Profile | null}}){
            state.user = action.payload.user;
            state.profile = action.payload.profile;
            state.ready = true;
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signIn.pending, (state)=> {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(signIn.fulfilled, (state,action)=>{
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.profile= action.payload.profile
        })
        .addCase(signIn.rejected, (state, action)=>{
            state.status= 'failed';
            state.error = (action.payload as string) || 'cold not sign you in';
        })
        .addCase(signOut.fulfilled, (state)=>{
            state.user = null;
            state.profile = null
        })
    
    }
})

export default authSlice.reducer;
export const selectAuthUser = (state:RootState) => state.auth.user;
export const selectAuthProfile = (state:RootState) => state.auth.profile;
export const selectAuthRole = (state:RootState) => state.auth.profile?. role ?? null;
export const selectAuthReady = (state:RootState) => state.auth.ready;
export const selectAuthStatus = (state:RootState) => state.auth.status;
export const selectAuthError = (state:RootState) => state.auth.error;
export const selectIsSignedIn = (state:RootState) => Boolean(state.auth.user)

