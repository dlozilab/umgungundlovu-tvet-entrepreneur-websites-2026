import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectBusiness } from '../store/slices/siteSlice';
import { getPublicUrl } from '../utils/storage';

export function useFavicon() {
  const business = useSelector(selectBusiness);

  useEffect(() => {
    const href = getPublicUrl(business?.logoPath || '') || 'data:,';
    document.getElementById('meta-favicon')?.setAttribute('href', href);
    document.getElementById('meta-apple-touch')?.setAttribute('href', href);
  }, [business?.logoPath]);
}
