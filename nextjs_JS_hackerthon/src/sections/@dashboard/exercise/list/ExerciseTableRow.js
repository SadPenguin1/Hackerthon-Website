import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

ExerciseTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ExerciseTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  let router = useRouter();
  router.query.id
  // const { sent, invoiceNumber, createDate, dueDate, status, invoiceTo, totalPrice } = row;
  const { title, difficulty, solution, acceptance, status, frequency } = row;

  // const [openMenu, setOpenMenuActions] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpenMenuActions(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpenMenuActions(null);
  // };

  return (

    <TableRow >

      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}
      <TableCell align="left"> <Link noWrap variant="body1" onClick={onViewRow} sx={{
        color: 'black', // Màu chữ đen
        cursor: 'pointer',
        
        '&:hover': {
          color: '#1976d2',
          textDecoration: 'none', // Gạch chân khi hover
        },
      }}>
        {title}
      </Link> </TableCell>

      <TableCell align="left">{(solution)}</TableCell>

      <TableCell align="center">{(acceptance)}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (difficulty === 'easy' && 'default') ||
            (difficulty === 'medium' && 'success') ||
            (difficulty === 'hard' && 'warning') ||
            (difficulty === 'extreme' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {difficulty}
        </Label>
      </TableCell>
      <TableCell align="center">{(frequency)}</TableCell>
    </TableRow>

  );
}
