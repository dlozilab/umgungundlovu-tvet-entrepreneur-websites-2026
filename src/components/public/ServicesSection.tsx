import { useSelector } from "react-redux";
import SectionHeading from "../shared/SectionHeading";
import ServiceCard from "./ServiceCard";
import { selectVisibleServices } from "../../store/selectors";
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
    const services = useSelector(selectVisibleServices)
    if (services.length ===0) return null;
    
    return (
        <section className="section" id="services">
            <div className="wrap">
                <SectionHeading eyebrow="Services" title="What we make"/>
                <div className={styles.cards}>
                    {services.map((service) => (
                        <ServiceCard key={service.position} service={service}/>
                    ))}
                </div>
            </div>
        </section>
    )
}