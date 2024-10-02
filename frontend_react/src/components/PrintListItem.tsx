import { Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material';
import PrintPoemOverview from './PrintPoemOverview';
import { MouseEvent, useState } from 'react';

type PrintListItemProps = {
  poem: Poem;
  handleToggle: (value: number) => void;
  checked: number[];
  showTutorial: boolean;
}


export default function PrintListItem({poem, handleToggle, checked, showTutorial} : PrintListItemProps) {
  const labelId = `checkbox-list-secondary-label-${poem.id}`;
  const [open, setOpen] = useState(false);
  const handleCheckBoxClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  }
  return (
    <ListItem
      divider
      onClick={() => setOpen(!open)}
      secondaryAction={
        <Checkbox
          color="info"
          edge="end"
          onClick={handleCheckBoxClick}
          value={poem.id}
          onChange={() => handleToggle(poem.id as number)}
          checked={showTutorial ? true : checked.indexOf(poem.id as number) !== -1}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemText id={labelId} primary={poem.title} />
      </ListItemButton>
      <PrintPoemOverview poem={poem} setOpen={setOpen} open={open} />
    </ListItem>
  );
}
