import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ border: 'none', boxShadow: 'none' }}>
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 0.5, duration: 2}}>
          <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
            EcoPoético
          </Typography>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
