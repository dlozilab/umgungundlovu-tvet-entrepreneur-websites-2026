export type Service = {
  position: 1 | 2 | 3;
  name: string;
  description: string;
  imagePath: string;
};

export type GallerySlot =
  | 'hero1' | 'hero2'
  | 'portrait'
  | 'galleryPremises1' | 'galleryPremises2'
  | 'galleryWork1' | 'galleryWork2'
  | 'galleryDelivery1' | 'galleryDelivery2'
  | `galleryProject${string}`;

export type HeroSlot = 'hero1' | 'hero2';

export interface GalleryCategory {
  id: string;
  label: string;
  legacySlot?: GallerySlot;
}

export const DEFAULT_GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'delivery',
    label: 'Delivery',
    legacySlot: 'galleryDelivery1',
  },
  {
    id: 'installation',
    label: 'Installation',
    legacySlot: 'galleryDelivery2',
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    legacySlot: 'galleryPremises1',
  },
  {
    id: 'renovation',
    label: 'Renovation',
    legacySlot: 'galleryPremises2',
  },
  {
    id: 'construction',
    label: 'Construction',
    legacySlot: 'galleryWork1',
  },
  {
    id: 'other',
    label: 'Other Projects',
    legacySlot: 'galleryWork2',
  },
];

export function getGalleryCategorySlots(category: GalleryCategory): GallerySlot[] {
  const slotId = `${category.id.charAt(0).toUpperCase()}${category.id.slice(1)}`;
  return [1, 2, 3, 4].map((number) => `galleryProject${slotId}${number}` as GallerySlot);
}

export interface GalleryRow {
  slot: GallerySlot;
  label: string;
  imagePath: string;
  alt: string;
  caption?: string;
  subcaption?: string;
}

export type Business = {
  id: string;
  updated_at?: string;
  name: string;
  headline: string;
  description: string;
  brandColour: string;
  logoPath: string;
  sharePath: string;
  aboutStory: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  delivers: boolean;
  walkins: boolean;
  registeredName: string;
  cipcNumber: string;
  established: string;
  bbeeLevel: string;
  proudlySa: boolean; 
  published: boolean;
  galleryCategories?: GalleryCategory[];
};

export type Profile = {
  id: string;
  businessId: string;
  displayName: string;
  role: 'owner' | 'support';
};

export type Area =
  | 'details'
  | 'branding'
  | 'about'
  | 'services'
  | 'gallery'
  | 'contact'
  | 'compliance';