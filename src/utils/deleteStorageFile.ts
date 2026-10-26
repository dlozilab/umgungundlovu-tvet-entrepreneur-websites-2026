import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../lib/firebase';

export async function deleteStorageFileBestEffort(path: string): Promise<void> {
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) return;
  await deleteObject(ref(storage, path)).catch(() => undefined);
}
