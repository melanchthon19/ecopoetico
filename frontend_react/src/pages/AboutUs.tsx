import { Card, CardContent, CardMedia, Container, Grid, Paper, Stack, Typography } from '@mui/material';

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
      <Grid container spacing={3} justifyContent="center" >
        <Grid item xs={12} sm={6} md={4}>
          <Card raised={true} sx={{ maxWidth: 345, mx: "auto" }}>
            <CardMedia
              component="img"
              height="120"
              image={`${import.meta.env.VITE_BASE_URL}assets/vargas.jpeg`}
              alt="Francisco Vargas Profile Photo"
              sx={{ mt: 3, mx: 'auto', borderRadius: '50%', height: 120, width: 120, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography mb={3} variant="h5" align="center" fontFamily="Merriweather" fontWeight={800}>
                Francisco Vargas
              </Typography>
              <Typography variant="body1" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis,
                vero. Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card raised={true} sx={{ maxWidth: 345, mx: "auto" }}>
            <CardMedia
              component="img"
              height="120"
              image={`${import.meta.env.VITE_BASE_URL}assets/vargas.jpeg`}
              alt="Francisco Vargas Profile Photo"
              sx={{ mt: 3, mx: 'auto', borderRadius: '50%', height: 120, width: 120, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography mb={3} variant="h5" align="center" fontFamily="Merriweather" fontWeight={800}>
                Francisco Vargas
              </Typography>
              <Typography variant="body1" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis,
                vero. Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card raised={true} sx={{ maxWidth: 345, mx: "auto" }}>
            <CardMedia
              component="img"
              height="120"
              image={`${import.meta.env.VITE_BASE_URL}assets/vargas.jpeg`}
              alt="Francisco Vargas Profile Photo"
              sx={{ mt: 3, mx: 'auto', borderRadius: '50%', height: 120, width: 120, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography mb={3} variant="h5" align="center" fontFamily="Merriweather" fontWeight={800}>
                Francisco Vargas
              </Typography>
              <Typography variant="body1" align="center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque velit optio corrupti ullam adipisci, iste beatae magnam! Reiciendis,
                vero. Ratione similique optio eligendi veniam perspiciatis necessitatibus exercitationem rem numquam voluptates?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
