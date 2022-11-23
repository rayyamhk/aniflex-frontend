import { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';
import styled from '@mui/material/styles/styled';
import 'video.js/dist/video-js.css';

type VideoPlayerProps = {
  id: string,
  episode: number,
  className?: string,
  thumbnail: string,
  video: string,
};

// Avoid Core Web Vital CLS
const VideoWrapper = styled('div')({
  paddingBottom: '56.25%',
  position: 'relative',
});

const VideoContainer = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export default function VideoPlayer(props: VideoPlayerProps) {
  const {
    id,
    episode,
    className,
    thumbnail,
    video,
  } = props;
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

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/episodes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, episode }),
    });
  }, [id, episode]);

  return (
    <VideoWrapper className={className} data-vjs-player>
      <VideoContainer ref={containerRef} />
    </VideoWrapper>
  );
}
