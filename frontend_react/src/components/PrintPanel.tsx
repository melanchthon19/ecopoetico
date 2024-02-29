import { Box, Button, Divider, Chip, Drawer, List, Paper, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { PoemContext } from './PoemContext';
import PrintListItem from './PrintListItem';
import Loading from './Loading';

type PrintBarProps = {
  print: boolean;
  setPrint: (print: boolean) => void;
};

export default function PrintPanel({ print, setPrint }: PrintBarProps) {
  const { similarPoemsList } = useContext(PoemContext) as PoemContextType;
  const uniqueSimilarPoemsList = similarPoemsList.filter((poem, index, self) => index === self.findIndex((t) => t.id === poem.id));
  const [checked, setChecked] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;

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
  }

  return (
    <Drawer anchor="right" open={print} onClose={() => setPrint(!print)}>
      <Box height="100%" p={5}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography display="block" mx="auto" fontWeight={700} fontFamily="Merriweather" variant="overline" fontSize={20} align="center">
            Recordar mi camino
          </Typography>
          <Divider variant="middle" sx={{mb: 2, borderTop: '1px solid rgba(0, 0, 0, 0.87)' }}/>
          <Stack direction="row" spacing={1} justifyContent="center" mb={1}>
            <Chip variant='outlined' label="Select All" onClick={selectAll} />
            <Chip variant='outlined' label="Select None" onClick={deselectAll} />
          </Stack>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {uniqueSimilarPoemsList.map((poem: Poem) => {
              return <PrintListItem key={poem.id} checked={checked} poem={poem} handleToggle={handleToggle} />;
            })}
          </List>
        </Paper>
        <Button onClick={handleGenerate} variant="contained" color="error" sx={{ display: 'block', mx: 'auto', my: 3 }}>
          <Typography fontWeight={700}>Generate</Typography>
        </Button>
      </Box>
      <Button component='div' color='info' onClick={() => setPrint(false)} sx={{py: 3}}>Close</Button>
    <Loading open={loading} />
    </Drawer>
  );
}
