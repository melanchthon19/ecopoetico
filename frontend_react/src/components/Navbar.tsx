import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { PoemContext } from './PoemContext';
import { Box, Button, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import Breadcrum from './Breadcrum';
import PrintPanel from './PrintPanel';
import SoundManager from './SoundManager';

export default function Navbar() {
  const { navBarColor } = useContext(PoemContext) as PoemContextType;
  const { currentPoemSimilars } = useContext(PoemContext) as PoemContextType;
  const { showTutorial } = useContext(PoemContext) as PoemContextType;
  const [showSavePopOver, setShowSavePopOver] = useState(showTutorial);
  const [print, setPrint] = useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const handleOnSave = () => {
    setShowSavePopOver(false);
    setPrint(true);
  };

  useEffect(() => {
    setShowSavePopOver(showTutorial);
  }, [showTutorial]);

  const [musicStarted, setMusicStarted] = useState(false);
  
  // Function to handle user click to start music
  const startMusic = () => {
    setMusicStarted(true);
  };

  return (
    <>
      <AppBar position="static" sx={{ height: '12vh', backgroundColor: navBarColor, m: 0, p: 0 }}>
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
              <a href="/">
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
                  <img src="/static/assets/logo-tp_color.png" alt="logo" width="50px" />
                  {currentPoemSimilars && isMdDown ? null : (
                    <Typography variant="h4" fontFamily="Londrina Outline" fontWeight="bold" component="div" align="left">
                      ÉCOPOÉTICO
                    </Typography>
                  )}
                </Stack>
              </a>
            </motion.div>
            {currentPoemSimilars && (
              <Box>
                <Breadcrum />
              </Box>
            )}
            {/* // agregar soundmanager */}
            {musicStarted ? <SoundManager /> : (
                <Button
                variant="contained"
                onClick={startMusic}
                sx={{
                  backgroundColor: 'orange', // Set the button color to orange
                  '&:hover': {
                    backgroundColor: 'darkorange', // Darker orange on hover for better UX
                  },
                }}
              >
                Start Music
              </Button>
              )}
            {/* // fin soundmanager */}
            {currentPoemSimilars && (
              <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver}>
                <Button variant="contained" color="info" onClick={handleOnSave}>
                  Guardar
                </Button>
              </Tooltip>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <PrintPanel print={print} setPrint={setPrint} />
    </>
  );
}
