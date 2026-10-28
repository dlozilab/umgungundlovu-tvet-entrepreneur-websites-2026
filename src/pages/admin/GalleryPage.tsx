import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import Button from '../../components/shared/Button';
import Field from '../../components/shared/Field';
import ImageSlot from '../../components/shared/ImageSlot';
import SaveBar from '../../components/shared/SaveBar';
import { useImageUpload } from '../../hooks/useImageUpload';
import {
  selectMedia,
  selectBusiness,
  selectBusinessId,
  selectSiteDirty,
  setField,
  setMedia,
  clearMedia,
  saveArea,
} from '../../store/slices/siteSlice';
import { flashToast } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';
import {
  DEFAULT_GALLERY_CATEGORIES,
  getGalleryCategorySlots,
  type GalleryCategory,
  type GallerySlot,
} from '../../types/site';

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
  const business = useSelector(selectBusiness);
  const businessId = useSelector(selectBusinessId) ?? '';
  const dirty = useSelector(selectSiteDirty);
  const { upload } = useImageUpload();
  const [busySlot, setBusySlot] = useState<GallerySlot | null>(null);
  const [savingCategories, setSavingCategories] = useState(false);
  const categories = business?.galleryCategories ?? DEFAULT_GALLERY_CATEGORIES;

  if (!businessId) return null;

  function updateCategories(nextCategories: GalleryCategory[]) {
    dispatch(setField({ path: 'galleryCategories', value: nextCategories }));
  }

  function addCategory() {
    updateCategories([
      ...categories,
      { id: `custom-${crypto.randomUUID().replaceAll('-', '')}`, label: '' },
    ]);
  }

  async function handleSaveCategories() {
    if (categories.some((category) => !category.label.trim())) {
      dispatch(flashToast('Give every gallery a name before saving'));
      return;
    }

    setSavingCategories(true);
    const result = await dispatch(saveArea({
      businessId,
      area: 'gallery',
      patch: { galleryCategories: categories },
    }));
    setSavingCategories(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Gallery names saved' : 'Could not save gallery names'));
  }

  async function handlePick(slot: GallerySlot, file: File) {
    setBusySlot(slot);
    try {
      const result = await upload(file, businessId, 'media', `${slot}-${Date.now()}`, 1400);
      if (!result) {
        dispatch(flashToast('Could not upload the photo'));
        return;
      }

      const saved = await dispatch(setMedia({ businessId, slot, image_path: result.path }));
      dispatch(flashToast(setMedia.fulfilled.match(saved) ? 'Photo updated' : 'Could not save the photo'));
    } finally {
      setBusySlot(null);
    }
  }

  async function handleClear(slot: GallerySlot) {
    setBusySlot(slot);
    try {
      const result = await dispatch(clearMedia({ businessId, slot }));
      dispatch(flashToast(clearMedia.fulfilled.match(result) ? 'Photo removed' : 'Could not remove the photo'));
    } finally {
      setBusySlot(null);
    }
  }

  return (
    <section>
      <h2>Gallery</h2>
      <p>Your hero photo and the places and work photos on your site.</p>
      <h3>Our Work galleries</h3>
      <p>Customize your gallery names and add up to four photos to each. The first photo is shown on the gallery card.</p>

      {categories.map((category) => (
        <div key={category.id} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 }}>
          <Field
            id={`gallery-category-${category.id}`}
            label="Gallery name"
            value={category.label}
            onChange={(label) => updateCategories(
              categories.map((item) => item.id === category.id ? { ...item, label } : item)
            )}
            placeholder="For example, Custom Projects"
          />
          <Button
            variant="quiet"
            size="sm"
            onClick={() => updateCategories(categories.filter((item) => item.id !== category.id))}
          >
            Remove gallery
          </Button>

          {getGalleryCategorySlots(category).map((slot, index) => {
            const row = media.find((item) => item.slot === slot);
            return (
              <ImageSlot
                key={slot}
                label={`${category.label || 'Gallery'} photo ${index + 1}`}
                note={index === 0 ? 'Cover photo for this gallery.' : 'Additional photo.'}
                value={row?.imagePath ? getPublicUrl(row.imagePath) : ''}
                busy={busySlot === slot}
                onPick={(file) => handlePick(slot, file)}
                onClear={() => handleClear(slot)}
                allowClear
              />
            );
          })}
        </div>
      ))}

      <Button onClick={addCategory}>Add gallery</Button>
      <SaveBar onSave={handleSaveCategories} saving={savingCategories} dirty={dirty} />

      {SLOTS.map(({ slot, label, note, clearable }) => {
        const row = media.find((m) => m.slot === slot);
        return (
          <ImageSlot
            key={slot}
            label={label}
            note={note}
            value={row?.imagePath ? getPublicUrl(row.imagePath) : ''}
            busy={busySlot === slot}
            onPick={(file) => handlePick(slot, file)}
            onClear={clearable ? () => handleClear(slot) : undefined}
            allowClear={clearable}
          />
        );
      })}

    </section>
  );
}