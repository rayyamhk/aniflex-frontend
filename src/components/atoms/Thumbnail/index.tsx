import Image from 'next/image';
import useStyle from '../../../hooks/useStyles';
import styles from './thumbnail.module.css';

type ThumbnailProps = {
  className?: string,
  label?: string,
  thumbnail: string,
  width?: number,
  height?: number,
  alt: string,
  priority?: boolean,
};

export default function Thumbnail(props: ThumbnailProps) {
  const {
    className,
    label,
    thumbnail,
    width,
    height,
    alt,
    priority = false,
  } = props;

  const css = useStyle(styles);

  return (
    <div className={css(className, 'thumbnail-wrapper')}>
      <Image
        className={css('thumbnail')}
        src={thumbnail}
        alt={alt}
        width={width}
        height={height}
        fill={width && height ? false : true}
        sizes={width && height ? undefined : "100vw"}
        priority={priority}
      />
      {label ? <span className={css('label')}>{label}</span> : null}
    </div>
  );
}