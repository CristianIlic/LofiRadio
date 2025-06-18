import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useStore } from "../../utils/store";

function YouTubePlayer() {
  const playerRef = useRef(null);
  const { hasInteracted, selectedVideo, setPlayer } = useStore();

  if (!selectedVideo) return null;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: hasInteracted ? 1 : 0,
      mute: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    event.target.playVideo();

    const iframe = event.target.getIframe();
    if (iframe) {
      iframe.setAttribute("tabindex", "-1");
    }

    setPlayer(event.target);
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
