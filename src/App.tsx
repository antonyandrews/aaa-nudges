import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NudgeList from './components/nudge-list';
import NewNudge from './components/new-nudge';
import { useEffect, useState } from 'react';

export default function BasicGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    setSelectedCategory('Personal'); 
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={2}>
          <NudgeList onSelect={(text) => setSelectedCategory(text)} />
        </Grid>
        <Grid size={10}>
          <NewNudge category={selectedCategory} />
        </Grid>
      </Grid>
    </Box>
  );
}
