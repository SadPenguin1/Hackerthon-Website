// @mui
import { Typography, Grid, Box } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { FOUNDATION_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function Tongquan() {
  return (
    <Grid container spacing={10} >
      <Grid item xs={9} >
        <Typography variant="h5" paragraph>
          chỗ này để mấy cái linh tinh
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Prepare By Topic
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography variant="h5" paragraph>
          Cho nay de lich 
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Prepare By Topic
        </Typography>
      </Grid>
    </Grid>
  );
}
