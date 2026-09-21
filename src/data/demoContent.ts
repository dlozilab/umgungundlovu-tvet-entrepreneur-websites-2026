import type { Business, Service, GalleryRow } from '../types/site';

export const demoBusiness: Business = {
  id: 'demo',
  name: 'Try Again Co and Partners',
  headline: 'Built to order, delivered to site.',
  description: 'This is just to test the uI, firebase is not yet integrated on to this project/..',
  brandColour: '#1f5c3d',
  logoPath: 'https://images.unsplash.com/photo-1789700537304-c291bfc38ad9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
  sharePath: '',
  aboutStory: 'A short account of how the business started, where the owner trained, when they opened, and what they are known for locally.',
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
  proudlySa: true,
  published: true,
};

export const demoServices: Service[] = [
  { position: 1, name: 'Welding', description: 'On-site and workshop welding for steel and mild steel.', imagePath: '' },
  { position: 2, name: 'Aluminium', description: 'Windows, doors and custom aluminium fabrication.', imagePath: '' },
  { position: 3, name: 'Boiler making', description: 'Tanks, frames and heavy structural work.', imagePath: '' },
];

// zero rows (empty placeholder / section returns null), so this also
// doubles as a check that those empty states look right.
export const demoMedia: GalleryRow[] = [
  { slot: 'hero1', label: '', imagePath: 'https://images.unsplash.com/photo-1789700537304-c291bfc38ad9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: '' },
  { slot: 'hero2', label: '', imagePath: 'https://images.unsplash.com/photo-1525570665650-76bb26af503d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: '' },
  { slot: 'portrait', label: '', imagePath: 'https://images.unsplash.com/photo-1549492761-123cdcb927aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D', alt: 'Portrait of the owner' },
  { slot: 'galleryPremises1', label: 'Premises', imagePath: 'https://images.unsplash.com/photo-1756368881750-e9e065a1d1ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D', alt: '' },
  { slot: 'galleryPremises2', label: 'Premises', imagePath: 'https://images.unsplash.com/photo-1756480734230-a7680051fc26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8', alt: '' },
  { slot: 'galleryWork1', label: 'Work', imagePath: 'https://plus.unsplash.com/premium_photo-1664910255137-5462726ff06b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWx1bWluaXVtJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D', alt: '' },
  { slot: 'galleryWork2', label: 'Work', imagePath: 'https://images.unsplash.com/photo-1562052579-b30d05e1ec93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWx1bWluaXVtJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D', alt: '' },
  { slot: 'galleryDelivery1', label: 'Delivery', imagePath: 'https://images.unsplash.com/photo-1665492164147-4204734cb7f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFsdW1pbml1bSUyMHdvcmt8ZW58MHx8MHx8fDA%3D', alt: '' },
  { slot: 'galleryDelivery2', label: 'Delivery', imagePath: 'https://plus.unsplash.com/premium_photo-1670315267667-69a0b41d8384?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFsdW1pbml1bSUyMHdvcmt8ZW58MHx8MHx8fDA%3D', alt: '' },

];