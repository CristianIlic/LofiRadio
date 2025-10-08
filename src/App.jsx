import "./App.css";
import "./index.css";
import MediaPlayer from "./components/MediaPlayer";
import TopNavbar from "./components/TopNavbar";
import LeftSidebar from "./components/LeftSidebar";
import YouTubePlayer from "./components/YouTubePlayer";
import useIsMobile from "./hooks/useIsMobile";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { useAuthStore } from "./utils/store";
import supabase from "./api/supabase";

function App() {
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const MAX_BACKGROUNDS = 7;
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const { setUser, setUserData } = useAuthStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case " ": // espacio
          event.preventDefault(); // evita scroll si se quiere
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

  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session) {
        let { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session?.user.id);
        if (error) throw error;
        setUserData(users[0]);
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, [setUser, setUserData]);

  return (
    <>
      <YouTubePlayer hidden={hidden} />
      {isMobile ? <TopNavbar /> : <LeftSidebar />}
      <MediaPlayer />
    </>
  );
}

export default App;
