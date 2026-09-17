import type { Service } from "../../types/site";
import { getPublicUrl } from "../../utils/storage";
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
    service: Service
}

export default function ServiceCard({service} : ServiceCardProps) {
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
            </div>
        </article>
    )
}