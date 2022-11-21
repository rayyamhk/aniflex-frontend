import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from '../../atoms/Link';
import useStyle from '../../../hooks/useStyles';
import styles from './videoCard.module.css';
import Thumbnail from '../../atoms/Thumbnail';

/**
 * TODOs:
 * Add Image sizes props
 */

type VideoCardProps = {
  id: string,
  episodes: number,
  title: string,
  thumbnail: string,
  publishedAt: string,
  views: number,
};

export default function VideoCard(props: VideoCardProps) {
  const {
    id,
    episodes,
    title,
    thumbnail,
    publishedAt,
    views,
  } = props;

  const css = useStyle(styles);
  const hrefOptions = {
    pathname: '/anime/[id]/[episode]',
    query: { id, episode: 1 },
  };

  return (
    <article className={css('container')}>
      <Link href={hrefOptions}>
        <Thumbnail
          className={css('thumbnail')}
          label={`共${episodes}集`}
          thumbnail={thumbnail}
          alt={`${title}縮圖`}
          fill
          sizes="
            (min-width: 600px) 283.75px,
            600px
          "
        />
      </Link>
      <div className={css('video-info')}>
        <Link hover href={hrefOptions}>
          <h5>{title}</h5>
        </Link>
        <time dateTime={publishedAt}>{new Date(publishedAt).getFullYear()}</time>
      </div>
      <div className={css('numbers')}>
        <span className={css('views')}>
          <MdOutlineRemoveRedEye />{views}
        </span>
      </div>
    </article>
  );
}