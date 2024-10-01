import { Backdrop, Box, Button, IconButton, Menu, MenuItem, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrum from './Breadcrum';
import { PoemContext } from './PoemContext';
import PrintPanel from './PrintPanel';
import SoundManager from './SoundManager';
import MenuIcon from '@mui/icons-material/Menu';
import TutorialAnimatedBorder from './Tutorial/TutorialAnimatedBorder';

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
  const menuButtonRef = useRef(null);
  const [burguerMenu, setBurguerMenu] = useState(false);
  const [hasClickedBreadCrumbs, setHasClickedBreadCrumbs] = useState(false);
  const [hasClickedSave, setHasClickedSave] = useState(false);

  const handleOnSave = () => {
    setHasClickedSave(true);
    setShowSavePopOver(false);
    setPrint(true);
    if (isMdDown) {
      setBurguerMenu(false);
    }
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
    setBurguerMenu(true);
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    if (showSavePopOver) return;
    setAnchorElNav(null);
    setBurguerMenu(false);
  };

  const handleMenuBurguerOpen = () => {
    if (showTutorial && hasClickedBreadCrumbs && !hasClickedSave) {
      setTimeout(() => setShowSavePopOver(true), 500);
    }
  };

  return (
    <>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 2 })} open={showSavePopOver}></Backdrop>
      <AppBar position="static" sx={{ height: '12vh', backgroundColor: navBarColor, m: 0, p: 0 }}>
        <Toolbar sx={{ height: '12vh' }}>
          {isMdDown && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="ecopoetico menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                ref={menuButtonRef}
                sx={{ backgroundColor: showSavePopOver ? 'rgba(255, 0, 0, 0.5)' : 'transparent' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={showTutorial ? menuButtonRef.current : anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={burguerMenu}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
                onTransitionEnd={handleMenuBurguerOpen}
              >
                {!showTutorial && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/quienes-somos">
                      <Button
                        variant="contained"
                        size={isMdDown ? 'small' : 'large'}
                        disabled={showTutorial ? true : false}
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
                )}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button
                    variant="contained"
                    onClick={!musicStarted ? startMusic : stopMusic}
                    disabled={showTutorial ? true : false}
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
                {currentPoemSimilars && !isQuienesSomosPage && isMdDown && (
                  <MenuItem onClick={handleCloseNavMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver} placement="bottom">
                      <Button size={isMdDown ? 'small' : 'large'} disabled={disableSaveBtn} variant="contained" color="info" onClick={handleOnSave}>
                        Guardar
                        {showSavePopOver && <TutorialAnimatedBorder />}
                      </Button>
                    </Tooltip>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
              <a href="/">
                <img src={`${import.meta.env.VITE_BASE_URL}assets/ecopoetico-newlogo.png`} alt="logo" width={!isXsDown ? '100px' : '175px'} />
              </a>
            </motion.div>
            {currentPoemSimilars && !isQuienesSomosPage && (
              <Box>
                <Breadcrum
                  setHasClickedBreadCrumbs={setHasClickedBreadCrumbs}
                  setBurguerMenu={setBurguerMenu}
                  setDisableSaveBtn={setDisableSaveBtn}
                  setShowSavePopOver={setShowSavePopOver}
                />
              </Box>
            )}
            {musicStarted && <SoundManager musicStarted={musicStarted} />}
            <Stack direction="row" alignItems="center" justifyContent="left" spacing={3} marginLeft={3}>
              {!showTutorial && (
                <Link to="/quienes-somos">
                  <Button
                    variant="contained"
                    size={isMdDown ? 'small' : 'large'}
                    disabled={showTutorial ? true : false}
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
              )}
              <Button
                variant="contained"
                onClick={!musicStarted ? startMusic : stopMusic}
                disabled={showTutorial ? true : false}
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

              {currentPoemSimilars && !isQuienesSomosPage && !isMdDown && (
                <>
                  <Tooltip title="Puedes guardar tu recorrido aquí" arrow open={showSavePopOver}>
                    <Button
                      size={isMdDown ? 'small' : 'large'}
                      disabled={disableSaveBtn}
                      variant="contained"
                      color="info"
                      onClick={handleOnSave}
                      sx={(theme) => ({ color: '#fff', zIndex: showSavePopOver ? theme.zIndex.drawer + 2 : 0 })}
                    >
                      Guardar
                      {showSavePopOver && <TutorialAnimatedBorder />}
                    </Button>
                  </Tooltip>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <PrintPanel print={print} setPrint={setPrint} />
    </>
  );
}
