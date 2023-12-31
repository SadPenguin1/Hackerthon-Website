import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { IconButton, MenuItem } from '@mui/material';
// components
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function ExerciseMoreMenu({ onDelete, pathEdit, pathView, onProcess }) {
  const [open, setOpen] = useState(null);
  const { translate } = useLocales();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem component={RouterLink} to={pathView}>
          <Iconify icon={'eva:eye-fill'} sx={{ ...ICON }} />
          {translate("button.view")}
        </MenuItem>

        <MenuItem component={RouterLink} to={pathEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {translate("button.edit")}
        </MenuItem>

        <MenuItem onClick={onProcess} sx={{ color: 'warning.main' }}>
          <Iconify icon={'uit:process'} sx={{ ...ICON }} />
          {translate("button.process")}
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {translate("button.delete")}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
