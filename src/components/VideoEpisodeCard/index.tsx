import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '../Link';
import Thumbnail from '../Thumbnail';

const Views = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(0.5),
  },
}));

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

  const hrefOptions = {
    pathname: '/anime/[id]/[episode]',
    query: { id, episode },
  };

  const date = new Date(publishedAt);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return (
    <Card elevation={isActive ? 5 : 0}>
      <CardActionArea>
        <Link
          href={hrefOptions}
          underline='none'
          sx={{ display: 'flex' }}
        >
          <Box sx={{ flex: '0 0 150px' }}>
            <Thumbnail
              label={`第${episode}集`}
              src={thumbnail}
              width={150}
              height={84.375}
              alt={`第${episode}集縮圖`}
              rounded
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              px: '15px',
              py: '5px',
            }}
          >
            <Typography
              component='time'
              variant='caption'
              dateTime={publishedAt}
              sx={{ color: 'text.secondary' }}
            >
              {`${yyyy}.${mm}.${dd}`}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'text.primary',
                mb: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                lineClamp: 2,
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
            <Views>
              <RemoveRedEyeIcon fontSize='inherit' />
              {views}
            </Views>
          </Box>
        </Link>
      </CardActionArea>
    </Card>
  );
}