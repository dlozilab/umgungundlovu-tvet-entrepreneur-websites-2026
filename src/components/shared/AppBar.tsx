import React from "react"
import styles from './AppBar.module.css'
import Icon from "./Icon"

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

interface AppBarProps {
  logo?:string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  onMenu?: ()=> void;
  navItems?: NavLinkItem[];
}


export default function AppBar({ logo, title, subtitle, action, onMenu, navItems}: AppBarProps){
  return (
    <header className={styles.bar}>
      <div className={styles.brand}> 
        {logo ? (
          <img className={styles.logo} src={logo} alt="" />
        ): (
          <div className={styles.logoPlaceholder} aria-hidden="true"/>
        )}
        <span className={styles.names}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}> {subtitle}</span>}

        </span>
      </div>

      {navItems && navItems.length > 0 && (
        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} className={styles.navLink} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <div className={styles.actions}>
      {action}
      {onMenu && (
        <button className={styles.menuBtn} onClick={onMenu} aria-label="Open menu">
          <Icon name="menu"/>
        </button>
      )} </div>
    </header>
  )
}