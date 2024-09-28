import { Container, Grid, Paper, Typography } from '@mui/material';
import AboutUsCard from '../components/AboutUsCard';
import {motion} from 'framer-motion';

const bioVargas =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis, vero. Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?';

export default function AboutUs() {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h1" fontSize="3rem" align="center" fontFamily="Merriweather" fontWeight={800}>
        QUIÉNES SOMOS
      </Typography>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis, vero.
        Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?
      </Paper>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis, vero.
        Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?
      </Paper>
      <Typography variant="h2" py={3} fontSize="2.2rem" align="center" fontFamily="Roboto" fontWeight={800}>
        Nuestro Equipo
      </Typography>
      <motion.div initial={{ opacity: 0, translateY: 50 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 0.5, duration: 1.25 }}>
      <Grid container spacing={3} justifyContent="center">
        <AboutUsCard name="Francisco Vargas" image="vargas.jpeg" description={bioVargas} />
        <AboutUsCard name="Francisco Vargas" image="vargas.jpeg" description={bioVargas} />
        <AboutUsCard name="Francisco Vargas" image="vargas.jpeg" description={bioVargas} />
      </Grid>
      </motion.div>
    </Container>
  );
}
