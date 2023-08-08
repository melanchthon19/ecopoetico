import { Container, Stack } from '@mui/material';
import PoemCard from '../components/PoemCard';
import { useLayoutEffect, useState } from 'react';
import Loading from '../components/Loading';



export default function Home() {
  const [scrollHorizontally, setScrollHorizontally] = useState(true);
  const [poems, setPoems] = useState([]);

  useLayoutEffect(() => {
    const getPoems = async () => {
      const response = await fetch('http://localhost:8000/api/poems?random=true');
      const data = await response.json();
      return data;
    };
    getPoems().then((data) => setPoems(data));
  }, []);
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
      <Loading open={poems.length < 1} />
      <Stack spacing={3} useFlexGap flexWrap="wrap" justifyContent="center" alignItems="center" height="100%">
        {poems.map((poem: Poem) => {
          return <PoemCard key={poem.id} poem={poem} scroll={setScrollHorizontally} />;
        })}
      </Stack>
    </Container>
  );
}
