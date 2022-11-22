import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import createEmotionCache from '../mui/createEmotionCache';

export default function MyDocument(props: { emotionStyleTags: JSX.Element[] }) {
  return (
    <Html>
      <Head lang='zh-Hant'>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='48x48' href='/favicon.ico' />
        <meta name='emotion-insertion-point' content='' />
        {props.emotionStyleTags}
      </Head>
      <body className='dark-theme'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
  });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
}