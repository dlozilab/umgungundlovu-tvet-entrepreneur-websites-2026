import type {Business, Service, GalleryRow} from '../types/site'

export interface ChecklistItem {
    label: string;
    done: boolean;
    page: string;
}

export function completeness(
    business: Business | null,
    services: Service[],
    media: GalleryRow[]
): ChecklistItem[] {
    if (!business) return[]

    const filledGallery = media.filter((m) => String(m.slot).startsWith('gallery') && m.imagePath).length;
    const svcCount = services.filter((s) => (s.name || '').trim()).length
    const portrait = media.find((m) => String(m.slot) === 'portrait')

    return [
        { label: 'Business details', done: !!(business.name && business.headline), page: 'details'},
        { label: 'Logo, color and share picture', done: !!(business.logoPath && business.brandColour && business.sharePath), page: 'branding'},
        {label: 'About and owner photo', done: !!(business.aboutStory && portrait?.imagePath), page: 'about'},
        {label: `Services, ${svcCount} of 3`, done: svcCount >= 1, page: 'services'},
        { label: `Gallery, ${filledGallery} of 6 photos`, done: filledGallery >= 3, page: 'gallery' },
    { label: 'Contact and hours', done: !!(business.phone && business.address), page: 'contact' },
    { label: 'Compliance details', done: !!business.cipcNumber, page: 'compliance' },
    ]
}
