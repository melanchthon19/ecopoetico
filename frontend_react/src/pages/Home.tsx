import { Container, Stack } from '@mui/material';
import PoemCard from '../components/PoemCard';
import { useContext, useState, useLayoutEffect } from 'react';
import Loading from '../components/Loading';
import { PoemContext } from '../components/PoemContext';
import SplashScreen from '../components/SplashScreen';
import EmptyCard from '../components/EmptyCard';
import WelcomeDialog from '../components/Tutorial/WelcomeDialog';

export default function Home() {
  const [scrollHorizontally, setScrollHorizontally] = useState(true);
  const { poems, showTutorial } = useContext(PoemContext) as PoemContextType;
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(showTutorial);
    
  const handleHorizontalScroll = (event: any) => {
    const container = event.currentTarget;
    if (scrollHorizontally) {
      container.scrollLeft += event.deltaY;
    }
  };

  useLayoutEffect(() => {
    setShowWelcomeDialog(showTutorial);
  }, [showTutorial]);

  return (
      <Container
        disableGutters
        maxWidth={false}
        sx={{ p: 2, height: '88vh', overflowY: 'hidden', '&::-webkit-scrollbar': { width: 0 } }}
        onWheel={handleHorizontalScroll}
      >
        <SplashScreen />
        <Loading open={poems.length < 1} />
        {poems.length > 0 && (
          <Stack spacing={3} useFlexGap flexWrap="wrap" justifyContent="center" alignItems="center" height="100%">
            {poems.map((poem: Poem, index) => (
              poem.id ? <PoemCard key={index} poem={poem} scroll={setScrollHorizontally} /> : <EmptyCard key={index} />
            ))}
            <WelcomeDialog show={showWelcomeDialog} setShow={setShowWelcomeDialog}></WelcomeDialog>
          </Stack>
        )}
      </Container>
  );
}
