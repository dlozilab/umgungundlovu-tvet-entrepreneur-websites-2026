import Icon from "../shared/Icon";
import { selectBusiness } from "../../store/slices/siteSlice";
// import { selectGeoUri } from "../../store/selectors";
// import { getPublicUrl } from "../../utils/storage";
import styles from './SiteFooter.module.css'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BADGE_LINK = '';
const BADGE_IMAGE = '/assets/mlab%20logo%20image.jpg';

export default function SiteFooter() {
    const business = useSelector(selectBusiness);
    // const geo = useSelector(selectGeoUri);

    if (!business) return null;

    const badge = (
        <img
            className={styles.badgeImage}
            src={BADGE_IMAGE}
            alt="CodeTribe, powered by mLab"
            width="94"
            height="45"
            loading="lazy"
            decoding="async"
        />
    );

    return (
        <footer className={styles.footer}>
            <div className={`wrap ${styles.wrap}`}>
                <div className={styles.adminRow}>
                    <Link className={styles.adminLink} to="/admin/dashboard" aria-label="Site administration" title="Site administration">
                        <Icon name="gear" />
                    </Link>
                </div>
                <div className={styles.badgeRow}>
                    {BADGE_LINK ? (
                        <a href={BADGE_LINK} target="_blank" rel="noopener noreferrer" aria-label="CodeTribe, powered by mLab">
                            {badge}
                        </a>
                    ) : badge}
                </div>
            </div>
        </footer>
    )
}