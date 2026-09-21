import Icon, {type IconName} from '../shared/Icon'
import styles from './ContactRow.module.css'

interface ContactRowProps {
    icon: IconName;
    label: string;
    value: string;
    href?: string;


}

export default function ContactRow({icon, label, value, href}: ContactRowProps) {
    const content = (
        <>
        <Icon name={icon}/> <span>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
</span>

        </>
    )

    return (
        <li className={styles.row}>
            {href ? (
                <a className={styles.link} href={href}>{content}</a>
            ) : (
                content
            )}
        </li>
    )
}