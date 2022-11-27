import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '../Link';
import Thumbnail from '../Thumbnail';
import useTheme from '../../hooks/useTheme';
import useTranslate from '../../hooks/useTranslate';

type VideoCardProps = {
  id: string,
  episodes: number,
  title: string,
  thumbnail: string,
  publishedAt: string,
  views: number,
};

const Views = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: theme.spacing(2),
  bottom: theme.spacing(3),
  '& svg': {
    marginRight: theme.spacing(0.5),
  },
}));

export default function VideoCard(props: VideoCardProps) {
  const {
    id,
    episodes,
    title,
    thumbnail,
    publishedAt,
    views,
  } = props;

  const hrefOptions = {
    pathname: '/anime/[id]/[episode]',
    query: {
      id,
      episode: 1,
    },
  };

  const [theme] = useTheme();
  const translate = useTranslate();
  const isDarkMode = theme === 'dark';

  return (
    <Card
      elevation={isDarkMode ? 3 : 0}
      variant={isDarkMode ? 'elevation' : 'outlined'}
    >
      <CardActionArea>
        <Link
          href={hrefOptions}
          underline='none'
        >
          <Thumbnail
            label={translate('serie-thumbnail-label', { count: episodes })}
            src={thumbnail}
            alt={translate('serie-thumbnail-alt', { title })}
            fill
            sizes='
              (min-width: 600px) 283.75px,
              600px
            '
          />
        </Link>
      </CardActionArea>
      <CardContent sx={{ position: 'relative' }}>
        <Link
          href={hrefOptions}
          underline='none'
        >
          <Typography
            variant='h4'
            sx={{ color: 'text.primary' }}
          >
            {title}
          </Typography>
        </Link>
        <Typography
          variant='caption'
          component='time'
          sx={{ color: 'text.secondary' }}
          dateTime={publishedAt}
        >
          {new Date(publishedAt).getFullYear()}
        </Typography>
        <Views>
          <RemoveRedEyeIcon fontSize='inherit' />
          {views}
        </Views>
      </CardContent>
    </Card>
  );
}