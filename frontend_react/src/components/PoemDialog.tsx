import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Dispatch, useEffect, useRef, SetStateAction } from 'react';

export default function PoemDialog({
  poem,
  open,
  setOpen,
  scroll,
}: {
  poem: Poem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  scroll: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setOpen(false);
    scroll(true);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="dialog-title" aria-describedby="dialog-content">
        <DialogTitle marginRight={4} id="dialog-title">
          {poem.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers={true}>
          <DialogContentText id="dialog-content" ref={descriptionElementRef} tabIndex={-1} whiteSpace="pre-line">
            {poem.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography variant="body1" color="initial" marginRight={5}>
            {poem.author}
          </Typography>
        </DialogActions>
      </Dialog>
    </div>
  );
}
