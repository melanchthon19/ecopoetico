import { Container, Stack, Button } from '@mui/material';
import PoemCard from '../components/PoemCard';
import { useContext, useState } from 'react';
import Loading from '../components/Loading';
import { PoemContext } from '../components/PoemContext';
import SplashScreen from '../components/SplashScreen';
import EmptyCard from '../components/EmptyCard';
import SoundManager from '../components/SoundManager';

export default function Home() {
  const [scrollHorizontally, setScrollHorizontally] = useState(true);
  const { poems } = useContext(PoemContext) as PoemContextType;
  const [musicStarted, setMusicStarted] = useState(false); // New state to manage music playback

  const handleHorizontalScroll = (event: any) => {
    const container = event.currentTarget;
    if (scrollHorizontally) {
      container.scrollLeft += event.deltaY;
    }
  };

  // Function to handle user click to start music
  const startMusic = () => {
    setMusicStarted(true);
  };

  return (
    <>
      {musicStarted ? <SoundManager /> : (
        <Button
        variant="contained"
        onClick={startMusic}
        sx={{
          position: 'absolute',
          top: 16, // Adjust top and right as needed
          right: 16,
          zIndex: 1000, // Ensure it's above other content
          backgroundColor: 'orange', // Set the button color to orange
          '&:hover': {
            backgroundColor: 'darkorange', // Darker orange on hover for better UX
    },
        }}
      >
        Start Music
      </Button>
      )}
      <Container
        disableGutters
        maxWidth={false}
        sx={{ p: 2, height: '92vh', overflowY: 'hidden', '&::-webkit-scrollbar': { width: 0 } }}
        onWheel={handleHorizontalScroll}
      >
        <SplashScreen />
        <Loading open={poems.length < 1} />
        {poems && (
          <Stack spacing={3} useFlexGap flexWrap="wrap" justifyContent="center" alignItems="center" height="100%">
            {poems.map((poem: Poem, index) => (
              poem.id ? <PoemCard key={poem.id} poem={poem} scroll={setScrollHorizontally} /> : <EmptyCard key={index} />
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
}
