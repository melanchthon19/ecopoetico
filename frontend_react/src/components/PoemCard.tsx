import { Box, Paper, Tooltip, Typography, Zoom } from '@mui/material';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import PoemDialog from './PoemDialog';

type PoemCardProps = {
  poem: Poem;
  scroll: Dispatch<SetStateAction<boolean>>;
};

export default function PoemCard({ poem, scroll }: PoemCardProps) {
  const getRandomVerseSplits = () => Math.floor(Math.random() * 3) + 1; // Generates a random number between 0 and 2 (inclusive)
  const getRandomCutPoem = () => Math.floor(Math.random() * poem.content.trim().split(/\n+/).length);
  const getRandomFontSize = () => Math.floor(Math.random() * (24 - 12 + 1)) + 12 // Generates a random number between 12 and 24 (inclusive) 
  const [open, setOpen] = useState(false);
  const [randomSplits] = useState(getRandomVerseSplits);
  const [formattedContent, setFormattedContent] = useState<JSX.Element[]>([]);
  const [randomCutPoem] = useState(getRandomCutPoem);
  const [randomFontSize] = useState(getRandomFontSize);

  useLayoutEffect(() => {
    const keywords = poem.keywords ? poem.keywords.split(' ') : null;
    const verses = poem.content
      .trim()
      .split(/\n+/)
      .map((verse) => verse.trim());
    const cutPoemContent = verses.slice(randomCutPoem).join('\n');
    const cardShortContent = cutPoemContent.split('\n', randomSplits).join('\n');
    const contentWords = cardShortContent.split(' ');
    const formattedContentWords = contentWords.map((word, index) => {
      if (keywords && keywords.includes(word)) {
        return <strong key={index}>{word} </strong>;
      }
      return <span key={index}>{word} </span>;
    });
    setFormattedContent(formattedContentWords);
  }, [poem]);
  const handleClickOpen = () => {
    setOpen(true);
    scroll(false);
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, x: -15, y: -5 }}
        whileInView={{ opacity: 1, x: 0, y: 0, transition: { delay: Math.random(), duration: Math.random() } }}
        transition={{ type: 'spring', stiffness: 100 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.25, transition: { delay: 0, duration: 0.2 } }}
      >
        <Tooltip title={poem.title} followCursor TransitionComponent={Zoom} sx={{ fontSize: '20px' }}>
          <Paper variant="outlined" sx={{ p: 3, cursor: 'pointer', '&:hover': { border: 1 }, maxWidth: 550 }} onClick={handleClickOpen}>
            <Box>
              <Typography align="center" fontFamily="Merriweather" fontSize={randomFontSize} whiteSpace="pre-line">
                {formattedContent}
              </Typography>
            </Box>
          </Paper>
        </Tooltip>
      </motion.div>
      <PoemDialog poem={poem} open={open} setOpen={setOpen} scroll={scroll} />
    </Box>
  );
}
