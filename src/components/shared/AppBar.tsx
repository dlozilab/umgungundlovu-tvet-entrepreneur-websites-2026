import React from "react"
import styles from './AppBar.module.css'
import Icon from "./Icon"

interface AppBarProps {
  logo?:string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  onMenu?: ()=> void;
}


export default function AppBar({ logo, title, subtitle, action, onMenu}: AppBarProps){
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