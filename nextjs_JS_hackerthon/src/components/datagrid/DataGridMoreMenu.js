// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// // @mui
// import { IconButton, MenuItem } from '@mui/material';
// // components
// import Iconify from '../Iconify';
// import MenuPopover from '../MenuPopover';
// import useLocales from '../../hooks/useLocales';

// // ----------------------------------------------------------------------

// DataGridMoreMenu.propTypes = {
//   onDelete: PropTypes.func,
//   pathView: PropTypes.string,
//   pathEdit: PropTypes.string
// };

// export default function DataGridMoreMenu({ onDelete, pathView, pathEdit }) {
//   const [open, setOpen] = useState(null);
//   const { translate } = useLocales();

//   const handleOpen = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleClose = () => {
//     setOpen(null);
//   };

//   const ICON = {
//     mr: 2,
//     width: 20,
//     height: 20,
//   };

//   return (
//     <>
//       <IconButton onClick={handleOpen}>
//         <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
//       </IconButton>

//       <MenuPopover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         arrow="right-top"
//         sx={{
//           mt: -1,
//           width: 160,
//           '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
//         }}
//       >
//         <MenuItem component={RouterLink} to={pathView}>
//           <Iconify icon={'eva:eye-fill'} sx={{ ...ICON }} />
//           {translate("button.view")}
//         </MenuItem>

//         <MenuItem component={RouterLink} to={pathEdit}>
//           <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
//           {translate("button.edit")}
//         </MenuItem>

//         <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
//           <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
//           {translate("button.delete")}
//         </MenuItem>
//       </MenuPopover>
//     </>
//   );
// }