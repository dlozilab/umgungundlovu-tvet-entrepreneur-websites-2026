export function getPublicUrl(path:string): string {
    if (!path) return '';
    if (path.startsWith('https://') || path.startsWith('http://') || path.startsWith('/')) {
        return path;
    }

    const bucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
    if (!bucket) {
        return path;
    }

    const encoded = encodeURIComponent(path);
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media`;
}