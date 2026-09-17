import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function getOrInitApp() {
  if (!getApps().length) return initializeApp(firebaseConfig);

  const existing = getApp();
  const changed = JSON.stringify(existing.options) !== JSON.stringify(firebaseConfig);

  if (changed) {
    // Only happens mid-dev-session (stale HMR module holding an old
    // config). Recreate the app rather than crashing — logs a clear
    // warning so a real accidental double-init still gets noticed.
    console.warn('[firebase] config changed since app init — reinitializing. Restart the dev server to avoid this.');
    return initializeApp(firebaseConfig, `app-${Date.now()}`);
  }
  return existing;
}

export const app = getOrInitApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);