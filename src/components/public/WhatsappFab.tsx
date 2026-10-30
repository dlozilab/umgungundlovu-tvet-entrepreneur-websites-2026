import { useEffect, useState } from "react";
import { selectWaLink } from "../../store/selectors";
import styles from './WhatsappFab.module.css'
import { useSelector } from "react-redux";
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFab() {
    const wa = useSelector(selectWaLink);
    const [contactActionVisible, setContactActionVisible] = useState(false);

    useEffect(() => {
        const contactAction = document.getElementById('contact-whatsapp-cta');
        if (!contactAction || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            ([entry]) => setContactActionVisible(entry.isIntersecting),
            { threshold: 0.01 }
        );
        observer.observe(contactAction);
        return () => observer.disconnect();
    }, []);

    return (
        <a
            href={wa}
            className={`${styles.fab} ${contactActionVisible ? styles.hidden : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            title="Message us on WhatsApp"
            aria-hidden={contactActionVisible}
            tabIndex={contactActionVisible ? -1 : 0}
        >
            <FaWhatsapp className={styles.whatsappLogo} aria-hidden="true" />
        </a>
    )
}