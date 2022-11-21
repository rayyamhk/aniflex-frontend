import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';
import useStyle from '../../../hooks/useStyles';
import styles from './VideoPlayer.module.css';

type VideoPlayerProps = {
  id: string,
  episode: number,
  className?: string,
  thumbnail: string,
  video: string,
  halo?: boolean
};

export default function VideoPlayer(props: VideoPlayerProps) {
  const {
    id,
    episode,
    className,
    thumbnail,
    video,
    halo,
  } = props;
  const css = useStyle(styles);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer>();

  useEffect(() => {
    if (!containerRef.current) return;
    if (!playerRef.current) { 
      const videlEle = document.createElement('video-js');
      videlEle.className = 'vjs-big-play-centered';
      containerRef.current.appendChild(videlEle);
      playerRef.current = videojs(videlEle, {
        aspectRatio: '16:9',
        autoplay: false,
        controls: true,
        controlBar: {
          pictureInPictureToggle: true,
          playbackRateMenuButton: true,
          progressControl: true,
        },
        fluid: true,
        loop: false,
        preload: 'metadata',
        playbackRates: [0.25, 0.5, 1, 1.5, 2],
        userActions: {
          hotkeys: function(e) {
            const player = playerRef.current;
            if (!player) return;
            switch (e.code) {
              case 'ArrowRight':
                e.preventDefault();
                player.currentTime(player.currentTime() + 10);
                break;
              case 'ArrowLeft':
                e.preventDefault();
                player.currentTime(player.currentTime() - 10);
                break;
              case 'ArrowUp':
                e.preventDefault();
                player.volume(player.volume() + 0.1);
                break;
              case 'ArrowDown':
                e.preventDefault();
                player.volume(player.volume() - 0.1);
                break;
              case 'KeyM':
                e.preventDefault();
                player.muted(!player.muted());
                break;
              case 'Space':
                e.preventDefault();
                player.paused() ? player.play() : player.pause();
                break;
            }
          },
        },
        nativeControlsForTouch: true,
        html5: {
          // disable native hls on non-safari browser.
          vls: {
            overrideNative: !videojs.browser.IS_SAFARI,
          },
          nativeAudioTracks: videojs.browser.IS_SAFARI,
          nativeVideoTracks: videojs.browser.IS_SAFARI,
        },
      });
    }
    playerRef.current.src(video);
    playerRef.current.poster(thumbnail);
  }, [thumbnail, video, containerRef, playerRef]);

  return (
    <div className={css(className, halo && 'halo', 'video-wrapper')} data-vjs-player>
      <div ref={containerRef} />
    </div>
  );
}
