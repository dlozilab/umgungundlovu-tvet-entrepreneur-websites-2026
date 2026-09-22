import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import AppBar from '../shared/AppBar';
import Drawer from '../shared/Drawer';
import NavList, { type NavItem } from '../shared/NavList';
import { useBrandTheme } from '../../hooks/useBrandTheme';
import { selectBusiness } from '../../store/slices/siteSlice';
import { signOut } from '../../store/slices/authSlice';
import { selectNavOpen, openNav, closeNav } from '../../store/slices/uiSlice';
import { getPublicUrl } from '../../utils/storage';
import styles from './CmsLayout.module.css';

const CMS_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/admin/dashboard' },
  { id: 'details', label: 'Business details', icon: 'details', href: '/admin/details' },
  { id: 'branding', label: 'Branding', icon: 'branding', href: '/admin/branding' },
  { id: 'about', label: 'About', icon: 'about', href: '/admin/about' },
  { id: 'services', label: 'Services', icon: 'services', href: '/admin/services' },
  { id: 'gallery', label: 'Gallery', icon: 'gallery', href: '/admin/gallery' },
  { id: 'contact', label: 'Contact and hours', icon: 'phone', href: '/admin/contact' },
  { id: 'compliance', label: 'Compliance', icon: 'compliance', href: '/admin/compliance' },
  { id: 'help', label: 'Help', icon: 'help', href: '/admin/help' },
];

export default function CmsLayout() {
  useBrandTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const business = useSelector(selectBusiness);
  const navOpen = useSelector(selectNavOpen);

  const activeId = location.pathname.split('/')[2] || 'dashboard';

  function goTo(id: string) {
    navigate(`/admin/${id}`);
  }

  return (
    <div className={styles.shell}>
      <AppBar
        logo={business?.logoPath ? getPublicUrl(business.logoPath) : undefined}
        title={business?.name || 'Site manager'}
        subtitle="Site manager"
        onMenu={() => dispatch(openNav())}
        action={
          <Link to="/" className={styles.viewSite}>
            View site
          </Link>
        }
      />

      <Drawer open={navOpen} onClose={() => dispatch(closeNav())} title="Admin menu">
        <NavList items={CMS_NAV} activeId={activeId} onSelect={goTo} />
        <button className={styles.signOut} onClick={() => dispatch(signOut())}>
          Sign out
        </button>
      </Drawer>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <NavList items={CMS_NAV} activeId={activeId} onSelect={goTo} />
          <button className={styles.signOut} onClick={() => dispatch(signOut())}>
            Sign out
          </button>
        </aside>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}