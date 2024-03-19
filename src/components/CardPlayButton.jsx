import { PauseIcon } from "./Player";
import { PlayIcon } from "./Player";
import { usePlayerStore } from "@/store/playerStore.js"; // <-- estado global

const CardPlayButton = ({ id, size="small" }) => {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { playlist, songs } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, song: songs[0], songs });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-6 h-6";

  return (
    <button
      className="card-play-button
       bg-green-500 rounded-full p-4 
      hover:scale-105 transition hover:bg-green-400"
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <PauseIcon className={iconClassName} /> : <PlayIcon className={iconClassName}/>}
    </button>
  );
};

export default CardPlayButton;
