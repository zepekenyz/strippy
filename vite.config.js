import {reactRouter} from '@react-router/dev/vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'import.meta.env.VITE_SHOPIFY_STORE_DOMAIN': JSON.stringify(
        env.VITE_SHOPIFY_STORE_DOMAIN || '',
      ),
      'import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN': JSON.stringify(
        env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
      ),
      'import.meta.env.VITE_SHOPIFY_API_VERSION': JSON.stringify(
        env.VITE_SHOPIFY_API_VERSION || '2026-01',
      ),
      'import.meta.env.VITE_SHOPIFY_VARIANT_ID': JSON.stringify(
        env.VITE_SHOPIFY_VARIANT_ID || '',
      ),
    },
    plugins: [hydrogen(), reactRouter()],
  };
});
