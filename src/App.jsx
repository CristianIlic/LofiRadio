import "./App.css";
import MediaPlayer from "./components/MediaPlayer";
import LeftSidebar from "./components/LeftSidebar";
import YouTubePlayer from "./components/YouTubePlayer";

function App() {
  return (
    <>
      <YouTubePlayer />
      <LeftSidebar />
      <MediaPlayer />
    </>
  );
}

export default App;
