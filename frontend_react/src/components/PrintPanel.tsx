import { Box, Button, Divider, Chip, Drawer, List, Paper, Stack, Typography, Tooltip, Backdrop } from '@mui/material';
import { useContext, useState } from 'react';
import { PoemContext } from './PoemContext';
import PrintListItem from './PrintListItem';
import Loading from './Loading';
import TutorialAnimatedBorder from './Tutorial/TutorialAnimatedBorder';
import FinishDialog from './Tutorial/FinishDialog';

type PrintBarProps = {
  print: boolean;
  setPrint: (print: boolean) => void;
};

export default function PrintPanel({ print, setPrint }: PrintBarProps) {
  const { similarPoemsList, showTutorial, setShowTutorial } = useContext(PoemContext) as PoemContextType;
  const uniqueSimilarPoemsList = similarPoemsList.filter((poem, index, self) => index === self.findIndex((t) => t.id === poem.id));
  const [checked, setChecked] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPrintPopOver, setShowPrintPopOver] = useState(false);
  const [hasClickedGenerate, setHasClickedGenerate] = useState(false);
  const [showFinishTutorial, setShowFinishTutorial] = useState(false);

  const selectAll = () => {
    setChecked(uniqueSimilarPoemsList.map((poem) => poem.id as number));
  };
  const deselectAll = () => {
    setChecked([]);
  };

  const handleToggle = (value: number) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleGenerate = async () => {
    if (showTutorial) {
      localStorage.setItem('showTutorial', 'false');
      setShowTutorial(false);
      setShowFinishTutorial(true);
      setHasClickedGenerate(true);
      setTimeout(() => setShowPrintPopOver(false), 1000);
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/poems/print`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checked),
      });
      setLoading(false);
      if (response.ok) {
        const blob = await response.blob(); // Convert the response to a Blob

        // Get filename from response headers (assuming the server provides it)
        const contentDisposition = response.headers.get('content-disposition');
        const match = contentDisposition?.match(/filename="(.+)"/);
        const filename = match ? match[1] : 'downloaded_file.txt';

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename; // Set the filename based on the headers
        document.body.appendChild(downloadLink);

        // Simulate a click on the link to trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
      } else {
        console.error('Error downloading the file.');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDrawerOpen = () => {
    if (showTutorial && !hasClickedGenerate) {
      setTimeout(() => setShowPrintPopOver(true), 500);
    }
  };

  return (
    <Drawer
      onTransitionEnd={handleDrawerOpen}
      onTransitionEnter={() => setShowPrintPopOver(false)}
      anchor="right"
      open={print}
      onClose={() => setPrint(!print)}
    >
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={showPrintPopOver}></Backdrop>

      <Box height="100%" p={5}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography display="block" mx="auto" fontWeight={700} fontFamily="Merriweather" variant="overline" fontSize={20} align="center">
            Recordar mi camino
          </Typography>
          <Divider variant="middle" sx={{ mb: 2, borderTop: '1px solid rgba(0, 0, 0, 0.87)' }} />
          <Stack direction="row" spacing={1} justifyContent="center" mb={1}>
            <Chip variant="outlined" label="Todos" onClick={selectAll} />
            <Chip variant="outlined" label="Ninguno" onClick={deselectAll} />
          </Stack>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {uniqueSimilarPoemsList.map((poem: Poem) => {
              return <PrintListItem key={poem.id} checked={checked} poem={poem} handleToggle={handleToggle} showTutorial={showPrintPopOver} />;
            })}
          </List>
        </Paper>
        <Tooltip title="Genera un archivo de texto con los poemas seleccionados" arrow open={showPrintPopOver}>
          <Button
            disabled={showPrintPopOver ? false : checked.length == 0}
            onClick={handleGenerate}
            variant="contained"
            color="error"
            sx={{ display: 'block', mx: 'auto', my: 3, zIndex: showPrintPopOver ? 9999 : 0 }}
          >
            <Typography fontWeight={700}>CREAR</Typography>
            {showPrintPopOver && <TutorialAnimatedBorder />}
          </Button>
        </Tooltip>
      </Box>
      <Button component="div" color="info" onClick={() => setPrint(false)} sx={{ py: 3 }}>
        Cerrar
      </Button>
      <Loading open={loading} />
      <FinishDialog show={showFinishTutorial} setShow={setShowFinishTutorial} />
    </Drawer>
  );
}
