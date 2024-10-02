import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface FinishDialogProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function FinishDialog({show, setShow}: FinishDialogProps) {
  const handleClose = () => {
    setShow(false);
  }
  return (
    <Dialog open={show} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Gracias!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Has finalizado el tutorial.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose} variant="outlined">
            OK
          </Button>
        </DialogActions>
      </Dialog>
  )
}
