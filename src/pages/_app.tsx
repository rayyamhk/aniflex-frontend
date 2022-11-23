import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '../mui/createEmotionCache';
import ThemeProvider from '../mui/themeProvider';

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
        <ThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
    </CacheProvider>
  );
}