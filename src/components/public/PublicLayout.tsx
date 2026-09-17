import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../shared/AppBar";
import Drawer from "../shared/Drawer";
import NavList from "../shared/NavList";
import { useBrandTheme } from "../../hooks/useBrandTheme";
import { selectBusiness } from "../../store/slices/siteSlice";
import { selectStrapline } from "../../store/selectors";
import { getPublicUrl } from "../../utils/storage";
import { selectNavOpen, openNav, closeNav} from "../../store/slices/uiSlice";
import styles from './PublicLayout.module.css'

interface NavItem {
    id: string;
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    {id: 'top', label:'Home', href:'#top'},
    {id: 'about', label:'About', href:'#about'},
    {id: 'services', label:'Services', href:'#services'},
    {id: 'gallery', label:'Gallery', href:'#gallery'},
    {id: 'contact', label:'Contact', href:'#contact'},
    
];

interface PublicLayoutProps { children: React.ReactNode }

export default function PublicLayout({children}: PublicLayoutProps){
    useBrandTheme();
    const dispatch = useDispatch();
    const business =useSelector(selectBusiness);
    const strapline= useSelector(selectStrapline)
    const navOpen = useSelector(selectNavOpen)

    if (!business) return null;

    return (
        <div id="top" className={styles.page}>
            <AppBar logo={business.logoPath ? getPublicUrl(business.logoPath) : undefined} 
            title={business.name} subtitle={strapline || undefined}
            onMenu={()=> dispatch(openNav())}/>

            <Drawer open={navOpen} onClose={() => dispatch(closeNav())}>
                <NavList items={NAV_ITEMS} onSelect={() => dispatch(closeNav())}/>

            </Drawer>

            <main>{children}</main>
        </div>
    )
}