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
  fill?: boolean,
  sizes?: string,
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
    fill = false,
    sizes,
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
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder='blur'
        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/frJfwAJPgO7v0heZQAAAABJRU5ErkJggg=='
      />
      {label ? <span className={css('label')}>{label}</span> : null}
    </div>
  );
}