import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { useStore } from "../../utils/store";

function YouTubePlayer({ hidden }) {
  const playerRef = useRef(null);
  const {
    hasInteracted,
    isContainerOpen,
    selectedVideo,
    setPlayer,
    isBackgroundEnabled,
    setVideoTitle,
    lastVolume,
  } = useStore();

  useEffect(() => {
    const wrapper = document.getElementsByClassName("iframeWrapper")[0];
    if (wrapper) {
      wrapper.style.opacity = isContainerOpen ? 0.1 : 0.7;
    }
  }, [isContainerOpen]);

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
    event.target.setVolume(lastVolume);
    const iframe = event.target.getIframe();
    if (iframe) {
      iframe.setAttribute("tabindex", "-1");
    }

    setPlayer(event.target);
    setVideoTitle(event.target.videoTitle);
  };

  return (
    <div className={`ytCustomPlayer ${hidden ? "hidden" : ""}`}>
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
