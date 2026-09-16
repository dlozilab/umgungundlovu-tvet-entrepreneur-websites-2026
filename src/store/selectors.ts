import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { buildStrapline } from '../utils/strapline';
import { deriveTones, luminance } from '../utils/colour';
import { buildGeoUri, buildWaLink } from '../utils/links';
import { completeness } from '../utils/completeness';

const selectBusinessRaw = (state: RootState) => state.site.business;
const selectServicesRaw = (state: RootState) => state.site.services;
const selectMediaRaw = (state: RootState) => state.site.media;

// Services section skips any row without a name (§6).
export const selectVisibleServices = createSelector([selectServicesRaw], (services) =>
  services.filter((s) => (s.name || '').trim().length > 0)
);

// Hero eyebrow, page title, Open Graph title.
export const selectStrapline = createSelector([selectVisibleServices], (visible) =>
  buildStrapline(visible)
);

// Sets the five CSS custom properties at the root (consumed by useBrandTheme).
export const selectTones = createSelector([selectBusinessRaw], (business) =>
  deriveTones(business?.brandColour || '#1f5c3d')
);

// Black or white button text, decided by luminance.
export const selectButtonInk = createSelector([selectBusinessRaw], (business) =>
  luminance(business?.brandColour || '#1f5c3d') > 0.45 ? '#111111' : '#ffffff'
);

// Footer address link, with a maps URL fallback.
export const selectGeoUri = createSelector([selectBusinessRaw], (business) =>
  buildGeoUri(business?.address || '')
);

// Three WhatsApp buttons (header drawer, contact section, floating FAB).
export const selectWaLink = createSelector([selectBusinessRaw], (business) =>
  buildWaLink(business?.whatsapp || '')
);

// Gallery section, skipping empty optional slots.
export const selectGallery = createSelector([selectMediaRaw], (media) =>
  media.filter((m) => m.slot.startsWith('gallery') && m.imagePath)
);

// MetaTags component: title, description, favicon, OG/Twitter tags.
export const selectMeta = createSelector(
  [selectBusinessRaw, selectStrapline],
  (business, strapline) => {
    if (!business) return null;
    const title = strapline ? `${business.name} | ${strapline}` : business.name;
    return {
      title,
      description: business.description || '',
      favicon: business.logoPath || '',
      ogImage: business.sharePath || '',
    };
  }
);

// Dashboard checklist.
export const selectCompleteness = createSelector(
  [selectBusinessRaw, selectServicesRaw, selectMediaRaw],
  (business, services, media) => completeness(business, services, media)
);