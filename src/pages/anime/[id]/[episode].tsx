import { useEffect, useState } from 'react';
import useStyle from '../../../hooks/useStyles';
import Layout from '../../../components/organisms/Layout';
import SEO from '../../../components/molecules/SEO';
import Chip from '../../../components/atoms/Chip';
import VideoPlayer from '../../../components/molecules/VideoPlayer';
import VideoEpisodeCard from '../../../components/molecules/VideoEpisodeCard';
import VideoCard from '../../../components/molecules/VideoCard';
import styles from '../../../styles/animePage.module.css';
import { Episode } from '../../../types/Episode';
import { Response } from '../../../types/Response';
import { Serie } from '../../../types/Serie';

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

  const css = useStyle(styles);
  const [popularSeries, setPopularSeries] = useState<Serie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPopularSeries();
    async function fetchPopularSeries() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/series?limit=8`);
        const json = await res.json() as Response;
        if (json.status !== 'success') return;
        const series = json.data as Serie[];
        setPopularSeries(series);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [id, episode]);

  const title = `${serieTitle}[${episode}]: ${episodeTitle}`;

  const renderTags = () => {
    if (!tags) return null;
    return (
      <div className={css('tags')}>
        {tags.map((tag, pos) => <Chip key={pos} path={`/search?tag=${tag}`}>{`#${tag}`}</Chip>)}
      </div>
    );
  }

  const renderPublishedTime = () => {
    const date = new Date(publishedAt);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    return <time dateTime={publishedAt}>{`${yyyy}.${mm}.${dd}`}</time>
  }

  const renderEpisodes = () => (
    <ol>
      {episodes.map((item) => (
        <li key={`${id}_${item.episode}`}>
          <VideoEpisodeCard
            {...item}
            isActive={item.episode === episode}
          />
        </li>
      ))}
    </ol>
  )

  const renderPopularSeries = () => {
    if (loading) {
      return [1,2,3,4,5,6,7,8].map((i) => <div key={i} className={css('video-card-placeholder')} />);
    }
    if (popularSeries.length > 0) {
      return popularSeries.map((serie) => (
        <VideoCard
          {...serie}
          key={serie.id}
          thumbnail={`${process.env.NEXT_PUBLIC_API_HOST}${serie.thumbnail}`}
        />
      ));
    }
    return <p>暫時沒有</p>
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        keywords=""
        image={videoThumbnailSrc}
      />
      <div className={css('responsive', 'grid')}>
        <VideoPlayer
          id={id}
          episode={episode}
          className={css('video-wrapper')}
          halo
          video={videoSrc}
          thumbnail={videoThumbnailSrc}
        />
        <div className={css('video-info')}>
          {renderTags()}
          <h1>{title}</h1>
          {renderPublishedTime()}
          <span className={css('views')}>觀看次數: {views}</span>
          <p>{description}</p>
        </div>
        <aside className={css('episodes-wrapper')}>
          {renderEpisodes()}
        </aside>
      </div>
      <section className={css('responsive', 'popular-videos-wrapper')}>
        <h2>熱門動畫</h2>
        <div className={css('popular-videos-container')}>
          {renderPopularSeries()}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  if (!process.env.API_KEY) {
    throw new Error('Missing API key.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/episodes`, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message);
  const episodes = json.data as any[];
  return {
    paths: episodes.map(({ id, episode }) => ({
      params: {
        id,
        episode: episode.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const id = context.params?.id;
  const episode = Number(context.params?.episode);
  const episodeRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/episodes/${id}`);
  const episodeBody = await episodeRes.json();
  if (episodeBody.status !== 'success') throw new Error(episodeBody.message);
  const episodes = episodeBody.data.map((episode: any) => ({
    ...episode,
    video: `${process.env.NEXT_PUBLIC_API_HOST}${episode.video}`,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${episode.thumbnail}`,
  }));
  const currentEpisode = episodes.find((item: any) => item.episode === episode);

  const serieRes = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/series/${id}`);
  const serieBody = await serieRes.json();
  if (serieBody.status !== 'success') throw new Error(serieBody.message);
  const serie = serieBody.data;
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
      tags: serie.tags,
      episodes,
    },
  };
}