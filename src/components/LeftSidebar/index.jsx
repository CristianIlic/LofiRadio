import { useEffect, useState } from "react";
import RadioCard from "../RadioCard";
import { fetchYT } from "../../utils/fetchYT";
import { useStore } from "../../utils/store";
import YouTubePlayer from "../YouTubePlayer";

function LeftSidebar() {
  const [videos, setVideos] = useState([]);
  const { selectedVideo, setSelectedVideo } = useStore();

  useEffect(() => {
    const videoIds = ["jfKfPfyJRdk", "xORCbIptqcc", "IC38LWnquWw"];

    const fetchData = async () => {
      const data = await fetchYT(videoIds);
      setVideos(data);
    };

    fetchData();
  }, []);

  if (videos.length === 0)
    return <div className="leftContainer">Cargando...</div>;

  return (
    <div className="leftContainer">
      {videos.map((video) => (
        <RadioCard
          key={video.id}
          viewers={video.viewers}
          title={video.title}
          likes={video.likes}
          channel={video.channel}
          thumbnail={video.thumbnail}
          onClick={() => setSelectedVideo(video.id)}
        />
      ))}
    </div>
  );
}

export default LeftSidebar;
