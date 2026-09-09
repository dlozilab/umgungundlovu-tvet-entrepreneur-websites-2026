export type Service = {
  name: string
  description: string
  imagePath: string
}

export type GallerySlot = {
  label: string
  imagePath: string
}

export type Business = {
  name: string
  headline: string
  description: string
  brandColour: string
  logoPath: string
  sharePath: string
  aboutStory: string
  aboutPortrait: string
  hero: [string, string]
  services: [Service, Service, Service]
  gallery: [GallerySlot, GallerySlot, GallerySlot, GallerySlot, GallerySlot, GallerySlot]
  phone: string
  whatsapp: string
  email: string
  address: string
  hours: string
  delivers: boolean
  walkins: boolean
  registeredName: string
  cipcNumber: string
  established: string
  bbeeLevel: string
  published: boolean
}

export type Profile = {
  businessId: string
  displayName: string
  role: 'owner' | 'support'
}

export type Area =
  | 'details'
  | 'branding'
  | 'about'
  | 'services'
  | 'gallery'
  | 'contact'
  | 'compliance'