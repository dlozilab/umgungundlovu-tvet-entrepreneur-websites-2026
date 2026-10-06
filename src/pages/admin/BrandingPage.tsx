import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import ImageSlot from '../../components/shared/ImageSlot';
import Button from '../../components/shared/Button';
import SaveBar from '../../components/shared/SaveBar';
import SharePreviewCard from '../../components/cms/SharePreviewCard';
import { useImageUpload } from '../../hooks/useImageUpload';
import { generateShareImage } from '../../utils/generateShareImage';
import {
  selectBusiness,
  selectBusinessId,
  selectSiteDirty,
  setField,
  saveArea,
} from '../../store/slices/siteSlice';
import { selectTones, selectHeroImages } from '../../store/selectors';
import { flashToast } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';

export default function BrandingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const business = useSelector(selectBusiness);
  const businessId = useSelector(selectBusinessId);
  const dirty = useSelector(selectSiteDirty);
  const tones = useSelector(selectTones);
  const hero = useSelector(selectHeroImages);
  const { upload, uploadBlob, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  if (!business || !businessId) return null;

  async function handleLogoPick(file: File) {
    const result = await upload(file, businessId!, 'branding', `logo-${Date.now()}`, 600);
    if (!result) {
      dispatch(flashToast('Could not upload the logo'));
      return;
    }
    dispatch(setField({ path: 'logoPath', value: result.path }));
    const saved = await dispatch(saveArea({ businessId: businessId!, area: 'branding', patch: { logoPath: result.path } }));
    dispatch(flashToast(saveArea.fulfilled.match(saved) ? 'Logo updated' : 'Could not save the logo'));
  }

  async function handleSharePick(file: File) {
    const result = await upload(file, businessId!, 'branding', `share-${Date.now()}`, 1200);
    if (!result) {
      dispatch(flashToast('Could not upload the share picture'));
      return;
    }
    dispatch(setField({ path: 'sharePath', value: result.path }));
    const saved = await dispatch(saveArea({ businessId: businessId!, area: 'branding', patch: { sharePath: result.path } }));
    dispatch(flashToast(saveArea.fulfilled.match(saved) ? 'Share picture updated' : 'Could not save the share picture'));
  }

  async function handleGenerateShare() {
    setGenerating(true);
    const heroUrl = hero[0] ? getPublicUrl(hero[0].imagePath) : '';
    const logoUrl = business!.logoPath ? getPublicUrl(business!.logoPath) : '';
    const blob = await generateShareImage(heroUrl, logoUrl, business!.brandColour);
    if (!blob) {
      setGenerating(false);
      dispatch(flashToast('Could not build the picture from these images — try uploading one instead.'));
      return;
    }
    const result = await uploadBlob(blob, businessId!, 'branding', `share-${Date.now()}`);
    setGenerating(false);
    if (!result) {
      dispatch(flashToast('Could not save the generated picture'));
      return;
    }
    dispatch(setField({ path: 'sharePath', value: result.path }));
    const saved = await dispatch(saveArea({ businessId: businessId!, area: 'branding', patch: { sharePath: result.path } }));
    dispatch(flashToast(saveArea.fulfilled.match(saved) ? 'Share picture made' : 'Could not save the share picture'));
  }

  async function handleSaveColour() {
    setSaving(true);
    const result = await dispatch(
      saveArea({ businessId: businessId!, area: 'branding', patch: { brandColour: business!.brandColour } })
    );
    setSaving(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Saved' : 'Could not save'));
  }

  return (
    <section>
      <h2>Branding</h2>
      <p>Your logo, your colour, and the picture people see when your link is shared.</p>

      <ImageSlot
        label="Logo"
        note="Used in the menu bar, the footer, and as the small icon in the browser tab."
        value={business.logoPath ? getPublicUrl(business.logoPath) : ''}
        onPick={handleLogoPick}
      />

      <div style={{ marginTop: 22, marginBottom: 18 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Your colour</label>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 8 }}>
          One colour. Everything else on the site is black text on white, so this is the only colour choice to make.
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="color"
            value={business.brandColour}
            onChange={(e) => dispatch(setField({ path: 'brandColour', value: e.target.value }))}
            style={{ width: 56, height: 48, padding: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'none', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <span style={{ width: 44, height: 48, display: 'block', background: tones.brand }} />
            <span style={{ width: 44, height: 48, display: 'block', background: tones.brandInk }} />
            <span style={{ width: 44, height: 48, display: 'block', background: tones.brandMid }} />
            <span style={{ width: 44, height: 48, display: 'block', background: tones.brandWash }} />
          </div>
          <Button variant="solid" size="sm">Button preview</Button>
        </div>
      </div>

      <ImageSlot
        label="Share picture"
        note="Shows when your link is sent on WhatsApp or Facebook. Make one from your logo and hero photo, or upload your own."
        value={business.sharePath ? getPublicUrl(business.sharePath) : ''}
        onPick={handleSharePick}
      >
        <Button size="sm" onClick={handleGenerateShare} disabled={generating}>
          {generating ? 'Making…' : 'Make one for me'}
        </Button>
      </ImageSlot>

      <SharePreviewCard
        image={business.sharePath ? getPublicUrl(business.sharePath) : ''}
        title={business.name}
        description={business.description}
      />

      {uploading && <p style={{ fontSize: 13, marginTop: 8 }}>Uploading…</p>}

      <SaveBar onSave={handleSaveColour} saving={saving} dirty={dirty} />
    </section>
  );
}