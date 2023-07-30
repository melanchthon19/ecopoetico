import { Box, Container, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import { motion } from 'framer-motion';

const getPoems = async () => {
  const response = await fetch('http://localhost:8000/api/poems?random=true');
  const data = await response.json();
  return data;
};
const handleHorizontalScroll = (event: any) => {
  const container = event.currentTarget;
  // Change the horizontal scroll behavior
  container.scrollLeft += event.deltaY;
};

const poems = await getPoems();
const randomNumberSplits = () => Math.floor(Math.random() * 3) + 1; // Generates a random number between 0 and 2 (inclusive)

export default function Home() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ p: 2, height: '92vh', overflowY: 'hidden', '&::-webkit-scrollbar': { width: 0 } }}
      onWheel={handleHorizontalScroll}
    >
      <Stack spacing={3} useFlexGap flexWrap="wrap" justifyContent="center" alignItems="center" height="100%">
        {poems.map((poem: Poem) => {
          return (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, x: -15, y: -5 }}
              whileInView={{ opacity: 1, x: 0, y: 0, transition: { delay: Math.random(), duration: Math.random() } }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.25, transition: { delay: 0, duration: 0.2 } }}
            >
              <Tooltip title={poem.title} followCursor TransitionComponent={Zoom} sx={{fontSize: '20px'}}>
                <Paper variant="outlined" sx={{ p: 3, cursor: 'pointer', '&:hover': { border: 1 }, borderRadius: '20px' }} >
                  <Box>
                    <Typography align="center" fontFamily="Merriweather" fontSize={24} whiteSpace="pre-line">
                      {poem.content.split('\n', randomNumberSplits()).join('\n')}
                    </Typography>
                  </Box>
                </Paper>
              </Tooltip>
            </motion.div>
          );
        })}
      </Stack>
    </Container>
  );
}
