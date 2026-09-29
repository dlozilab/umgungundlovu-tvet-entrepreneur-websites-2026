import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import Field from '../../components/shared/Field';
import Checkline from '../../components/shared/Checkline';
import SaveBar from '../../components/shared/SaveBar';
import {
  selectBusiness,
  selectBusinessId,
  selectSiteDirty,
  setField,
  saveArea,
} from '../../store/slices/siteSlice';
import { flashToast } from '../../store/slices/uiSlice';

export default function ContactPage() {
  const dispatch = useDispatch<AppDispatch>();
  const business = useSelector(selectBusiness);
  const businessId = useSelector(selectBusinessId);
  const dirty = useSelector(selectSiteDirty);
  const [saving, setSaving] = useState(false);

  if (!business || !businessId) return null;

  const set = (path: string) => (value: unknown) => dispatch(setField({ path, value }));

  async function handleSave() {
    setSaving(true);
    const b = business!;
    const result = await dispatch(
      saveArea({
        businessId: businessId!,
        area: 'contact',
        patch: {
          phone: b.phone,
          whatsapp: b.whatsapp,
          email: b.email,
          address: b.address,
          hours: b.hours,
          delivers: b.delivers,
          walkins: b.walkins,
        },
      })
    );
    setSaving(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Saved' : 'Could not save'));
  }

  return (
    <section>
      <h2>Contact and hours</h2>
      <p>How customers reach you and when you are open.</p>

      <Field label="Phone number" type="tel" value={business.phone} onChange={set('phone')} />
      <Field label="WhatsApp number" type="tel" value={business.whatsapp} onChange={set('whatsapp')} />
      <Field label="Email address" type="email" value={business.email} onChange={set('email')} />
      <Field
        label="Address"
        hint="Type it once. Customers tap it and their phone opens directions."
        value={business.address}
        onChange={set('address')}
      />
      <Field label="Trading hours" value={business.hours} onChange={set('hours')} />

      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 0 }}>How you serve customers</p>
      <Checkline label="We deliver" checked={business.delivers} onChange={set('delivers')} />
      <Checkline label="We take walk-ins" checked={business.walkins} onChange={set('walkins')} />

      <SaveBar onSave={handleSave} saving={saving} dirty={dirty} />
    </section>
  );
}