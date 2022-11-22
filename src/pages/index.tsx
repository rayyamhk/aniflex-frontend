import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import ResponsiveContainer from '../components/ResponsiveContainer';
import SEO from '../components/SEO';
import VideoCard from '../components/VideoCard';
import { Serie } from '../types';
import hero0 from '../static/images/hero-0.jpeg';
import hero1 from '../static/images/hero-1.jpeg';
import hero2 from '../static/images/hero-2.jpeg';

type HomeProps = {
  popularSeries: Serie[],
};

export default function Home(props: HomeProps) {
  const {
    popularSeries,
  } = props;

  return (
    <Layout>
      <SEO
        title="Aniflex 動畫線上看"
        description="Aniflex 動畫線上看"
      />
      <ResponsiveContainer>
        <Carousel
          imgs={[
            hero0,
            hero1,
            hero2,
          ]}
        />
        <Typography variant='h2' sx={{ mt: 6, mb: 2 }}>熱門動畫</Typography>
        {popularSeries.length > 0 ? (
          <Grid container spacing={2}>
            {popularSeries.map((series) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={series.id}>
                <VideoCard {...series} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='body2'>暫時沒有</Typography>
        )}
      </ResponsiveContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  if (!process.env.API_KEY) {
    throw new Error('Missing API key.');
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/series?limit=8`, {
      headers: { 'x-api-key': process.env.API_KEY },
    });
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
  } catch (err) {
    return {
      props: {
        popularSeries: [],
      },
    };
  }
}