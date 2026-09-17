import React from "react";
import styles from './Icon.module.css'

export type IconName = 
| 'menu' | 'close' | 'whatsapp' | 'phone' | 'mail' | 'pin' |  'clock' | 'truck' | 'gear' | 'eye' | 'back' | 'signout' | 'check' | 'warn' | 'dashboard' | 'details' | 'branding' | 'about' | 'services' | 'gallery' | 'compliance' | 'help'

interface IconProps {
    name: IconName;
    size?: number
}

const paths: Record<IconName, React.ReactNode> = {
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    whatsapp: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 21l1.9-5.1A8.4 8.4 0 013.6 11 8.5 8.5 0 0112 3a8.4 8.4 0 019 8.5z"/>,
    phone: <path d ="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>,
    mail: <><path d= "M4 4h16v16H4z"/> <path d="M4 6l8 6 8-6"/></>,
    pin: <><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v513 0"/></>,
    truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></>,
    gear: (
        <>
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/>,

        </>
    ),
    eye: <> <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cy="12" cx="12" r="3"/></>,
    back: <path d="M15 18l-6-6 6-6"/>,
    signout:<><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></>,
    check: <path d="M20 6L9 17l-5-5"/>,
    warn: <><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/></>,
    dashboard: <><path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/></>,
    details: <><path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/></>,
    branding: <><circle cy="12" cx="12" r="4"/><circle cy="10" cx="9" r="1" /><circle cy="10" cx="15" r="1"/></>,
    about: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    services: <path d="M4 6h16M4 12h16M4 18h10"/>,
    gallery:<><path d="M3 5h18v14H3z"/> <circle cy="10" cx="8.5" r="1.5"/> <path d="M21 16l-5-5-6 6"/> </>,
    compliance: <><path d="M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 013.6-2.2c1 .5 1.5 1.6 1.2 2.7-.3 1-1.3 1.5-1.9 2-.3.3-.4.7-.4 1.1"/><path d="M12 17h.01"/></>
};

export default function Icon({name, size=20}: IconProps){
    return (
        <svg
        className={styles.icon} viewBox="0 0 24 24 " width={size} height={size} aria-hidden="true"
>
    {paths[name]}
</svg>    )
}