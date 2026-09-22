"use client";

import { useRef, useState } from "react";

type Props = { src?: string };

export default function MusicButton({ src = "/music.mp3" }: Props) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  async function toggleMusic() {
    if (!audio.current || !src) return;
    if (playing) {
      audio.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio
        ref={audio}
        src={src}
        loop
        preload="auto"
        onError={() => setPlaying(false)}
      />
      <button
        type="button"
        className="music-button"
        onClick={toggleMusic}
        aria-label={playing ? "Pausar música" : "Activar música"}
      >
        {playing ? "♪ Pausar" : "♪ Música"}
      </button>
    </>
  );
}
