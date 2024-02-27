import { Backdrop, CircularProgress } from '@mui/material';

export default function Loading({open}: {open: boolean}) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
      Cargando...
    </Backdrop>
  );
}
