import React, {useEffect} from "react"
import Icon from "./Icon"
import styles from './Drawer.module.css'

interface DrawerProps {
    open: boolean;
    onClose: ()=> void;
    title?:string;
    children: React.ReactNode
}

export default function Drawer({
    open, onClose, title = "Menu",  children
}: DrawerProps) {
    useEffect(()=> {
        function onKey(e:KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose])


    return (<>
        <div className={styles.scrim} onClick={onClose} data-open={open} aria-hidden="true"/>
            <aside className={styles.drawer} data-open={open} aria-label={title}>
                <div className={styles.head}>
                    <span className={styles.title}> {title}</span>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close Menu">
                        <Icon name="close"/>
                    </button>
                </div>
                <nav className={styles.body}>{children}</nav>
            </aside> 
            </>    
     
    )
}
