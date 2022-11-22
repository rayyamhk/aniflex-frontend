import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline, GlobalStyles } from '@mui/material';
import createEmotionCache from '../mui/createEmotionCache';
import theme from '../mui/theme';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '::-webkit-scrollbar': {
              width: '7.5px',
            },
            '::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.background.default,
            },
            '::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.action.focus,
              borderRadius: '999px',
            },
            '::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme.palette.action.disabled,
            }
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}