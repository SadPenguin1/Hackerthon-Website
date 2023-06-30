import PropTypes from 'prop-types';
import { useState ,useSelector} from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
//
import { useRouter } from 'next/router';
import { getExams } from 'src/redux/slices/hackerthon/hackerthon.exam';
// ----------------------------------------------------------------------

ExamTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,

};

export default function ExamTableRow({ row, selected,onViewRow, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  // const { exams, search } = useSelector((state) => state.hackerthonExam);

  // useEffect(() => {
  //   dispatch(getExams());
  // }, [search]);
  // console.log(exams)

  const { title, cover, createdAt, status, price } = row;
  let router = useRouter();
  router.query.id
  const handleDo = (id) => {

   router.push(`/exams/${id}`);
  }
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image disabledEffect alt={title} src={cover} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />

        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell>{fDate(createdAt)}</TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'out_of_date' && 'error') || (status === 'happenning' && 'warning') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status ? sentenceCase(status) : ''}
        </Label>
      </TableCell>

      <TableCell align="right">{fCurrency(price)}</TableCell>

      <TableCell align="right"  onClick={() => {
          onViewRow();
          handleDo();
          }}>
        
          <Iconify icon={'eva:edit-fill'} />
          Do
       
      </TableCell>
    </TableRow>
  );
}
