import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import ImageSlot from '../../components/shared/ImageSlot';
import { useImageUpload } from '../../hooks/useImageUpload';
import { selectMedia, selectBusinessId, setMedia, clearMedia } from '../../store/slices/siteSlice';
import { flashToast } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';
import type { GallerySlot } from '../../types/site';

const SLOTS: { slot: GallerySlot; label: string; note?: string; clearable?: boolean }[] = [
  { slot: 'hero1', label: 'Hero photo', note: 'The main photo at the top of your site.' },
  { slot: 'hero2', label: 'Hero photo, second slide', note: 'Optional. Adds a second slide.', clearable: true },
  { slot: 'galleryPremises1', label: 'Premises', note: 'Your workshop or yard.' },
  { slot: 'galleryPremises2', label: 'Premises, second photo', note: 'Optional.', clearable: true },
  { slot: 'galleryWork1', label: 'Work', note: 'A job finished or being made.' },
  { slot: 'galleryWork2', label: 'Work, second photo', note: 'Optional.', clearable: true },
  { slot: 'galleryDelivery1', label: 'Delivery', note: 'Loading, delivering or installing.' },
  { slot: 'galleryDelivery2', label: 'Delivery, second photo', note: 'Optional.', clearable: true },
];

export default function GalleryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const media = useSelector(selectMedia);
  const businessId = useSelector(selectBusinessId);
  const { upload, uploading } = useImageUpload();

  if (!businessId) return null;

  async function handlePick(slot: GallerySlot, file: File) {
    const result = await upload(file, businessId!, 'media', `${slot}-${Date.now()}`, 1400);
    if (!result) {
      dispatch(flashToast('Could not upload the photo'));
      return;
    }
    const saved = await dispatch(setMedia({ businessId: businessId!, slot, image_path: result.path }));
    dispatch(flashToast(setMedia.fulfilled.match(saved) ? 'Photo updated' : 'Could not save the photo'));
  }

  async function handleClear(slot: GallerySlot) {
    const result = await dispatch(clearMedia({ businessId: businessId!, slot }));
    dispatch(flashToast(clearMedia.fulfilled.match(result) ? 'Photo removed' : 'Could not remove the photo'));
  }

  return (
    <section>
      <h2>Gallery</h2>
      <p>Your hero photo and the places and work photos on your site.</p>

      {SLOTS.map(({ slot, label, note, clearable }) => {
        const row = media.find((m) => m.slot === slot);
        return (
          <ImageSlot
            key={slot}
            label={label}
            note={note}
            value={row?.imagePath ? getPublicUrl(row.imagePath) : ''}
            onPick={(file) => handlePick(slot, file)}
            onClear={clearable ? () => handleClear(slot) : undefined}
            allowClear={clearable}
          />
        );
      })}

      {uploading && <p style={{ fontSize: 13 }}>Uploading…</p>}
    </section>
  );
}