import { Link } from 'react-router-dom';
import Icon, { type IconName } from './Icon';
import styles from './NavList.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: IconName;
  href?: string; // "#section" → in-page anchor; "/admin/x" → app route via Link
}

interface NavListProps {
  items: NavItem[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export default function NavList({ items, activeId, onSelect }: NavListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const className = `${styles.item} ${item.id === activeId ? styles.active : ''}`;
        const content = (
          <>
            {item.icon && <Icon name={item.icon} size={18} />}
            {item.label}
          </>
        );

        // Public nav: real anchor, browser handles the scroll natively.
        if (item.href?.startsWith('#')) {
          return (
            <li key={item.id}>
              <a className={className} href={item.href} onClick={() => onSelect(item.id)}>
                {content}
              </a>
            </li>
          );
        }

        // Admin nav: an app route. Link, not <a> — client-side navigation.
        if (item.href) {
          return (
            <li key={item.id}>
              <Link className={className} to={item.href} onClick={() => onSelect(item.id)}>
                {content}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.id}>
            <button className={className} onClick={() => onSelect(item.id)}>
              {content}
            </button>
          </li>
        );
      })}
    </ul>
  );
}