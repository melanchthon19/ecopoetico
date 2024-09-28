import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { PoemContext } from './PoemContext';
import { Box, Button, Chip, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import Breadcrum from './Breadcrum';
import PrintPanel from './PrintPanel';
import SoundManager from './SoundManager';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { navBarColor } = useContext(PoemContext) as PoemContextType;
  const { currentPoemSimilars, musicStarted, setMusicStarted } = useContext(PoemContext) as PoemContextType;
  const { showTutorial } = useContext(PoemContext) as PoemContextType;
  const [showSavePopOver, setShowSavePopOver] = useState(false);
  const [print, setPrint] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(showTutorial);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsDown = useMediaQuery('(min-width:480px)');
  const [musicButtonName, setMusicButtonName] = useState('Play Music');
  const location = useLocation();
  const isQuienesSomosPage = location.pathname === '/quienes-somos';

  const handleOnSave = () => {
    setShowSavePopOver(false);
    setPrint(true);
  };

  useEffect(() => {
    // setShowSavePopOver(showTutorial);
    setDisableSaveBtn(showTutorial);
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
                  <img src={`${import.meta.env.VITE_BASE_URL}assets/logo-tp_color.png`} alt="logo" width={!isXsDown ? '25px' : '50px'} />
                  {currentPoemSimilars && isMdDown && !isQuienesSomosPage ? null : (
                    <Typography
                      variant="h4"
                      fontFamily="Londrina Outline"
                      fontWeight="bold"
                      component="div"
                      align="left"
                      sx={{ fontSize: isSmDown ? '1.5rem' : '2rem' }}
                    >
                      ÉCOPOÉTICO
                    </Typography>
                  )}
                </Stack>
              </a>
            </motion.div>
            {currentPoemSimilars && !isQuienesSomosPage && (
              <Box>
                <Breadcrum setSavePopOver={setShowSavePopOver} setDisableSaveBtn={setDisableSaveBtn} />
              </Box>
            )}
            {musicStarted && <SoundManager musicStarted={musicStarted} />}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
              <Link to="/quienes-somos">
                <Chip label="Quiénes Somos" clickable size={ isMdDown ? "small" : "medium" } />
              </Link>
              <Button
                variant="contained"
                onClick={!musicStarted ? startMusic : stopMusic}
                size={isMdDown ? 'small' : 'large'}
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
              {currentPoemSimilars && !isQuienesSomosPage && (
                <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver}>
                  <Button size={isMdDown ? 'small' : 'large'} disabled={disableSaveBtn} variant="contained" color="info" onClick={handleOnSave}>
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
