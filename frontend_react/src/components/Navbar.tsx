import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { PoemContext } from './PoemContext';
import { Box, Button } from '@mui/material';
import Breadcrum from './Breadcrum';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { currentPoemSimilars, similarPoemsList } = useContext(PoemContext) as PoemContextType;

  return (
    <AppBar position="static" sx={{ border: 'none', boxShadow: 'none' }}>
      <Toolbar sx={{ height: '8vh' }}>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 2 }}>
          <Typography variant="h6" component="div" align="left">
            EcoPoético
          </Typography>
        </motion.div>
        {currentPoemSimilars && (
          <Box mx="auto">
            <Breadcrum/>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
