import { useContext, useEffect, useRef } from 'react';
import { PoemContext } from './PoemContext';

type SoundManagerProps = {
  musicStarted: boolean;
}
const SoundManager = ({musicStarted}:SoundManagerProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const audioRef = useRef(new Audio());
  const similarPoemsList  = useContext(PoemContext)

  useEffect(() => {
    // Function to play or change the background music
    const playBackgroundMusic = async () => {
      if (!musicStarted) {
        return
      }
      // Stop the previous song
      audioRef.current.pause();
      audioRef.current.src = ''; // Clear the current source

      try {
        // Fetch a new song
        const response = await fetch(`${apiUrl}/api/random-sound/`);
        const data = await response.json();
        if (data.url) {
          // Play the new song
          audioRef.current.src = data.url;
          audioRef.current.load();
          await audioRef.current.play();
        }
      } catch (err) {
        console.error("Error playing sound:", err);
      }
    };

    playBackgroundMusic();

    // Ensure music is paused when the component unmounts
    return () => {
      audioRef.current.pause();
    };
  }, [apiUrl, similarPoemsList]); // Rerun when apiUrl or similarPoemsList changes

  return null;
};

export default SoundManager;
