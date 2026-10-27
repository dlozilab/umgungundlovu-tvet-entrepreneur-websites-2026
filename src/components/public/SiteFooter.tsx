import Icon from "../shared/Icon";
import { selectBusiness } from "../../store/slices/siteSlice";
import styles from './SiteFooter.module.css';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BADGE_IMAGE = '/assets/mlab_logo_image-removebg-preview.png';

export default function SiteFooter() {
    const business = useSelector(selectBusiness);

    if (!business) return null;

    return (
        <footer className={styles.footer}>
            <div className={`wrap ${styles.content}`}>
                <div className={styles.businessDetails}>
                    <Link
                        className={styles.adminLink}
                        to="/admin/dashboard"
                        aria-label="Site administration"
                        title="Site administration"
                    >
                        <Icon name="gear" />
                    </Link>
                    <small className={styles.copyright}>
                        © 2026 Lioness Steel and Manufacturers
                    </small>
                </div>
                <img
                    className={styles.badgeImage}
                    src={BADGE_IMAGE}
                    alt="CodeTribe, powered by mLab"
                    width="720"
                    height="300"
                    loading="eager"
                    decoding="async"
                />
            </div>
        </footer>
    );
}
