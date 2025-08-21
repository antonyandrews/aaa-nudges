import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NudgeList from './components/nudge-list';
import NewNudge from './components/new-nudge';
import { useState } from 'react';

export default function BasicGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Personal");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3, md: 2, lg:2 }}>
          <NudgeList onSelect={(text) => setSelectedCategory(text)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 9, md: 10, lg: 10 }}>
          <NewNudge category={selectedCategory} />
        </Grid>
      </Grid>
    </Box>
  );
}
