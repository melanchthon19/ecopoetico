import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PoemContext } from './PoemContext';
import TutorialAnimatedBorder from './Tutorial/TutorialAnimatedBorder';

type PoemDialogProps = {
  poem: Poem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  scroll: Dispatch<SetStateAction<boolean>>;
};

export default function PoemDialog({ poem, open, setOpen, scroll }: PoemDialogProps) {
  const [formattedContent, setFormattedContent] = useState<JSX.Element[]>([]);
  const { addPoemSimilars, getSimilarPoems } = useContext(PoemContext) as PoemContextType;
  const travelButton = useRef<HTMLButtonElement>(null);
  const { showTravelPopOver, setShowTravelPopOver } = useContext(PoemContext) as PoemContextType;

  const handleClose = () => {
    setOpen(false);
    scroll(true);
  };

  const handleSimilars = async () => {
    setShowTravelPopOver(false);
    getSimilarPoems(poem.id?.toString() as string);
    handleClose();
    addPoemSimilars(poem);
  };
  const descriptionElementRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const keywords = poem.keywords ? poem.keywords.split('-') : null;
    const contentWords = poem.content.trim().split(' ');
    const formattedContentWords = contentWords.map((word, index) => {
      if (keywords && keywords.includes(word)) {
        return <strong key={index}>{word} </strong>;
      }
      return <span key={index}>{word} </span>;
    });
    setFormattedContent(formattedContentWords);
  }, [poem]);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="dialog-title" aria-describedby="dialog-content">
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
          <DialogContentText
            lineHeight={1.7}
            fontFamily="Libre Baskerville"
            color="black"
            fontSize={18}
            id="dialog-content"
            ref={descriptionElementRef}
            tabIndex={-1}
            whiteSpace="pre-line"
          >
            {formattedContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={5} justifyContent="space-between" alignItems="center" width="100%" paddingX={5}>
            <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={showTravelPopOver}></Backdrop>
            <Tooltip title="Puedes viajar a través de los poemas y ver dónde te dirige." arrow open={showTravelPopOver}>
              <Button
                ref={travelButton}
                color="info"
                variant="contained"
                onClick={handleSimilars}
                sx={(theme) => ({ zIndex: theme.zIndex.drawer + 2 })}
              >
                Viajar
                {showTravelPopOver && <TutorialAnimatedBorder />}
              </Button>
            </Tooltip>
            <Typography fontWeight={400} fontFamily="Playfair Display" fontSize={20} variant="body1" color="black">
              {poem.author}
            </Typography>
          </Stack>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
