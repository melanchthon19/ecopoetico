import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type PoemOverViewProps = {
  poem: Poem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function PrintPoemOverview({poem, setOpen, open} : PoemOverViewProps) {

  return (
      <Dialog open={open} scroll="paper" aria-labelledby="dialog-title" aria-describedby="dialog-content">
        <DialogTitle
          lineHeight={1}
          align="center"
          fontFamily="Quattrocento Sans"
          fontWeight={700}
          fontSize={30}
          color="black"
          marginRight={4}
          id="dialog-title"
        >
          {poem.title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
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
          <DialogContentText
            lineHeight={1.7}
            fontFamily="Libre Baskerville"
            color="black"
            fontSize={18}
            id="dialog-content"
            // ref={descriptionElementRef}
            tabIndex={-1}
            whiteSpace="pre-line"
          >
            {poem.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography fontWeight={400} fontFamily="Playfair Display" fontSize={20} variant="body1" color="black">
            {poem.author}
          </Typography>
        </DialogActions>
      </Dialog>
  );
}
