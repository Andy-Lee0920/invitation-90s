"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    const handleScroll = () => {
      if (!isScrolled && audioRef.current) {
        setIsScrolled(true);
        audioRef.current.volume = 0.3;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("자동 재생 차단됨:", err));
      }
    };

    window.addEventListener("scroll", handleScroll, { once: true });
  }, [isScrolled]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("오디오 재생 오류:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 p-2 rounded-lg ">
      <audio ref={audioRef} src="/cut_bgm.mp3" loop autoPlay />
      <button
        onClick={togglePlay}
        className="w-5 h-5 flex items-center justify-center rounded-full text-white text-2xl "
      >
        {isPlaying ? "||" : "▶"}
      </button>
    </div>
  );
}
