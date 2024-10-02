import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Backdrop } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SplashScreen() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleAnimationComplete = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    // Check if the backdrop has already been shown in this session
    if (!sessionStorage.getItem('backdropShown')) {
      setOpen(true);
      // Mark the backdrop as shown in this session
      sessionStorage.setItem('backdropShown', 'true');
    }
  }, []);

  return (
    <Backdrop open={open} sx={{ backgroundColor: theme.palette.mode == 'light' ? 'white' : 'black' }} style={{ zIndex: 9999 }}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 3, ease: 'linear' }}
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.img
          src={`${import.meta.env.VITE_BASE_URL}assets/ecopoetico-fulllogo.png`}
          width="350"
          alt="ECOPOETICO LOGO"
          initial={{ opacity: 0, x: -15, y: -5 }}
          animate={{ opacity: 1, x: 0, y: 0, transition: { delay: 0.5, duration: 1 } }}
        />
      </motion.div>
    </Backdrop>
  );
}
