import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { PoemContext } from './PoemContext';

export default function Breadcrum() {
  const { similarPoemsList, currentPoemSimilars, getSimilarPoems, getAllPoems } = useContext(PoemContext) as PoemContextType;
  const [breadcrumbValue, setBreadcrumbValue] = useState(currentPoemSimilars?.id.toString());

  useEffect(() => {
    setBreadcrumbValue(currentPoemSimilars?.id.toString());
  }, [currentPoemSimilars]);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == breadcrumbValue) return;
    setBreadcrumbValue(event.target.value);
    if (event.target.value == 'all') {
      getAllPoems();
      return;
    }
    getSimilarPoems(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="poem-breadcrumb" sx={{ fontSize: 20 }}>
        My Path
      </InputLabel>
      <Select labelId="poem-breadcrumb" id="breadcrumb" value={breadcrumbValue} onChange={handleChange} label="Similar Poems ist">
        <MenuItem divider value="all">
          <span className="m-auto text-center">------ ALL POEMS ------</span>
        </MenuItem>
        {similarPoemsList &&
          similarPoemsList.map((poem: Poem, index: number) => {
            return (
              <MenuItem
                key={index}
                value={poem.id}
                divider={poem.id.toString() == breadcrumbValue}
                sx={{ fontFamily: 'Quattrocento Sans', fontSize: 24, fontWeight: poem.id.toString() == breadcrumbValue ? 700 : 400 }}
              >
                {poem.title}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}
