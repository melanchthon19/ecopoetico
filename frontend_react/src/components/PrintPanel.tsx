import { Box, Button, Divider, Chip, Drawer, List, Paper, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { PoemContext } from './PoemContext';
import PrintListItem from './PrintListItem';

type PrintBarProps = {
  print: boolean;
  setPrint: (print: boolean) => void;
};

export default function PrintPanel({ print, setPrint }: PrintBarProps) {
  const { similarPoemsList } = useContext(PoemContext) as PoemContextType;
  const uniqueSimilarPoemsList = similarPoemsList.filter((poem, index, self) => index === self.findIndex((t) => t.id === poem.id));
  const [checked, setChecked] = useState([1]);

  const selectAll = () => {
    setChecked(uniqueSimilarPoemsList.map((poem) => poem.id));
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
  return (
    <Drawer anchor="right" open={print} onClose={() => setPrint(!print)}>
      <Box height="100%" p={5}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography display="block" mx="auto" fontWeight={700} fontFamily="Merriweather" variant="overline" fontSize={20} align="center">
            Print my Path
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
        <Button variant="contained" color="error" sx={{ display: 'block', mx: 'auto', my: 3 }}>
          <Typography fontWeight={700}>Generate</Typography>
        </Button>
      </Box>
      <Button component='div' color='info' onClick={() => setPrint(false)} sx={{py: 3}}>Close</Button>
    </Drawer>
  );
}
