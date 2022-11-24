import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Layout from '../../../components/Layout';
import Link from '../../../components/Link';
import ResponsiveContainer from '../../../components/ResponsiveContainer';
import SEO from '../../../components/SEO';
import VideoCard from '../../../components/VideoCard';
import VideoEpisodeCard from '../../../components/VideoEpisodeCard';
import VideoPlayer from '../../../components/VideoPlayer';
import {
  Episode,
  Response,
  Serie,
} from '../../../types';
import useTranslate from '../../../hooks/useTranslate';

const EpisodesContainer = styled('ol')(({ theme }) => ({
  padding: 0,
  margin: 0,
  marginTop: theme.spacing(2),
  maxHeight: '300px',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  [theme.breakpoints.up('md')]: {
    maxHeight: '600px',
    marginTop: theme.spacing(0),
  },
  [theme.breakpoints.up('lg')]: {
    maxHeight: '700px',
  },
}));

const EpisodeWrapper = styled('li')({
  listStyleType: 'none',
  marginBottom: '10px',
});

const MemoizedPopularSeries = React.memo(PopularSeries);

type AnimePageProps = {
  id: string,
  episode: number,
  serieTitle: string,
  episodeTitle: string,
  description: string,
  publishedAt: string,
  views: number,
  videoSrc: string,
  videoThumbnailSrc: string,
  episodes: Episode[],
  tags?: number[],
}

export default function AnimePage(props: AnimePageProps) {
  const {
    id,
    episode,
    serieTitle,
    episodeTitle,
    description,
    publishedAt,
    views,
    videoSrc,
    videoThumbnailSrc,
    episodes,
    tags,
  } = props;

  const [popularSeries, setPopularSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  const translate = useTranslate();

  // popular series only fetched once
  useEffect(() => {
    fetchPopularSeries();
    async function fetchPopularSeries() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/series?limit=8`);
        const json = await res.json() as Response;
        if (json.status !== 'success') return;
        const series = json.data as Serie[];
        setPopularSeries([...series, ...series, ...series, ...series]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const title = `${serieTitle}[${episode}]: ${episodeTitle}`;

  const renderTags = () => {
    if (!tags) return null;
    return (
      <Box sx={{ mt: 2 }}>
        {tags.map((tag, pos) => (
          <Link
            key={pos}
            href={{ pathname: `/search?tag=${tag}` }}
            underline='none'
            sx={{
              mr: 1,
              fontSize: 'caption.fontSize',
              color: 'info.main',
            }}
          >
            {`#${tag}`}
          </Link>
        ))}
      </Box>
    );
  }

  const renderPublishedTime = () => {
    const date = new Date(publishedAt);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return (
      <Typography
        component='time'
        variant='caption'
        dateTime={publishedAt}
        sx={{ color: 'text.secondary', mr: 1 }}
      >
        {`${yyyy}.${mm}.${dd}`}
      </Typography>
    );
  }

  const renderEpisodes = () => (
    <EpisodesContainer>
      {episodes.map((item) => (
        <EpisodeWrapper key={`${id}_${item.episode}`}>
          <VideoEpisodeCard
            {...item}
            isActive={item.episode === episode}
          />
        </EpisodeWrapper>
      ))}
    </EpisodesContainer>
  );

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        keywords=""
        image={videoThumbnailSrc}
      />
      <ResponsiveContainer>
        <Grid container spacing='10px'>
          <Grid item xs={12} md={8} lg={9}>
            <VideoPlayer
              id={id}
              episode={episode}
              video={videoSrc}
              thumbnail={videoThumbnailSrc}
            />
            {renderTags()}
            <Typography variant='h1'>
              {title}
            </Typography>
            {renderPublishedTime()}
            <Typography
              variant='caption'
              component='span'
              sx={{ color: 'text.secondary' }}
            >
              {translate('views')}: {views}
            </Typography>
            <Typography
              variant='body2'
              sx={{ mt: 1 }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={3} component='aside'>
            {renderEpisodes()}
          </Grid>
        </Grid>
        <Typography variant='h2' sx={{ mt: 6, mb: 2 }}>{translate('popular-animes')}</Typography>
        <MemoizedPopularSeries
          loading={loading}
          series={popularSeries}
        />
      </ResponsiveContainer>
    </Layout>
  );
}

export async function getStaticPaths() {
  if (!process.env.API_KEY) {
    throw new Error('Missing API key.');
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/episodes`, {
      headers: { 'x-api-key': process.env.API_KEY },
    });
    const json = await res.json();
    if (json.status !== 'success') throw new Error(json.message);
    const episodes = json.data as Episode[];
    const paths: { params: any, locale: string }[] = [];
    episodes.forEach(({ id, episode }) => {
      paths.push({ params: { id, episode: episode.toString() }, locale: 'en-US' });
      paths.push({ params: { id, episode: episode.toString() }, locale: 'zh-HK' });
    });
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context: any) {
  const id = context.params?.id;
  const episode = Number(context.params?.episode);
  try {
    const episodeRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/episodes/${id}`);
    const episodeBody = await episodeRes.json();
    if (episodeBody.status !== 'success') throw new Error(episodeBody.message);
    const episodes = episodeBody.data as Episode[];
    const formattedEpisoded = episodes.map((episode) => ({
      ...episode,
      video: `${process.env.NEXT_PUBLIC_API_HOST}${episode.video}`,
      thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${episode.thumbnail}`,
    }));
    const currentEpisode = formattedEpisoded.find((item: any) => item.episode === episode);
    if (!currentEpisode) throw new Error('Episode does not exist.');
    const serieRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/series/${id}`);
    const serieBody = await serieRes.json();
    if (serieBody.status !== 'success') throw new Error(serieBody.message);
    const serie = serieBody.data as Serie;
    return {
      props: {
        id,
        episode,
        serieTitle: serie.title,
        episodeTitle: currentEpisode.title,
        description: serie.description,
        views: currentEpisode.views,
        publishedAt: currentEpisode.publishedAt,
        videoSrc: currentEpisode.video,
        videoThumbnailSrc: currentEpisode.thumbnail,
        tags: serie.tags || [],
        episodes: formattedEpisoded,
      },
    };
  } catch (err) {
    return { notFound: true }
  }
}

function PopularSeries({ loading, series }: { loading: boolean, series: Serie[] }) {
  const translate = useTranslate();
  if (loading) {
    return (
      <Grid container spacing={2}>
        {[0,1,2,3,4,5,6,7].map((i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card elevation={3} sx={{ paddingBottom: '56.25%', borderRadius: 1 }} />
          </Grid>
        ))}
      </Grid>
    )
  }
  if (series.length > 0) {
    return (
      <Grid container spacing={2}>
        {series.map((serie, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <VideoCard
              {...serie}
              thumbnail={`${process.env.NEXT_PUBLIC_API_HOST}${serie.thumbnail}`}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return <Typography variant='body2'>{translate('no-results')}</Typography>
}