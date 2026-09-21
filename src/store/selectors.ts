import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Service, GalleryRow } from '../types/site';
import { buildStrapline } from '../utils/strapline';
import { deriveTones, luminance } from '../utils/colour';
import { buildGeoUri, buildWaLink } from '../utils/links';
import { completeness } from '../utils/completeness';

const EMPTY_SERVICES: Service[] = [];
const EMPTY_MEDIA: GalleryRow[] = [];

const selectBusinessRaw = (state: RootState) => state.site?.business ?? null;
const selectServicesRaw = (state: RootState) => state.site?.services ?? EMPTY_SERVICES;
const selectMediaRaw = (state: RootState) => state.site?.media ?? EMPTY_MEDIA;

export const selectVisibleServices = createSelector([selectServicesRaw], (services) =>
  services.filter((s) => (s.name || '').trim().length > 0)
);

export const selectStrapline = createSelector([selectVisibleServices], (visible) =>
  buildStrapline(visible)
);

export const selectTones = createSelector([selectBusinessRaw], (business) =>
  deriveTones(business?.brandColour || '#1f5c3d')
);

export const selectButtonInk = createSelector([selectBusinessRaw], (business) =>
  luminance(business?.brandColour || '#1f5c3d') > 0.45 ? '#111111' : '#ffffff'
);

export const selectGeoUri = createSelector([selectBusinessRaw], (business) =>
  buildGeoUri(business?.address || '')
);

export const selectWaLink = createSelector([selectBusinessRaw], (business) =>
  buildWaLink(business?.whatsapp || '')
);

export const selectServes= createSelector([selectBusinessRaw], (business) => {
    const parts: string[] = [];
    if (business?.delivers) parts.push('We deliver');
    if (business?.walkins) parts.push('we take walk-ins');
    return parts.join(', ')
})

export const selectGallery = createSelector([selectMediaRaw], (media) =>
  media.filter((m) => String(m.slot).startsWith('gallery') && m.imagePath)
);

export const selectHeroImages = createSelector([selectMediaRaw], (media) => {
  const bySlot = new Map(media.map((m) => [m.slot, m]));
  return (['hero1', 'hero2'] as const)
    .map((slot) => bySlot.get(slot))
    .filter((row): row is NonNullable<typeof row> => Boolean(row?.imagePath));
});

export const selectPortrait = createSelector([selectMediaRaw], (media) =>
  media.find((m) => m.slot === 'portrait' && m.imagePath)
);

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

export const selectCompleteness = createSelector(
  [selectBusinessRaw, selectServicesRaw, selectMediaRaw],
  (business, services, media) => completeness(business, services, media)
);