import { useSelector } from "react-redux";
import type { Service } from "../../types/site";
import { selectBusiness } from "../../store/slices/siteSlice";
import { buildWaLink } from "../../utils/links";
import { getPublicUrl } from "../../utils/storage";
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
    service: Service
}

export default function ServiceCard({service} : ServiceCardProps) {
    const business = useSelector(selectBusiness);
    const quoteMessage = `Hi there, I would like to get a quote on your ${service.name} as advertised on your site (Services section: ${window.location.origin}/#services). Please text me as soon as you can.`;
    const quoteLink = buildWaLink(business?.whatsapp ?? '', quoteMessage);

    return (
        <article className={styles.card}>
            {service.imagePath ? (
                <img className={styles.image} src={getPublicUrl(service.imagePath)} alt="" />

            ): (
                <div className={styles.imagePlaceholder} aria-hidden="true"/>
            )}
            <div className={styles.body}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                {quoteLink !== '#' && (
                    <a
                        className={styles.quoteLink}
                        href={quoteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get a quote on this service
                    </a>
                )}
            </div>
        </article>
    )
}