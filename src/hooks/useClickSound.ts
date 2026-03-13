import { useEffect, useRef, useCallback } from "react";

const CLICK_SOUND_SRC = "/assets/sounds/modern_tech.wav";
const CLICK_VOLUME = 0.2;

export const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(CLICK_SOUND_SRC);
    audio.volume = CLICK_VOLUME;
    audio.preload = "auto";

    audio.addEventListener("error", (e) => {
      console.error("useClickSound: Error loading audio", e);
    });

    audioRef.current = audio;

    return () => {
      audioRef.current = null;
    };
  }, []);

  const playClick = useCallback(() => {
    if (!audioRef.current) {
      console.warn("useClickSound: audio not initialized");
      return;
    }

    // Stop and reset to start, then play again
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.error("useClickSound: error playing audio", error);
    });
  }, []);

  return playClick;
};