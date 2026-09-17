import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectHeroImages } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from './HeroCarousel.module.css'

const ADVANCE_MS = 6000;

export default function HeroCarousel() {
    const slides = useSelector(selectHeroImages);
    const [active, setActive] = useState(0);
    const timerRef = useRef<number | undefined>(undefined)


useEffect(()=> {
    setActive(0);
    window.clearInterval(timerRef.current);
    if (slides.length >1 ) {
        timerRef.current = window.setInterval(()=> {
            setActive((i) => (i +1) % slides.length);
        }, ADVANCE_MS)
    }

    return () => window.clearInterval(timerRef.current);

}, [slides.length]);

if (slides.length === 0) {
    return <div className={styles.empty} aria-hidden="true"/>
}
return (
    <div className={styles.slides}>
        {slides.map((slide, i) => (
            <img key={slide.slot} className={ i ===active ? styles.on : undefined}
             src={getPublicUrl(slide.imagePath)} alt={slide.alt || ''} />
        ))}

        {slides.length >1 && (
            <div className={styles.dots}>
                {slides.map((slide, i) => (
                    <button key={slide.slot} aria-current={ i === active}
                    aria-label={ `Slide & {i + 1}`}/>
                ))}
            </div>
        )}
    </div>
)




}


