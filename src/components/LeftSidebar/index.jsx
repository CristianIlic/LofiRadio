import { useEffect, useRef, useState } from "react";
import RadioCard from "../RadioCard";
import { fetchYT } from "../../utils/fetchYT";
import { useStore } from "../../utils/store";

function LeftSidebar() {
  const [videos, setVideos] = useState([]);

  const leftWrapperRef = useRef();
  const {
    selectedVideo,
    setSelectedVideo,
    isContainerOpen,
    setIsContainerOpen,
    videoList,
    genre,
    setGenre,
  } = useStore();

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleSlide = () => {
    const container = leftWrapperRef.current;
    container.classList.remove("slide-in-horizontal");
    container.classList.remove("slide-out-horizontal");

    void container.offsetWidth;

    if (isContainerOpen) {
      container.classList.add("slide-out-horizontal");
    } else {
      container.classList.add("slide-in-horizontal");
    }
    setIsContainerOpen(!isContainerOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchYT(videoList);
      setVideos(data);
    };

    fetchData();
  }, [videoList]);

  if (videos.length === 0) return <div id="leftContainer">Cargando...</div>;
  return (
    <>
      <div id="leftWrapper" ref={leftWrapperRef}>
        <div id="leftContainer">
          <div className="genre">
            <p>Género:</p>
            <select onChange={handleGenre}>
              <option value="lofi">LoFi</option>
              <option value="hip-hop">Hip-Hop</option>
              <option value="jazz">Jazz</option>
              <option value="tech">Tech</option>
            </select>
          </div>
          <div className="videos">
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
              class="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default LeftSidebar;
