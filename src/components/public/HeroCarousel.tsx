import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../shared/Button";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectHeroImages } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from "./HeroCarousel.module.css";


const ADVANCE_MS = 6000;
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth'})
}

// helper function
function HeroActions() {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.btnPrimary} onClick={()=> scrollToSection('contact')}>
      Get A Quote
      </button>
      <button type="button" className={styles.btnSecondary} onClick={() => scrollToSection('services')}>
        Our Services
      </button>
    </div>
  )
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

  // for the linear gradient image in hero section to blenfd on to the nav section as well|
  if (slides.length === 0 ){
    return (
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={`${styles.copy} ${styles.copyOnly}`}>
            <h1 className={styles.headline}>{business?.headline}</h1>
            {business?.description && <p className={styles.sub}>{business.description}</p>}
            <HeroActions/>
          </div>
        </div>
      </section>
    )
  }

  if (!business) return null;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  if (slides.length === 0) {
    return (
      <section className={styles.plain}>
        <h1 className={styles.plainHeadline}>{business.headline}</h1>
        <p className={styles.plainLead}>{business.description}</p>
        <Button variant="solid" onClick={scrollToContact}>
          Get a quote
        </Button>
      </section>
    );
  }

  return (
    <section className={styles.slides} aria-roledescription="carousel">
      <div className={styles.backgrounds} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.slot}
            className={`${styles.slide} ${index === safeActive ? styles.on : ""}`}
            aria-hidden={index !== safeActive}
          >
            <img
              src={getPublicUrl(slide.imagePath)}
              alt=""
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
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

            {/* <Button variant="solid" onClick={scrollToContact}>
              Get a quote
            </Button> */}

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

          <div className={styles.photoColumn}>
            {slides.map((slide, index) => (
              <img
                key={`${slide.slot}-photo`}
                className={`${styles.photo} ${index === safeActive ? styles.on : ""}`}
                src={getPublicUrl(slide.imagePath)}
                alt={slide.alt || ""}
                aria-hidden={index !== safeActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
