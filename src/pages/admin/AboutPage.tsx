import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import Field from '../../components/shared/Field';
import ImageSlot from '../../components/shared/ImageSlot';
import SaveBar from '../../components/shared/SaveBar';
import { useImageUpload } from '../../hooks/useImageUpload';
import {
  selectBusiness,
  selectBusinessId,
  selectSiteDirty,
  setField,
  saveArea,
  setMedia,
} from '../../store/slices/siteSlice';
import { selectPortrait } from '../../store/selectors';
import { flashToast } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';

export default function AboutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const business = useSelector(selectBusiness);
  const businessId = useSelector(selectBusinessId);
  const dirty = useSelector(selectSiteDirty);
  const portrait = useSelector(selectPortrait);
  const { upload, uploading, error } = useImageUpload();
  const [saving, setSaving] = useState(false);

  if (!business || !businessId) return null;

  async function handlePick(file: File) {
    const result = await upload(file, businessId!, 'media', `portrait-${Date.now()}`, 1200);
    if (!result) {
      dispatch(flashToast('Could not upload the photo'));
      return;
    }
    const saved = await dispatch(
      setMedia({
        businessId: businessId!,
        slot: 'portrait',
        image_path: result.path,
        alt: 'Portrait of the owner',
      })
    );
    dispatch(flashToast(setMedia.fulfilled.match(saved) ? 'Photo updated' : 'Could not save the photo'));
  }

  async function handleSave() {
    setSaving(true);
    const result = await dispatch(
      saveArea({ businessId: businessId!, area: 'about', patch: { aboutStory: business!.aboutStory } })
    );
    setSaving(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Saved' : 'Could not save'));
  }

  return (
    <section>
      <h2>About</h2>
      <p>Your photo and the story of the business.</p>

      <ImageSlot
        label="Owner photo"
        note="A clear photo of you, facing the camera."
        value={portrait ? getPublicUrl(portrait.imagePath) : ''}
        onPick={handlePick}
      />
      {uploading && <p style={{ fontSize: 13 }}>Uploading…</p>}
      {error && <p style={{ fontSize: 13, color: 'var(--danger)' }}>{error}</p>}

      <Field
        label="Your story"
        type="textarea"
        hint="How you started and what you are known for."
        value={business.aboutStory}
        onChange={(v) => dispatch(setField({ path: 'aboutStory', value: v }))}
      />

      <SaveBar onSave={handleSave} saving={saving} dirty={dirty} />
    </section>
  );
}