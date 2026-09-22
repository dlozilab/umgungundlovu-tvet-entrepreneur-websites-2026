import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';

interface UploadResult {
  path: string;
}

function resizeToBlob(file: File, maxDim: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
          else { width = Math.round((width * maxDim) / height); height = maxDim; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error('Could not process image'))),
          'image/jpeg',
          0.8
        );
      };
      img.onerror = () => reject(new Error('Could not read image'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

// Storage path layout: businesses/{businessId}/{area}/{name}.jpg
// e.g. businesses/demo/media/hero1.jpg, businesses/demo/branding/logo.jpg
export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(
    file: File,
    businessId: string,
    area: string,
    name: string,
    maxDim = 1600
  ): Promise<UploadResult | null> {
    setUploading(true);
    setError(null);
    try {
      const blob = await resizeToBlob(file, maxDim);
      const path = `businesses/${businessId}/${area}/${name}.jpg`;
      await uploadBytes(ref(storage, path), blob, { contentType: 'image/jpeg' });
      return { path };
    } catch (err: any) {
      setError(err.message || 'Could not upload the image');
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, error };
}