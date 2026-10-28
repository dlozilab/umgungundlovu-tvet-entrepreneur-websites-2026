import Icon from "../shared/Icon";
import { selectBusiness } from "../../store/slices/siteSlice";
import styles from './SiteFooter.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BADGE_IMAGE = '/assets/mlab_logo_image-removebg-preview.png';

export default function SiteFooter() {
    const business = useSelector(selectBusiness);
    const currentYear = new Date().getFullYear();

    if (!business) return null;

    return (
        <footer className={styles.footer}>
            <div className={`wrap ${styles.content}`}>
                <div className={styles.footerMain}>
                    <strong className={styles.businessName}>{business.name}</strong>
                    <div className={styles.compliance} aria-label="Business compliance details">
                        <img className={styles.flag} src="/flag-za.svg" alt="South African flag" width="30" height="20" />
                        <div className={styles.complianceDetails}>
                            {business.registeredName && <span>{business.registeredName}</span>}
                            {business.cipcNumber && <span>CIPC registration: {business.cipcNumber}</span>}
                            {business.bbeeLevel && <span>{business.bbeeLevel}</span>}
                            {business.established && <span>Established {business.established}</span>}
                            {business.proudlySa && <span>Proudly South African</span>}
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <small className={styles.copyright}>© {currentYear}</small>
                    <img
                        className={styles.badgeImage}
                        src={BADGE_IMAGE}
                        alt="CodeTribe, powered by mLab"
                        width="720"
                        height="300"
                        loading="eager"
                        decoding="async"
                    />
                    <Link
                        className={styles.adminLink}
                        to="/admin/dashboard"
                        aria-label="Site administration"
                        title="Site administration"
                    >
                        <Icon name="gear" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
