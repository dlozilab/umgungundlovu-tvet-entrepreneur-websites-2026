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
  | 'galleryDelivery1' | 'galleryDelivery2';

export interface GalleryRow {
  slot: GallerySlot;
  label: string;
  imagePath: string;
  alt: string;
}

export type Business = {
  id: string;
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