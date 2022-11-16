import { useEffect, useRef } from 'react';
import { MediaPlayerClass } from 'dashjs';
import useStyle from '../../../hooks/useStyles';
import styles from './VideoPlayer.module.css';

type VideoPlayerProps = {
  className?: string,
  halo?: boolean
  video: string;
  thumbnail?: string;
};

export default function VideoPlayer(props: VideoPlayerProps) {
  const {
    className,
    halo = false,
    video,
    thumbnail,
  } = props;

  const css = useStyle(styles);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dashjsRef = useRef<MediaPlayerClass>();

  useEffect(() => {
    let cleanUp = () => {};
    init();

    async function init() {
      if (videoRef.current) {
        const player = await getInstance();
        player.attachView(videoRef.current);
        player.attachSource(video);
      }
    }

    async function getInstance() {
      if (dashjsRef.current) return dashjsRef.current;
      const { MediaPlayer } = await import('dashjs');
      const player = MediaPlayer().create();
      player.initialize();
      player.setAutoPlay(false);
      cleanUp = player.destroy;
      dashjsRef.current = player;
      return player;
    }

    return cleanUp;
  }, [video, videoRef.current]);

  return (
    <div className={css('video-wrapper', halo && 'halo', className)}>
      <video
        ref={videoRef}
        poster={thumbnail}
        preload='metadata'
        controls
      />
    </div>
  );
}
