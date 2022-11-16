import Carousel from '../components/molecules/Carousel';
import SEO from '../components/molecules/SEO';
import VideoCard from '../components/molecules/VideoCard';
import Layout from '../components/organisms/Layout';
import useStyle from '../hooks/useStyles';
import styles from '../styles/homePage.module.css'
import { Serie } from '../types/Serie';

type HomeProps = {
  popularSeries: Serie[],
};

export default function Home(props: HomeProps) {
  const {
    popularSeries,
  } = props;

  const css = useStyle(styles);

  return (
    <Layout>
      <SEO
        title="Aniflex 動畫線上看"
        description="Aniflex 動畫線上看"
      />
      <section className={css('responsive')}>
        <Carousel
          imgUrls={[
            '/hero-0.jpeg',
            '/hero-1.jpeg',
            '/hero-2.jpeg',
          ]}
        />
      </section>
      <section className={css('responsive')}>
        <h2 className={css('title')}>熱門動畫</h2>
        <div className={css('popular-videos-container')}>
          {popularSeries.map((series) => <VideoCard {...series} key={series.id} />)}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/videos/series?limit=8`);
  const json = await res.json();
  const series = json.data.map((item: any) => ({
    ...item,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${item.thumbnail}`,
  }));
  return {
    props: {
      popularSeries: series,
    }
  }
}