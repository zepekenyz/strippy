import {useEffect} from 'react';
import type {ReactNode} from 'react';
import {useLocation} from 'react-router';
import {initMetaPixel, trackPageView} from '../../lib/tracking/metaPixel';

type MetaPixelProviderProps = {
  children: ReactNode;
};

export function MetaPixelProvider({children}: MetaPixelProviderProps) {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return <>{children}</>;
}
