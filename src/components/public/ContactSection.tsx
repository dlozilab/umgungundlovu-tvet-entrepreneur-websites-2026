import { useSelector } from "react-redux";
import SectionHeading from "../shared/SectionHeading";
import ContactRow from "./ContactRow";
import Button from "../shared/Button";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectGeoUri, selectWaLink, selectServes } from "../../store/selectors";
import styles from './ContactSection.module.css'

export default function ContactSection() {
    const business = useSelector(selectBusiness);
    const geo = useSelector(selectGeoUri);
    const wa = useSelector(selectWaLink);
    const serves= useSelector(selectServes)

    if (!business ) return null;

    return (
        <section className="section" id="contact">
            <div className="wrap">
                <SectionHeading eyebrow="Contact" title="Get in touch"/>
                <div className={styles.cols}>
                    <ul>
                        <ContactRow icon="phone" label="Phone" value={business.phone}/>
                        <ContactRow icon="mail" label="Email" value={business.email}/>
                        <ContactRow icon="whatsapp" label="WhatsApp" value={business.whatsapp} href={wa}/>
                        <ContactRow icon="pin" label="Adress, open in map" value={business.address} href={geo.mapsUrl}/>

                    </ul>
                    <div>
                        <ul>
                            <ContactRow icon="clock" label="Trading hours" value={business.hours}/>
                            {serves &&  <ContactRow icon="truck" label="How we serve you" value={serves}/>}
                        </ul>
                        <p style={{ fontSize:14}}> Hours vary ..Message us  to confirm </p>
                        <Button variant="solid" block icon="whatsapp" onClick={() => window.open(wa, '_blank')}>
                            Message on WhatsApp

                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}