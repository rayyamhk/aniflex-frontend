import type { AppProps } from 'next/app';
import '../styles/normalize.css';
import '../styles/global.css';
import '../styles/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
