import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';

// Storage path layout: businesses/{businessId}/{area}/{name}.jpg
export async function uploadBlobToStorage(
  blob: Blob,
  businessId: string,
  area: string,
  name: string
): Promise<string> {
  const path = `businesses/${businessId}/${area}/${name}.jpg`;
  await uploadBytes(ref(storage, path), blob, { contentType: 'image/jpeg' });
  return path;
}