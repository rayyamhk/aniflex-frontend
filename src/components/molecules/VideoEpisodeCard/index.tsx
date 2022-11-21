import Link from '../../atoms/Link';
import useStyle from '../../../hooks/useStyles';
import styles from './videoEpisodeCard.module.css';
import Thumbnail from '../../atoms/Thumbnail';

type VideoCardProps = {
  id: string,
  isActive: boolean,
  episode: number,
  title: string,
  thumbnail: string,
  publishedAt: string,
  views: number,  
};

export default function VideoEpisodeCard(props: VideoCardProps) {
  const {
    id,
    isActive,
    episode,
    title,
    thumbnail,
    publishedAt,
    views,
  } = props;

  const css = useStyle(styles);

  const hrefOptions = {
    pathname: '/anime/[id]/[episode]',
    query: { id, episode },
  };

  const date = new Date(publishedAt);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return (
    <Link href={hrefOptions}>
      <article className={css('container', isActive && 'active')}>
        <Thumbnail
          className={css('thumbnail')}
          label={`第${episode}集`}
          thumbnail={thumbnail}
          width={150}
          height={84.375}
          alt={`第${episode}集縮圖`}
        />
        <div className={css('metadata')}>
          <time dateTime={publishedAt}>{`${yyyy}.${mm}.${dd}`}</time>
          <h5 className={css('title')}>{title}</h5>
          <span className={css('views')}>
            {views}
          </span>
        </div>
      </article>
    </Link>
  );
}