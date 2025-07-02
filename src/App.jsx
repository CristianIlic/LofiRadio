import "./App.css";
import "./index.css";
import MediaPlayer from "./components/MediaPlayer";
import TopNavbar from "./components/TopNavbar";
import LeftSidebar from "./components/LeftSidebar";
import YouTubePlayer from "./components/YouTubePlayer";
import useIsMobile from "./hooks/useIsMobile";
import { useEffect, useState } from "react";

function App() {
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const MAX_BACKGROUNDS = 4;
  const [backgroundIndex, setBackgroundIndex] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case " ": // espacio
          event.preventDefault(); // evita scroll si se quiere
          console.log("Play/Pause");
          // tu lógica de play/pause
          break;
        case "h":
          {
            setBackgroundIndex((prev) => {
              const next = prev + 1 > MAX_BACKGROUNDS ? 1 : prev + 1;
              const imagePath = `/background${next}.gif`;
              document.documentElement.style.setProperty(
                "--background",
                `url("${imagePath}")`
              );
              return next;
            });
          }
          break;
        case "g":
          {
            setBackgroundIndex((next) => {
              const prev = next - 1 < 1 ? MAX_BACKGROUNDS : next - 1;
              const imagePath = `/background${prev}.gif`;
              document.documentElement.style.setProperty(
                "--background",
                `url("${imagePath}")`
              );
              return prev;
            });
          }
          break;

        case "t":
          setHidden((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // limpieza
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <YouTubePlayer hidden={hidden} />
      {isMobile ? <TopNavbar /> : <LeftSidebar />}
      <MediaPlayer />
    </>
  );
}

export default App;
