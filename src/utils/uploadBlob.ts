import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';

// Storage path layout: businesses/{businessId}/{area}/{name}.{ext}
export async function uploadBlobToStorage(
  blob: Blob,
  businessId: string,
  area: string,
  name: string,
  ext = 'jpg',
  contentType = 'image/jpeg'
): Promise<string> {
  const path = `businesses/${businessId}/${area}/${name}.${ext}`;
  await uploadBytes(ref(storage, path), blob, { contentType });
  return path;
}