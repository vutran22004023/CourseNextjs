import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { timeVideos } from "@/redux/Slides/timeVideoSide";

interface VideoComponentProps {
    src: string;
    title: string;
    style?: React.CSSProperties;
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const VideoComponent: React.FC<VideoComponentProps> = ({ src, title, style }) => {
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handlePlay = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                if (videoRef.current) {
                    const currentTime = videoRef.current.currentTime;
                    setCurrentTime(currentTime);
                    dispatch(
                        timeVideos({ time: formatTime(currentTime), isPlaying: true })
                    );
                }
            }, 1000);
        }
    };

    const handlePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            setCurrentTime(currentTime);
            dispatch(
                timeVideos({ time: formatTime(currentTime), isPlaying: false })
            );
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div style={style}>
            <video
                ref={videoRef}
                width="200"
                controls
                onPlay={handlePlay}
                onPause={handlePause}
                style={style}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoComponent;
