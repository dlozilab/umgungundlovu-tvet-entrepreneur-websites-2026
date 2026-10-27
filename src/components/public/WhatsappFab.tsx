import { useEffect, useState } from "react";
import { selectWaLink } from "../../store/selectors";
import styles from './WhatsappFab.module.css'
import { useSelector } from "react-redux";

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
            <svg className={styles.whatsappLogo} viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="13" />
                <path d="M11.2 9.8c-.4 0-.8.2-1.1.6-.4.5-1.4 1.4-1.4 3.4s1.4 4 1.6 4.3c.2.3 2.8 4.5 6.9 6.1 3.4 1.3 4.1 1 4.9.9.8-.1 2.5-1 2.8-2 .4-1 .4-1.8.3-2-.1-.2-.4-.3-.9-.5l-2.8-1.3c-.4-.2-.7-.2-1 .3-.3.5-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.1-1.3-1.1-2.1-2.5-2.4-2.9-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.7-.7-1-.7z" />
            </svg>
        </a>
    )
}