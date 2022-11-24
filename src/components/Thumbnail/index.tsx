import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

type ThumbnailProps = {
  label: string,
  src: string,
  width?: number,
  height?: number,
  alt: string,
  priority?: boolean,
  rounded?: boolean,
  fill?: boolean,
  sizes?: string,
};

export default function Thumbnail(props: ThumbnailProps) {
  const {
    label,
    src,
    width,
    height,
    alt,
    priority = false,
    rounded = false,
    fill = false,
    sizes,
  } = props;

  return (
    <Box
      sx={{
        borderRadius: rounded ? 1 : 0,
        position: 'relative',
        paddingBottom: fill ? '56.25%' : undefined,
        '& > img': {
          verticalAlign: 'bottom',
          transition: 'transform 200ms linear',
        },
        '&:hover > img': {
          transform: 'scale(1.075)',
        },
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder='blur'
        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/frJfwAJPgO7v0heZQAAAABJRU5ErkJggg=='
      />
      <Typography
        variant='body1'
        sx={{
          color: 'rgba(255,255,255,0.85)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 1,
          padding: 1,
          position: 'absolute',
          bottom: (theme) => theme.spacing(1),
          right: (theme) => theme.spacing(1),
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}