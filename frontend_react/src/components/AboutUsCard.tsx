import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface AboutUsCardProps {
  name: string;
  image: string;
  description: string;
}

export default function AboutUsCard({ name, image, description }: AboutUsCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised={true} sx={{ maxWidth: 345, mx: 'auto' }}>
        <CardMedia
          component="img"
          height="120"
          image={`${import.meta.env.VITE_BASE_URL}assets/${image}`}
          alt={{ name } + ' Profile Photo'}
          sx={{ mt: 3, mx: 'auto', borderRadius: '50%', height: 120, width: 120, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography mb={3} variant="h5" align="center" fontFamily="Merriweather" fontWeight={800}>
            {name}
          </Typography>
          <Typography variant="body1" align="center">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
