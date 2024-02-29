import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Fragment, ReactElement, Ref, forwardRef, useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { PoemContext } from '../PoemContext';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type WelcomeDialogProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function WelcomeDialog({show, setShow}: WelcomeDialogProps) {
  const {setShowTutorial} = useContext(PoemContext) as PoemContextType;
  const [openTutorial, setOpenTutorial] = useState(false);

  const handleClose = (choice: boolean) => {
    setShow(false);
    localStorage.setItem('showTutorial', choice.toString());
    setShowTutorial(choice);
    setOpenTutorial(choice);
  };

  const handleCloseTutorial = () => {
    setOpenTutorial(false);
  };

  return (
    <Fragment>
      <Dialog open={show} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Bienvenidx a Éco Poético</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¡Hola! Esta es una plataforma para leer y jugar con poemas. ¿Quieres ver un tutorial?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handleClose(false)} variant="outlined">
            No
          </Button>
          <Button color="error" onClick={() => handleClose(true)} variant="outlined" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTutorial}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseTutorial}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
        <IconButton
          onClick={handleCloseTutorial}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText component={'div'} id="alert-dialog-slide-description">
            <Typography textAlign={'center'} variant="body1" color="initial">
              Elige algún fragmento para leer el poema completo.
            </Typography>
            <Typography textAlign={'center'} variant="body1" color="initial">
              Puedes hacer scroll horizontal para ver más fragmentos.
            </Typography>
          </DialogContentText>
          <DialogActions>
            <Button sx={{ mx: 'auto', mt: 2 }} color="error" onClick={handleCloseTutorial} variant="outlined">
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
