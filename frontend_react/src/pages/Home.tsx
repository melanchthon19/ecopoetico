import { Container, Stack } from '@mui/material';
import PoemCard from '../components/PoemCard';
import { useContext, useState } from 'react';
import Loading from '../components/Loading';
import { PoemContext } from '../components/PoemContext';
import SplashScreen from '../components/SplashScreen';

export default function Home() {
  const [scrollHorizontally, setScrollHorizontally] = useState(true);
  const { poems } = useContext(PoemContext) as PoemContextType;

  const handleHorizontalScroll = (event: any) => {
    const container = event.currentTarget;
    // Change the horizontal scroll behavior
    if (scrollHorizontally) {
      container.scrollLeft += event.deltaY;
    }
  };
  return (
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
          {poems.map((poem: Poem) => {
            return <PoemCard key={poem.id} poem={poem} scroll={setScrollHorizontally} />;
          })}
        </Stack>
      )}
    </Container>
  );
}
