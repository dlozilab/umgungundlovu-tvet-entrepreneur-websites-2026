import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectHeroImages } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from './HeroCarousel.module.css';

const ADVANCE_MS = 4000;

export default function HeroCarousel() {
    const slides = useSelector(selectHeroImages);
    const [active, setActive] = useState(0);
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (slides.length <= 1) return;

        timerRef.current = window.setInterval(() => {
            setActive((current) => (current + 1) % slides.length);
        }, ADVANCE_MS);

        return () => window.clearInterval(timerRef.current);
    }, [slides.length]);

    if (slides.length === 0) {
        return <div className={styles.empty} aria-hidden="true" />;
    }

    const showSlide = (direction: number) => {
        setActive((current) => (current + direction + slides.length) % slides.length);
    };

    return (
        <div className={styles.heroPanel}>
            <div className={styles.imageCard}>
                <div className={styles.imageTrack}>
                    {slides.map((slide, index) => (
                        <img
                            key={slide.slot}
                            src={getPublicUrl(slide.imagePath)}
                            alt={slide.alt || ''}
                            className={index === active ? styles.activeImage : styles.inactiveImage}
                        />
                    ))}
                </div>

                {slides.length > 1 && (
                    <div className={styles.controls}>
                        <button
                            type="button"
                            className={styles.navButton}
                            aria-label="Previous hero image"
                            onClick={() => showSlide(-1)}
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            className={styles.navButton}
                            aria-label="Next hero image"
                            onClick={() => showSlide(1)}
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


