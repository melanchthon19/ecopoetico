import { Container, Paper, Typography } from '@mui/material';
//import { Container, Grid, Paper, Typography } from '@mui/material';
//import AboutUsCard from '../components/AboutUsCard';
//import {motion} from 'framer-motion';

export default function AboutUs() {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h1" fontSize="3rem" align="center" fontFamily="Merriweather" fontWeight={800}>
        EcoPoetico
      </Typography>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
      El uso creciente de plataformas digitales para la lectura plantea interrogantes sobre quién cumple el rol de mediador de lectura. 
      Educadores y libreros han realizado tradicionalmente el andamiaje de lectura. 
      En el espacio digital, no obstante, esta figura se torna borrosa y de contornos difusos.
      </Paper>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
      EcoPoetico es una herramienta enfocada en la recomendación de poemas. 
      Por medio del uso del Aprendizaje Automatizado y Procesamiento del Lenguaje Natural, cada poema permite viajar hacia los poemas más similares en contenido semántico.
      </Paper>

    </Container>
  );
}
