import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectHeroImages } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from "./HeroCarousel.module.css";

const ADVANCE_MS = 6000;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function HeroActions() {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => scrollToSection('contact')}
      >
        Get a quote
      </button>
      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => scrollToSection('services')}
      >
        Our services
      </button>
    </div>
  );
}

export default function HeroCarousel() {
  const business = useSelector(selectBusiness);
  const slides = useSelector(selectHeroImages);
  const [active, setActive] = useState(0);
  const safeActive = slides.length === 0 ? 0 : Math.min(active, slides.length - 1);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!business) return null;

  return (
    <section className={styles.hero} aria-roledescription={slides.length > 0 ? "carousel" : undefined}>
      {slides.length > 0 && (
        <div className={styles.photoLayer}>
          {slides.map((slide, index) => (
            <img
              key={slide.slot}
              className={`${styles.photo} ${index === safeActive ? styles.on : ""}`}
              src={getPublicUrl(slide.imagePath)}
              alt={slide.alt || ""}
              aria-hidden={index !== safeActive}
            />
          ))}
          <div className={styles.photoFade} aria-hidden="true" />
        </div>
      )}

      <div className={styles.inner}>
        <div className={`${styles.textPanel} ${slides.length > 0 ? styles.withPhoto : ""}`}>
          {slides.length > 0 ? (
            <div className={styles.captions}>
              {slides.map((slide, index) => (
                <div
                  key={slide.slot}
                  className={`${styles.caption} ${index === safeActive ? styles.on : ""}`}
                >
                  {index === safeActive ? (
                    <h1 className={styles.headline}>
                      {slide.caption || business.headline}
                    </h1>
                  ) : (
                    <p className={styles.headline} aria-hidden="true">
                      {slide.caption || business.headline}
                    </p>
                  )}
                  <p className={styles.sub} aria-hidden={index !== safeActive}>
                    {slide.subcaption || business.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.captions}>
              <div className={styles.caption}>
                <h1 className={styles.headline}>{business.headline}</h1>
                <p className={styles.sub}>{business.description}</p>
              </div>
            </div>
          )}

          <HeroActions />
        </div>

        {slides.length > 1 && (
          <div className={styles.dots} aria-label="Choose a hero slide">
            {slides.map((slide, index) => (
              <button
                key={slide.slot}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === safeActive}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
