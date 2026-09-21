import Icon from "../shared/Icon";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectGeoUri } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import styles from './SiteFooter.module.css'
import { useSelector } from "react-redux";


export default function SiteFooter() {
    const business = useSelector(selectBusiness);
    const geo = useSelector(selectGeoUri);

    if (!business) return null;

    return (
        <footer className={styles.footer}>
            <div className={`wrap ${styles.cols}`}>
                <div>
                    <div className={styles.brand}> 
                        {business.logoPath ? (
                            <img className={styles.logo} src={getPublicUrl(business.logoPath)} alt="" />
                        ): (
                            <div className={styles.logoPh} aria-hidden="true"/>
                        )}
                        <span style={{fontWeight:600}}> {business.name}</span>

                    </div>
                    <a className={styles.address} href={geo.mapsUrl}>
                        <Icon name="pin"/>
                        <span> {business.address}</span>
                        </a>
                </div>

                <div className={styles.compliance}>
                    <dl className={styles.dl}>
                        <dt> Registered name</dt> <dd>{business.registeredName}</dd>
                        <dt> CIPC registration</dt> <dd>{business.cipcNumber}</dd>
                        <dt> Established</dt> <dd>{business.established}</dd>
                    </dl>

                    <div className={styles.creditRow}>
                        <p className={styles.credit}> Prototype. Data is stores in firebase</p>
                        <a className={styles.adminLink} href="login" aria-label="Site admin" title="Site admin">
                            <Icon name="gear"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}