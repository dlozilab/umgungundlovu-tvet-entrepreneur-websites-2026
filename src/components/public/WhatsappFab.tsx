import Icon from "../shared/Icon";
import { selectWaLink } from "../../store/selectors";
import styles from './WhatsappFab.module.css'
import { useSelector } from "react-redux";

export default function WhatsAppFab() {
    const wa = useSelector(selectWaLink);

    return (
        <a href={wa} className={styles.fab} target="_blank" rel="noreferrer">
            <Icon name="whatsapp"/>
            WhatsApp
        </a>
    )
}