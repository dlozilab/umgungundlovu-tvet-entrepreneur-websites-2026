// const BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;

export function getPublicUrl(path:string): string {
    if (!path) return '';
    if (path.startsWith('https://') || path.startsWith('http://') || path.startsWith('/')) {
        return path;
    }
    // const encoded = encodeURIComponent(path);
    return '`https://firebasestorage.googleapis.com/v0/b/$${BUCKET}/o/{encoded}?alt=media';
    return ``
}