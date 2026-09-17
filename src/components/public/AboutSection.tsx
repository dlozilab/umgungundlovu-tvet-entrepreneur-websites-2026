import { useSelector } from "react-redux";
import SectionHeading from "../shared/SectionHeading";
import { selectBusiness } from "../../store/slices/siteSlice";
import { getPublicUrl } from "../../utils/storage";
import { selectPortrait } from "../../store/selectors";
import styles from './AboutSection.module.css'

export default function AboutSection() {
    const business = useSelector(selectBusiness)
    const portrait = useSelector(selectPortrait);

    if (!business) return null;

    return (
        <section className={`section ${styles.section}`} id="about">
            <div className="wrap">
                <SectionHeading eyebrow="About" title="The person behind the wrok"/>
                <div className={styles.grid}>
                    {portrait ? (
                        <img className={styles.portrait} src={getPublicUrl(portrait.imagePath)} alt={portrait.alt || "Portrait of the owner"} />

                    ): (
                        <div className={styles.portraitPlaceholder} aria-hidden="true"/>

                    )}
                    <p className="lead"> {business.aboutStory}</p>
                </div>
            </div>
        </section>
    )

}