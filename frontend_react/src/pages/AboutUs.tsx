import { Container, Grid, Paper, Typography } from '@mui/material';
import AboutUsCard from '../components/AboutUsCard';
import {motion} from 'framer-motion';

const bioVargas =
  'Programador, literato, músico y ciclista. Magíster en Edición (UDP), licenciado en Letras con mención en Literatura y Lingüística Hispánicas y Minor en Historia de la Música (PUC). Actualmente soy Desarrollador Web Fullstack JavaScript y Python. Muy apasionado con todo lo que sea el Desarrollo de Videojuegos y la Domótica.';
const bioMora = 
  'Lingüista computacional y profesor de Lengua y Literatura. Mi interés principal es aplicar modelos y técnicas del Procesamiento del Lenguaje Natural (NLP) para fines educativos, además de proyectos más lúdicos en el Desarrollo de Videojuegos para el aprendizaje de segundas lenguas. Magíster en NLP (Universidad de Edimburgo) y licenciado en Letras Hispánicas (PUC).';
const bioEspallargas = 
  'Educadora de Párvulos (PUC), estudiante de Doctorado del Departamento de Didáctica de la Lengua, Literatura y Ciencias Sociales de la Universidad Autónoma de Barcelona y Máster en Literatura Infantil, Medios de Comunicación y Cultura de la Universidad de Glasgow. Soy miembro del Grupo de Investigación Gretel donde desarrollo mi tesis sobre la incorporación de narrativas digitales en la educación literaria para estudiantes de secundaria.';
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
      <Grid container spacing={3} justifyContent="center" alignItems='stretch'>
        <AboutUsCard name="Daniel Mora" image="foto-daniel-mora-copy.jpeg" description={bioMora} />
        <AboutUsCard name="Francisco Vargas" image="vargas.jpeg" description={bioVargas} />
        <AboutUsCard name="Loreto Espallargas" image="toty-espallargas.jpeg" description={bioEspallargas} />
      </Grid>
      </motion.div>
    </Container>
  );
}
