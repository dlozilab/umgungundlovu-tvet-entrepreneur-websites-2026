// import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicLayout from './components/public/PublicLayout';
import HeroCarousel from './components/public/HeroCarousel';
import AboutSection from './components/public/AboutSection';
import ServicesSection from './components/public/ServicesSection';
import GallerySection from './components/public/GallerySection';
import ContactSection from './components/public/ContactSection';
import SiteFooter from './components/public/SiteFooter';
import WhatsAppFab from './components/public/WhatsappFab';
import MetaTags from './components/shared/MegaTags';
// import Toast from './components/shared/Toast';
import Button from './components/shared/Button';
import LoginPage from './pages/AdminLoginPage';
import CmsLayout from './components/cms/CmsLayout';
import DashboardPage from './pages/admin/DashboardPage';
import BusinessDetailsPage from './pages/admin/BusinessDetailsPage';
import AboutPage from './pages/admin/AboutPage';
import ContactPage from './pages/admin/ContactPage';
import CompliancePage from './pages/admin/CompliancePage';
import ComingSoonPage from './pages/admin/ComingSoonPage';
import RequireAuth from './routes/RequireAuth';
import { selectBusiness, selectSiteStatus, selectSiteError } from './store/slices/siteSlice';
import { selectStrapline } from './store/selectors';

function PublicSite() {
  const business = useSelector(selectBusiness);
  const siteStatus = useSelector(selectSiteStatus);
  const siteError = useSelector(selectSiteError);
  const strapline = useSelector(selectStrapline);
  const ServicesPage = lazy(() => import('./pages/admin/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/admin/GalleryPage'));
const BrandingPage = lazy(() => import('./pages/admin/BrandingPage'));
const HelpPage = lazy(() => import('./pages/admin/HelpPage'));

  if (siteStatus === 'loading') return <p style={{ padding: 24 }}>Loading…</p>;
  if (siteStatus === 'failed' || !business) {
    return <p style={{ padding: 24 }}>Could not load the site: {siteError}</p>;
  }

  return (
    <>
      <MetaTags />
      <PublicLayout>
        <div className="hero">
          <div className="hero-wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow hero-kicker">{strapline || 'Built to last'}</p>
                <h1 className="hero-title">{business.headline}</h1>
                <p className="lead hero-lead">{business.description}</p>
                <div className="hero-cta">
                  <Button variant="solid">Get a quote</Button>
                </div>
              </div>
              <HeroCarousel />
            </div>
          </div>
        </div>
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </PublicLayout>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <CmsLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="details" element={<BusinessDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="branding" element={<BrandingPage />} />
<Route path="services" element={<ServicesPage />} />
<Route path="gallery" element={<GalleryPage />} />
<Route path="help" element={<HelpPage />} />
          {/* branding, services, gallery, help: Sprint 4 */}
          <Route path="*" element={<ComingSoonPage />} />
        </Route>
      </Routes>
      {/* <Toast /> */}
    </>
  );
}