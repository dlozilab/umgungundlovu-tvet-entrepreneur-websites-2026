import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './store';
import AppBar from './components/shared/AppBar';
import Drawer from './components/shared/Drawer';
import NavList, { type NavItem } from './components/shared/NavList';
import Button from './components/shared/Button';
import Field from './components/shared/Field';
import SectionHeading from './components/shared/SectionHeading';
import { useBrandTheme } from './hooks/useBrandTheme';
import {
  selectAuthReady,
  selectAuthUser,
  signOut,
} from './store/slices/authSlice';
import {
  selectBusiness,
  selectSiteStatus,
  selectSiteError,
  selectBusinessId,
  saveArea,
  setField,
} from './store/slices/siteSlice';
import { selectStrapline, selectMeta } from './store/selectors';
import {
  selectNavOpen,
  openNav,
  closeNav,
  selectToast,
  flashToast,
} from './store/slices/uiSlice';

const NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'Home', href: '#top', icon: 'dashboard' },
  { id: 'about', label: 'About', href: '#about', icon: 'about' },
  { id: 'services', label: 'Services', href: '#services', icon: 'services' },
  { id: 'gallery', label: 'Gallery', href: '#gallery', icon: 'gallery' },
];

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useBrandTheme();

  const authReady = useSelector(selectAuthReady);
  const user = useSelector(selectAuthUser);

  const business = useSelector(selectBusiness);
  const siteStatus = useSelector(selectSiteStatus);
  const siteError = useSelector(selectSiteError);
  const businessId = useSelector(selectBusinessId);
  const strapline = useSelector(selectStrapline);
  const meta = useSelector(selectMeta);

  const navOpen = useSelector(selectNavOpen);
  const toast = useSelector(selectToast);

  const [saving, setSaving] = useState(false);

  if (siteStatus === 'loading' || !authReady) {
    return <p style={{ padding: 24 }}>Loading… Hi The site is wroking, do not pannick this will disappear</p>;
  }
  if (siteStatus === 'failed' || !business || !businessId) {
    return <p style={{ padding: 24 }}>Could not load the site: {siteError}</p>;
  }

  async function handleSave() {
    setSaving(true);
    const result = await dispatch(
      saveArea({ businessId: businessId!, area: 'details', patch: { headline: business!.headline } })
    );
    setSaving(false);
    if (saveArea.fulfilled.match(result)) dispatch(flashToast('Saved'));
    else dispatch(flashToast('Could not save'));
  }

  return (
    <div id="top">
      <AppBar
        logo={business.logoPath || undefined}
        title={business.name}
        subtitle={strapline || undefined}
        onMenu={() => dispatch(openNav())}
      />

      <Drawer open={navOpen} onClose={() => dispatch(closeNav())}>
        <NavList items={NAV_ITEMS} onSelect={() => dispatch(closeNav())} />
      </Drawer>

      <main className="wrap section">
        <SectionHeading eyebrow={strapline || undefined} title={business.headline} />
        <p className="lead">{business.description}</p>

        <div style={{ maxWidth: 420, marginTop: 24 }}>
          <Field
            label="Headline"
            hint="Quick edit to prove setField → saveArea round-trips to Firestore."
            value={business.headline}
            onChange={(value) => dispatch(setField({ path: 'headline', value }))}
          />
          <Button variant="solid" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>

        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--ink-soft)' }}>
          business: {businessId} · signed in as: {user ? user.email : 'nobody'}
          {user && (
            <>
              {' · '}
              <button
                style={{ border: 0, background: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => dispatch(signOut())}
              >
                sign out
              </button>
            </>
          )}
        </p>

        {meta && (
          <p style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-soft)' }}>
            meta title: {meta.title}
          </p>
        )}
      </main>

      {toast && (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 24,
            transform: 'translateX(-50%)',
            background: 'var(--ink)',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: 100,
            fontSize: 14,
            zIndex: 80,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}