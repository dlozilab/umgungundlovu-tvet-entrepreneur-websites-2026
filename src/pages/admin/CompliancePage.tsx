import  { useState } from 'react';
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

const BBEE_OPTIONS = [
  { value: '', label: 'Not certified' },
  { value: 'B-BBEE Level 1', label: 'Level 1' },
  { value: 'B-BBEE Level 2', label: 'Level 2' },
  { value: 'B-BBEE Level 4', label: 'Level 4' },
];

export default function CompliancePage() {
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
        area: 'compliance',
        patch: {
          registeredName: b.registeredName,
          cipcNumber: b.cipcNumber,
          established: b.established,
          proudlySa: b.proudlySa,
          bbeeLevel: b.bbeeLevel,
        },
      })
    );
    setSaving(false);
    dispatch(flashToast(saveArea.fulfilled.match(result) ? 'Saved' : 'Could not save'));
  }

  return (
    <section>
      <h2>Compliance</h2>
      <p>Registration details for the bottom of your site. Set these once.</p>

      <Field label="Registered name" value={business.registeredName} onChange={set('registeredName')} />
      <Field label="CIPC registration number" value={business.cipcNumber} onChange={set('cipcNumber')} />
      <Field label="Year established" value={business.established} onChange={set('established')} />

      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 0 }}>Badges</p>
      <Checkline
        label="South African owned business"
        checked={business.proudlySa}
        onChange={set('proudlySa')}
      />

      <div style={{ marginTop: 18 }}>
        <Field
          label="B-BBEE level"
          type="select"
          options={BBEE_OPTIONS}
          value={business.bbeeLevel}
          onChange={set('bbeeLevel')}
        />
      </div>

      <SaveBar onSave={handleSave} saving={saving} dirty={dirty} />
    </section>
  );
}