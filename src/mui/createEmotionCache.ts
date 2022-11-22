import createCache from '@emotion/cache';

export default function createEmotionCache() {
  if (typeof document !== 'undefined') {
    const insertionPoint = document.querySelector<HTMLElement>('meta[name="emotion-insertion-point"]');
    if (insertionPoint) return createCache({ key: 'mui-style', insertionPoint });
  }
  return createCache({ key: 'mui-style' });
}