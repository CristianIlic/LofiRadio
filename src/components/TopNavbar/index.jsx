import { useEffect, useRef, useState } from "react";
import RadioCard from "../RadioCard";
import { fetchYT } from "../../utils/fetchYT";
import { useStore } from "../../utils/store";

function TopNavbar() {
  const [videos, setVideos] = useState([]);
  const topWrapperRef = useRef();
  const {
    selectedVideo,
    setSelectedVideo,
    isContainerOpen,
    setIsContainerOpen,
    videoList,
  } = useStore();

  const handleSlide = () => {
    const container = topWrapperRef.current;
    container.classList.remove("slide-in-vertical");
    container.classList.remove("slide-out-vertical");

    void container.offsetWidth;

    if (isContainerOpen) {
      container.classList.add("slide-out-vertical");
    } else {
      container.classList.add("slide-in-vertical");
    }
    setIsContainerOpen(!isContainerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchYT(videoList);
      setVideos(data);
    };

    fetchData();
  }, []);

  if (videos.length === 0) return <div id="topContainer">Cargando...</div>;
  return (
    <>
      <div id="topWrapper" ref={topWrapperRef}>
        <div id="topContainer">
          {videos.map((video) => (
            <RadioCard
              key={video.id}
              viewers={video.viewers}
              title={video.title}
              likes={video.likes}
              channel={video.channel}
              thumbnail={video.thumbnail}
              onClick={() => setSelectedVideo(video.id)}
              className={selectedVideo === video.id ? "activeRadio" : ""}
            />
          ))}
        </div>
        <button id="openMenuButton" onClick={handleSlide}>
          {isContainerOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-arrow-down-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default TopNavbar;
