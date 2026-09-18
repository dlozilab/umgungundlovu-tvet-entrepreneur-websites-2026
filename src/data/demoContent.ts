import type { Business, Service, GalleryRow } from '../types/site';

export const demoBusiness: Business = {
  id: 'demo',
  name: 'Try Again Co and Partners',
  headline: 'Built to order, delivered to site.',
  description: 'This is just to test the uI, firebase is not yet integrated on to this project/..',
  brandColour: '#1f5c3d',
  logoPath: '',
  sharePath: '',
  aboutStory: 'A short account of how the business started, where the owner trained, when they opened, and what they are known for locally.',
  aboutPortrait: '',
  phone: '033 000 0000',
  whatsapp: '072 000 0000',
  email: 'name@business.co.za',
  address: '00 Street Name, Suburb, Pietermaritzburg',
  hours: 'Monday to Sunday, 08:00 to 17:00',
  delivers: true,
  walkins: true,
  registeredName: 'Try Again Co and Partners',
  cipcNumber: '2020/123456/07',
  established: '2020',
  bbeeLevel: '',
  published: true,
};

export const demoServices: Service[] = [
  { position: 1, name: 'Welding', description: 'On-site and workshop welding for steel and mild steel.', imagePath: '' },
  { position: 2, name: 'Aluminium', description: 'Windows, doors and custom aluminium fabrication.', imagePath: '' },
  { position: 3, name: 'Boiler making', description: 'Tanks, frames and heavy structural work.', imagePath: '' },
];

// zero rows (empty placeholder / section returns null), so this also
// doubles as a check that those empty states look right.
export const demoMedia: GalleryRow[] = [];