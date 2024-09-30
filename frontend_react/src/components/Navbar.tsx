import { Box, Button, IconButton, Menu, MenuItem, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrum from './Breadcrum';
import { PoemContext } from './PoemContext';
import PrintPanel from './PrintPanel';
import SoundManager from './SoundManager';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const { navBarColor } = useContext(PoemContext) as PoemContextType;
  const { currentPoemSimilars, musicStarted, setMusicStarted } = useContext(PoemContext) as PoemContextType;
  const { showTutorial } = useContext(PoemContext) as PoemContextType;
  const [showSavePopOver, setShowSavePopOver] = useState(false);
  const [print, setPrint] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(showTutorial);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  // const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsDown = useMediaQuery('(min-width:480px)');
  const [musicButtonName, setMusicButtonName] = useState('Play Music');
  const location = useLocation();
  const isQuienesSomosPage = location.pathname === '/quienes-somos';
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ height: '12vh', backgroundColor: navBarColor, m: 0, p: 0 }}>
        <Toolbar sx={{ height: '12vh' }}>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="ecopoetico menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/quienes-somos">
                  <Button
                    variant="contained"
                    size={isMdDown ? 'small' : 'large'}
                    sx={{
                      backgroundColor: 'orange', // Set the button color to orange
                      '&:hover': {
                        backgroundColor: 'darkorange', // Darker orange on hover for better UX
                      },
                      display: { xs: 'flex', md: 'none' },
                    }}
                  >
                    Quiénes Somos
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  variant="contained"
                  onClick={!musicStarted ? startMusic : stopMusic}
                  size={isMdDown ? 'small' : 'large'}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    backgroundColor: 'orange', // Set the button color to orange
                    '&:hover': {
                      backgroundColor: 'darkorange', // Darker orange on hover for better UX
                    },
                  }}
                >
                  {musicButtonName}
                </Button>
              </MenuItem>
              {currentPoemSimilars && !isQuienesSomosPage && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver} sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Button size={isMdDown ? 'small' : 'large'} disabled={disableSaveBtn} variant="contained" color="info" onClick={handleOnSave}>
                      Guardar
                    </Button>
                  </Tooltip>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
              <a href="/">
                <img src={`${import.meta.env.VITE_BASE_URL}assets/ecopoetico-newlogo.png`} alt="logo" width={!isXsDown ? '100px' : '175px'} />
              </a>
            </motion.div>
            {currentPoemSimilars && !isQuienesSomosPage && (
              <Box>
                <Breadcrum setSavePopOver={setShowSavePopOver} setDisableSaveBtn={setDisableSaveBtn} />
              </Box>
            )}
            {musicStarted && <SoundManager musicStarted={musicStarted} />}
            <Stack direction="row" alignItems="center" justifyContent="left" spacing={3} marginLeft={3}>
              <Link to="/quienes-somos">
                <Button
                  variant="contained"
                  size={isMdDown ? 'small' : 'large'}
                  sx={{
                    backgroundColor: 'orange', // Set the button color to orange
                    '&:hover': {
                      backgroundColor: 'darkorange', // Darker orange on hover for better UX
                    },
                    display: { xs: 'none', md: 'flex' },
                  }}
                >
                  Quiénes Somos
                </Button>
              </Link>
              <Button
                variant="contained"
                onClick={!musicStarted ? startMusic : stopMusic}
                size={isMdDown ? 'small' : 'large'}
                sx={{
                  display: { xs: 'none', md: 'flex' },
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
                <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver} sx={{ display: { xs: 'none', md: 'flex' } }}>
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
