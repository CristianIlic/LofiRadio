import React from "react";
import { useStore } from "../../utils/store";
import { truncateText } from "../../utils/functions";
import useIsMobile from "../../hooks/useIsMobile";

function MediaPlayer() {
  const {
    playVideo,
    pauseVideo,
    unmuteVideo,
    lastVolume,
    setVolume,
    isPlaying,
    isMuted,
    videoTitle,
    prevVideo,
    nextVideo,
  } = useStore();

  const isMobile = useIsMobile();
  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value);
    setVolume(value);
  };

  const truncText = videoTitle ? truncateText(videoTitle, 35) : "";

  return (
    <div className="mediaContainer">
      <div className="buttons">
        <button className="media-button" onClick={prevVideo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            class="bi bi-skip-backward-fill"
            viewBox="0 0 16 16"
          >
            <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5" />
          </svg>
        </button>
        {isPlaying ? (
          <button className="media-button" onClick={pauseVideo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-pause-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5" />
            </svg>
          </button>
        ) : (
          <button className="media-button" onClick={playVideo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
            </svg>
          </button>
        )}

        <button className="media-button" onClick={nextVideo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            class="bi bi-skip-forward-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>

        {!isMobile &&
          (isMuted ? (
            <button className="media-button" onClick={unmuteVideo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                class="bi bi-volume-mute-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0" />
              </svg>
            </button>
          ) : (
            <input
              className="media-button"
              type="range"
              min="0"
              max="100"
              value={lastVolume}
              onChange={handleVolumeChange}
              style={{ width: "60px" }}
            />
          ))}
      </div>
      <div className="videoTitle">
        <p>{truncText || ""}</p>
      </div>
    </div>
  );
}

export default MediaPlayer;
