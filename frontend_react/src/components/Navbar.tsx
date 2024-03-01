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
  const { currentPoemSimilars, musicStarted, setMusicStarted } = useContext(PoemContext) as PoemContextType;
  const { showTutorial } = useContext(PoemContext) as PoemContextType;
  const [showSavePopOver, setShowSavePopOver] = useState(showTutorial);
  const [print, setPrint] = useState(false);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [musicButtonName, setMusicButtonName] = useState('Play Music');

  const handleOnSave = () => {
    setShowSavePopOver(false);
    setPrint(true);
  };

  useEffect(() => {
    setShowSavePopOver(showTutorial);
  }, [showTutorial]);

  // Function to handle user click to start music
  const startMusic = () => {
    setMusicButtonName('Stop Music');
    setMusicStarted(true);
  };
  const stopMusic = () => {
    setMusicButtonName('Play Music');
    setMusicStarted(false);
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
            {musicStarted && <SoundManager musicStarted={musicStarted} />}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
              <Button
              variant="contained"
              onClick={!musicStarted ? startMusic : stopMusic}
              sx={{
                backgroundColor: 'orange', // Set the button color to orange
                '&:hover': {
                  backgroundColor: 'darkorange', // Darker orange on hover for better UX
                },
              }}
              >
                {musicButtonName}
              </Button>
            {/* // fin soundmanager */}
            {currentPoemSimilars && (
              <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver}>
                <Button variant="contained" color="info" onClick={handleOnSave}>
                  Guardar
                </Button>
              </Tooltip>
            )}
            </Stack>
            
          </Stack>
        </Toolbar>
      </AppBar>
      <PrintPanel print={print} setPrint={setPrint} />
    </>
  );
}
