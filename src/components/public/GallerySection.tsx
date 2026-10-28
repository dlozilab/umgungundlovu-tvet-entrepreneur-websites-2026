import { useEffect, useMemo, useState } from "react";
import SectionHeading from "../shared/SectionHeading";
import GalleryTile from "./GalleryTile";
import { selectGallery } from "../../store/selectors";
import styles from './GallerySection.module.css'
import { useSelector } from "react-redux";
import { selectBusiness } from "../../store/slices/siteSlice";
import {
    DEFAULT_GALLERY_CATEGORIES,
    getGalleryCategorySlots,
    type GalleryRow,
} from "../../types/site";
import { getPublicUrl } from "../../utils/storage";

export default function GallerySection(){
    const rows = useSelector(selectGallery);
    const business = useSelector(selectBusiness);
    const categories = business?.galleryCategories ?? DEFAULT_GALLERY_CATEGORIES;
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const galleries = useMemo(() => {
        const mediaBySlot = new Map(rows.map((row) => [row.slot, row]));
        return categories.filter((category) => category.label.trim()).map((category) => {
            const images = getGalleryCategorySlots(category)
                .map((slot) => mediaBySlot.get(slot))
                .filter((row): row is GalleryRow => Boolean(row?.imagePath));
            const legacyImage = category.legacySlot ? mediaBySlot.get(category.legacySlot) : undefined;
            if (legacyImage?.imagePath) images.push(legacyImage);
            return { ...category, images };
        });
    }, [categories, rows]);
    const selectedGallery = activeCategory === null ? null : galleries[activeCategory];
    const currentImage = selectedGallery?.images[activeImage];

    useEffect(() => {
        if (!selectedGallery) return;

        document.body.style.overflow = 'hidden';
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setActiveCategory(null);
            if (event.key === 'ArrowRight') {
                setActiveImage((index) => (index + 1) % selectedGallery.images.length);
            }
            if (event.key === 'ArrowLeft') {
                setActiveImage((index) => (index - 1 + selectedGallery.images.length) % selectedGallery.images.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedGallery]);

    if (galleries.every((gallery) => gallery.images.length === 0)) return null;
    return (
        <section className="section" id="gallery">
            <div className="wrap">
                <SectionHeading eyebrow="Gallery" title="Our Work"/>
                <div className={styles.grid}>
                    {galleries.map((gallery, index) => gallery.images[0] && (
                        <GalleryTile
                            key={gallery.id}
                            title={gallery.label}
                            imageUrl={getPublicUrl(gallery.images[0].imagePath)}
                            imageCount={gallery.images.length}
                            onClick={() => {
                                setActiveImage(0);
                                setActiveCategory(index);
                            }}
                        />
                    ))}
                </div>
            </div>
            {selectedGallery && currentImage && (
                <div
                    className={styles.backdrop}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setActiveCategory(null);
                    }}
                >
                    <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={`${selectedGallery.label} gallery`}>
                        <button className={styles.close} type="button" onClick={() => setActiveCategory(null)} aria-label="Close gallery">
                            ×
                        </button>
                        <img
                            className={styles.galleryImage}
                            src={getPublicUrl(currentImage.imagePath)}
                            alt={currentImage.alt || currentImage.caption || `${selectedGallery.label} project`}
                        />
                        <div className={styles.galleryControls}>
                            <span className={styles.galleryCaption}>
                                <strong>{selectedGallery.label}</strong>
                                {currentImage.caption && <span>{currentImage.caption}</span>}
                            </span>
                            {selectedGallery.images.length > 1 && (
                                <span className={styles.navigation}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveImage((index) => (index - 1 + selectedGallery.images.length) % selectedGallery.images.length)}
                                        aria-label="Previous image"
                                    >
                                        ‹
                                    </button>
                                    <span>{activeImage + 1} / {selectedGallery.images.length}</span>
                                    <button
                                        type="button"
                                        onClick={() => setActiveImage((index) => (index + 1) % selectedGallery.images.length)}
                                        aria-label="Next image"
                                    >
                                        ›
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
