import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";

export const PauseIcon = () => {
  return (
    <svg
      role="img"
      height="20"
      width="20"
      aria-hidden="true"
      viewBox="0 0 16 16"
    >
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
    </svg>
  );
};

export const PlayIcon = () => {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      height="20"
      width="20"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="Svg-sc-ytk21e-0 dYnaPI"
    >
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
    </svg>
  );
};

const CurrentSong = ({ title, image, artists }) => {
  return (
    <div className="flex items-center gap-5 overflow-hidden">
      <picture>
        <img src={image} alt={title} className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden" />
      </picture>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold block">{title}</h3>
          <span className="text-sm opacity-80">
            {artists?.join(", ")}
          </span>
        </div>
    </div>
  );
};

const Player = () => {
  const { isPlaying, setIsPlaying, currentMusic } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        <CurrentSong
          title={currentMusic.song?.title}
          image={currentMusic.song?.image}
          artists={currentMusic.song?.artists}
        />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div className="grid place-content-center">Volumen</div>
      <audio ref={audioRef}></audio>
    </div>
  );
};

export default Player;
