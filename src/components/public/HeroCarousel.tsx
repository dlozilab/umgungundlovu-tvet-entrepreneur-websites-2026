import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../shared/Button";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectHeroImages } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from "./HeroCarousel.module.css";

const ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const business = useSelector(selectBusiness);
  const slides = useSelector(selectHeroImages);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

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
      {slides.map((slide, index) => (
        <div
          key={slide.slot}
          className={`${styles.slide} ${index === active ? styles.on : ""}`}
          aria-hidden={index !== active}
        >
          <img
            src={getPublicUrl(slide.imagePath)}
            alt={slide.alt || ""}
          />
        </div>
      ))}

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.overlay}>
        <div className={styles.captions}>
          {slides.map((slide, index) => (
            <div
              key={slide.slot}
              className={`${styles.caption} ${index === active ? styles.on : ""}`}
            >
              {index === active ? (
                <h1 className={styles.headline}>
                  {slide.caption || business.headline}
                </h1>
              ) : (
                <p className={styles.headline} aria-hidden="true">
                  {slide.caption || business.headline}
                </p>
              )}
              <p className={styles.sub} aria-hidden={index !== active}>
                {slide.subcaption || business.description}
              </p>
            </div>
          ))}
        </div>

        <Button variant="solid" onClick={scrollToContact}>
          Get a quote
        </Button>

        {slides.length > 1 && (
          <div className={styles.dots} aria-label="Choose a hero slide">
            {slides.map((slide, index) => (
              <button
                key={slide.slot}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
