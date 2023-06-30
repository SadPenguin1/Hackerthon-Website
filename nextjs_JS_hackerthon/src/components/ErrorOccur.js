import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

ErrorOccur.propTypes = {
  error: PropTypes.object,
};

export default function ErrorOccur({ error, ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        {error.code}
      </Typography>
      <Typography variant="body2" align="center">
        {error.message}
      </Typography>
    </Paper>
  )
}