import Icon, { type IconName } from "./Icon";
import styles from './NavList.module.css'



export interface NavItem {
    id: string;
    icon?:IconName;
    label: string;
    href: string;

}
interface NavListProps {
    items: NavItem[];
    activeId?: string;
    onSelect: (id: string) =>void
}

export default function NavList({items, onSelect, activeId }: NavListProps) {
    return (
        <ul className={styles.list}>
            {items.map((item) =>(
                <li key={item.id}>
                    {item.href ? (
                        <a
                            className={`${styles.item} ${item.id === activeId ? styles.active : ''}`}
                            href={item.href}
                            onClick={() => onSelect(item.id)}
                        >
                            {item.icon && <Icon name={item.icon} size={18} />}
                            {item.label}
                        </a>
                    ): (
                        <button
                            className={`${styles.item} ${item.id === activeId ? styles.active : ''}`}
                            onClick={() => onSelect(item.id)}
                        >
                            {item.icon && <Icon name={item.icon} size={18} />}
                            {item.label}
                        </button>
                    )}
                </li>
            ))}
        </ul>
        
    )
}

