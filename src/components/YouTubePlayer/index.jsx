import React, { useRef } from "react";
import YouTube from "react-youtube";
import { useStore } from "../../utils/store";

function YouTubePlayer({ video }) {
  const playerRef = useRef(null);
  const { selectedVideo } = useStore();

  if (!selectedVideo) return null;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    event.target.playVideo();
  };

  const handlePlay = () => {
    playerRef.current?.playVideo();
  };

  const handlePause = () => {
    playerRef.current?.pauseVideo();
  };

  const handleMute = () => {
    playerRef.current?.mute();
  };

  const handleUnmute = () => {
    playerRef.current?.unMute();
  };

  return (
    <div className="ytCustomPlayer">
      <YouTube
        videoId={selectedVideo}
        opts={opts}
        onReady={onReady}
        className="iframeWrapper"
      />
    </div>
  );
}

export default YouTubePlayer;
