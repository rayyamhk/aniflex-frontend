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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/videos/series?limit=8`);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/videos/metadata/episodes`);
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/videos/metadata/episodes/${id}?episode=${episode}`);
  const json = await res.json();
  if (json.status !== 'success') throw new Error(json.message);
  const metadata = json.data;
  const episodes = metadata.episodes.map((item: any) => ({
    ...item,
    thumbnail: `${process.env.NEXT_PUBLIC_API_HOST}${item.thumbnail}`,
    video: `${process.env.NEXT_PUBLIC_API_HOST}${item.video}`,
  }));
  const currentEpisode = episodes.find((item: any) => item.episode === episode);
  return {
    props: {
      id,
      episode,
      serieTitle: metadata.title,
      episodeTitle: currentEpisode.title,
      description: metadata.description,
      views: currentEpisode.views,
      publishedAt: currentEpisode.publishedAt,
      videoSrc: currentEpisode.video,
      videoThumbnailSrc: currentEpisode.thumbnail,
      tags: metadata.tags,
      episodes,
    },
  };
}