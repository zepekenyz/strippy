import {useEffect} from 'react';
import type {ReactNode} from 'react';
import {useLocation} from 'react-router';
import {
  ensureMetaClickCookies,
  initMetaPixel,
  trackPageView,
} from '../../lib/tracking/metaPixel';

type MetaPixelProviderProps = {
  children: ReactNode;
};

export function MetaPixelProvider({children}: MetaPixelProviderProps) {
  const location = useLocation();

  useEffect(() => {
    ensureMetaClickCookies();
    initMetaPixel();
  }, []);

  useEffect(() => {
    ensureMetaClickCookies();
    initMetaPixel();
    trackPageView(location.pathname);
  }, [location.pathname, location.search]);

  return <>{children}</>;
}
