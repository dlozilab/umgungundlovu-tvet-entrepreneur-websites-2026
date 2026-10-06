import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import Field from '../../components/shared/Field';
import ImageSlot from '../../components/shared/ImageSlot';
import SaveBar from '../../components/shared/SaveBar';
import { useImageUpload } from '../../hooks/useImageUpload';
import {
  selectServices,
  selectBusinessId,
  selectSiteDirty,
  setService,
  saveArea,
} from '../../store/slices/siteSlice';
import { flashToast } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';

export default function ServicesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector(selectServices);
  const businessId = useSelector(selectBusinessId);
  const dirty = useSelector(selectSiteDirty);
  const { upload, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);

  if (!businessId || services.length === 0) return null;

  async function handlePick(position: 1 | 2 | 3, file: File) {
    const result = await upload(file, businessId!, 'services', `service-${position}-${Date.now()}`, 1200);
    if (!result) {
      dispatch(flashToast('Could not upload the photo'));
      return;
    }
    dispatch(setService({ position, field: 'imagePath', value: result.path }));
    const next = services.map((s) => (s.position === position ? { ...s, imagePath: result.path } : s));
    const saved = await dispatch(saveArea({ businessId: businessId!, area: 'services', patch: next }));
    dispatch(flashToast(saveArea.fulfilled.match(saved) ? 'Photo updated' : 'Could not save the photo'));
  }

  async function handleSave() {
    setSaving(true);
    const result = await dispatch(saveArea({ businessId: businessId!, area: 'services', patch: services }));
    setSaving(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Saved' : 'Could not save'));
  }

  return (
    <section>
      <h2>Services</h2>
      <p>Up to three. Leave a name blank to hide that service.</p>

      {services.map((service) => (
        <div key={service.position} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 14 }}>
            Service {service.position}
          </h3>

          <ImageSlot
            label="Photo"
            value={service.imagePath ? getPublicUrl(service.imagePath) : ''}
            onPick={(file) => handlePick(service.position, file)}
          />

          <Field
            label="Name"
            value={service.name}
            onChange={(v) => dispatch(setService({ position: service.position, field: 'name', value: v }))}
            placeholder={service.position === 3 ? 'Leave blank to hide this service' : undefined}
          />
          <Field
            label="Description"
            value={service.description}
            onChange={(v) => dispatch(setService({ position: service.position, field: 'description', value: v }))}
          />
        </div>
      ))}

      {uploading && <p style={{ fontSize: 13 }}>Uploading…</p>}

      <SaveBar onSave={handleSave} saving={saving} dirty={dirty} />
    </section>
  );
}