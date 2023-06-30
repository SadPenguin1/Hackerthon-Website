// @mui
import { Typography, Grid, Box } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { FOUNDATION_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function Danhmuc() {
  return (
    <Grid container spacing={10} >
      
      <Grid item xs={9}>
      <Typography variant="h5" paragraph>
          Chỗ này để Study Plan
        </Typography>
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
