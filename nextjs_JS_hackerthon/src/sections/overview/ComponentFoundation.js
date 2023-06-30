// @mui
import { Typography, Grid, Box } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { FOUNDATION_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentFoundation() {
  return (
    <Grid container spacing={10} sx={{ my: 12 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Category
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Prepare By Topic
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {FOUNDATION_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
