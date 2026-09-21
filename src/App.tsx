import React from 'react';
import { useSelector } from 'react-redux';
import PublicLayout from './components/public/PublicLayout';
import HeroCarousel from './components/public/HeroCarousel';
import AboutSection from './components/public/AboutSection';
import ServicesSection from './components/public/ServicesSection';
import GallerySection from './components/public/GallerySection';
import ContactSection from './components/public/ContactSection';
import SiteFooter from './components/public/SiteFooter';
import WhatsAppFab from './components/public/WhatsappFab';
// import Toast from './components/shared/Toast';
import SectionHeading from './components/shared/SectionHeading';
import Button from './components/shared/Button';
import { selectBusiness, selectSiteStatus, selectSiteError } from './store/slices/siteSlice';
import { selectStrapline } from './store/selectors';

export default function App() {
  const business = useSelector(selectBusiness);
  const siteStatus = useSelector(selectSiteStatus);
  const siteError = useSelector(selectSiteError);
  const strapline = useSelector(selectStrapline);

  if (siteStatus === 'loading') return <p style={{ padding: 24 }}>Loading…</p>;
  if (siteStatus === 'failed' || !business) {
    return <p style={{ padding: 24 }}>Could not load the site: {siteError}</p>;
  }

  return (
    <>
      <PublicLayout>
        <div className="hero">
          <HeroCarousel />
          <div className="wrap" style={{ paddingTop: 26, paddingBottom: 34 }}>
            <SectionHeading eyebrow={strapline || undefined} title={business.headline} />
            <p className="lead">{business.description}</p>
            <Button variant="solid">Get a quote</Button>
          </div>
        </div>

        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </PublicLayout>
      <SiteFooter />
      <WhatsAppFab />
      {/* <Toast /> */}
    </>
  );
}