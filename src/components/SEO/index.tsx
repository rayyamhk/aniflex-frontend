import Head from 'next/head';

type SEOProps = {
  title: string,
  description: string,
  keywords?: string,
  image?: string,
};

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    keywords,
    image,
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords ? <meta name='keywords' content={keywords} /> : null}
      <link rel='canonical' href='' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {image ? <meta property='og:image' content={image} /> : null}
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      {image ? <meta property='twitter:image' content={image} /> : null}
    </Head>
  );
}