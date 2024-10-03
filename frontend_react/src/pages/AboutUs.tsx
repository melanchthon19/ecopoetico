import { Container, Grid, Paper, Typography } from '@mui/material';
import AboutUsCard from '../components/AboutUsCard';
import {motion} from 'framer-motion';

const bioVargas =
  'Programador, literato, músico y ciclista. Magíster en Edición (UDP), licenciado en Letras con mención en Literatura y Lingüística Hispánicas y Minor en Historia de la Música (PUC). Desde que inició la pandemia, decidí reinventarme. Actualmente soy Desarrollador Web Fullstack JavaScript y Python. Muy apasionado, también, con todo lo que sea el Desarrollo de Videojuegos y la Domótica. Siempre busco continuar aprendiendo más.';
const bioMora = 
  'Lingüista computacional y profesor de Lengua y Literatura. Mi interés principal es aplicar modelos y técnicas del Procesamiento del Lenguaje Natural (NLP) para fines educativos, además de proyectos más lúdicos en el Desarrollo de Videojuegos para el aprendizaje de segundas lenguas. Magíster en NLP (Universidad de Edimburgo) y licenciado en Letras Hispánicas (PUC).';
const bioEspallargas = 
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis, vero. Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?';
export default function AboutUs() {
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h1" fontSize="3rem" align="center" fontFamily="Merriweather" fontWeight={800}>
        ÉcoPoético
      </Typography>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
      El uso creciente de plataformas digitales para la lectura plantea interrogantes sobre quién cumple el rol de mediador de lectura. 
      Educadores y libreros han realizado tradicionalmente el andamiaje de lectura. 
      En el espacio digital, no obstante, esta figura se torna borrosa y de contornos difusos.
      </Paper>
      <Paper elevation={6} variant="elevation" square={false} sx={{ p: 3, my: 4, background: 'primary' }}>
      ÉcoPoético es una herramienta enfocada en la recomendación de poemas. 
      Por medio del uso del Aprendizaje Automatizado y Procesamiento del Lenguaje Natural, cada poema permite viajar hacia los poemas más similares en contenido semántico.
      </Paper>
      <Typography variant="h2" py={3} fontSize="2.2rem" align="center" fontFamily="Merriweather" fontWeight={800}>
        Equipo
      </Typography>
      <motion.div initial={{ opacity: 0, translateY: 50 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 0.5, duration: 1.25 }}>
      <Grid container spacing={3} justifyContent="center">
        <AboutUsCard name="Daniel Mora" image="foto-daniel-mora.jpeg" description={bioMora} />
        <AboutUsCard name="Francisco Vargas" image="vargas.jpeg" description={bioVargas} />
        <AboutUsCard name="Loreto Espallargas" image="vargas.jpeg" description={bioEspallargas} />
      </Grid>
      </motion.div>
    </Container>
  );
}
