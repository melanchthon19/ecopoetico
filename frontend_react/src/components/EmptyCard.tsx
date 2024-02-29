import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { PoemContext } from './PoemContext';

export default function EmptyCard() {
  const colors = [
    'white',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightgrey',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightslategrey',
    'lightsteelblue',
    'lightyellow',
  ];
  const [randomHeight] = useState(Math.floor(Math.random() * (100 - 25 + 1)) + 25); // random height between 25 and 100
  const [randomWidth] = useState(Math.floor(Math.random() * (450 - 25 + 1)) + 25); // random width between 25 and 450
  const [cardRandomColor] = useState(colors[Math.floor(Math.random() * colors.length)]); // random color from colors array
  const { setNavBarColor } = useContext(PoemContext) as PoemContextType;
  const handleClickOpen = () => {
    setNavBarColor(cardRandomColor);
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
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            cursor: 'pointer',
            '&:hover': { border: 1 },
            width: `${randomWidth}px`,
            height: `${randomHeight}px`,
            backgroundColor: cardRandomColor,
          }}
          onClick={handleClickOpen}
        ></Paper>
      </motion.div>
    </Box>
  );
}
