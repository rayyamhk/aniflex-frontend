import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../mui/createEmotionCache';
import { ThemeProvider } from '../hooks/useTheme';
import { AuthProvider } from '../hooks/useAuth';
import ErrorBoundary from '../components/ErrorBoundary';

const clientSideEmotionCache = createEmotionCache();

type MuiAppProps = {
  emotionCache: EmotionCache,
} & AppProps;

export default function App(props: MuiAppProps) {
  const { pageProps, Component, emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
        <ThemeProvider defaultTheme='dark'>
          <AuthProvider>
            <CssBaseline />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
    </CacheProvider>
  );
}