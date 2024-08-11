import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useDispatch } from "react-redux";
import { timeVideos } from '@/redux/Slides/timeVideoSide';

interface YouTubeComponentProps {
  src: string;
  title: string;
  style?: React.CSSProperties;
}

const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|youtube.com\/shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const VideoYoutubeComponent: React.FC<YouTubeComponentProps> = ({ src, title, style }) => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoId = extractVideoId(src);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const currentTime = playerRef.current.getCurrentTime();
          setCurrentTime(currentTime);
          dispatch(timeVideos({ time: formatTime(currentTime), isPlaying: true }));
        }, 1000);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (event.data === YouTube.PlayerState.PAUSED || event.data === YouTube.PlayerState.ENDED) {
        const currentTime = playerRef.current.getCurrentTime();
        setCurrentTime(currentTime);
        dispatch(timeVideos({ time: formatTime(currentTime), isPlaying: false }));
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onStateChange={onStateChange}
        opts={{
          ...style,
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  );
};

export default VideoYoutubeComponent;
