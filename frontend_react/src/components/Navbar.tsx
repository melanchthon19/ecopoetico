import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { PoemContext } from './PoemContext';
import { Box, Button, Stack } from '@mui/material';
import Breadcrum from './Breadcrum';
import PrintPanel from './PrintPanel';

export default function Navbar() {
  const { currentPoemSimilars } = useContext(PoemContext) as PoemContextType;
  const [print, setPrint] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ border: 'none', boxShadow: 'none' }}>
        <Toolbar sx={{ height: '8vh' }}>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
              <a href="/">
                <Typography variant="h6" component="div" align="left">
                  EcoPoético
                </Typography>
              </a>
            </motion.div>
            {currentPoemSimilars && (
              <Box>
                <Breadcrum />
              </Box>
            )}
            {currentPoemSimilars && (
              <Button variant="contained" color="info" onClick={() => setPrint(true)}>
                Print
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <PrintPanel print={print} setPrint={setPrint}/>
    </>
  );
}
