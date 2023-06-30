import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Button,
  Card, Checkbox, Container, IconButton, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
// redux
import Markdown from '../../../components/Markdown';
import { TableNoData } from '../../../components/table';
import { useDispatch, useSelector } from '../../../redux/store';
import VideoMoreMenu from '../../../sections/hackerthon/exercise/ExerciseMoreMenu';
// import ExamSituationList from '../../../sections/hackerthon/examExercise/ExamExerciseList';

// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import Iconify from '../../../components/Iconify';
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
// sections
import ConfirmDialog from '../../../components/ConfirmDialog';
import { getExercises, setExerciseSearch } from '../../../redux/slices/hackerthon/hackerthon.exercise';
import { deleteExerciseAPI, deleteExercisesAPI, processExerciseAPI } from '../../../service/hackerthon/hackerthon.exercise.service';
// sections
import DataGridListHead from '../../../components/datagrid/DataGridListHead';
import DataGridListToolbar from '../../../components/datagrid/DataGridListToolbar';
import DataGridMoreMenu from '../../../components/datagrid/DataGridMoreMenu';

import { FormProvider } from '../../../components/hook-form';
import Image from '../../../components/Image';
import Label from '../../../components/Label';
import TableFilterSlidebar from '../../../components/table/TableFilterSlidebar';
import VideoPlayerPreview from '../../../components/VideoPlayerPreview';
import { mediaBaseURL } from '../../../config';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function ExerciseList() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const TABLE_HEAD = [
    { id: 'orderNo', label: translate('hackerthon.category.orderNo'), alignRight: false, checked: true, sort: true },
    { id: 'title', label: translate('hackerthon.exercise.title'), alignRight: false, checked: true, sort: true },
    { id: 'filename', label: translate('hackerthon.exercise.filename'), alignRight: false, checked: false, sort: false },
    { id: 'category', label: translate('hackerthon.exercise.category'), alignRight: false, checked: true, sort: false },
    { id: 'description', label: translate('hackerthon.exercise.description'), alignRight: false, checked: false, sort: false, },
    { id: 'createdAt', label: translate('hackerthon.exercise.createdAt'), alignRight: false, checked: false, sort: true },
    { id: '', label: translate('label.actions'), alignRight: true, checked: true, sort: false }
  ];
  const { exercises, totalElements, numberOfElements, search, error } = useSelector((state) => state.exercise);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [openFilter, setOpenFilter] = useState(false);

  const [video, setVideo] = useState({});
  const [openVideoPreview, setOpenVideoPreview] = useState(false);

  const previewVideo = async (item) => {
    setVideo(item);
    setOpenVideoPreview(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getExercises());
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);// eslint-disable-line react-hooks/exhaustive-deps

  // sap xep
  const handleRequestSort = (property) => {
    const isAsc = search.orders[0].property === property && search.orders[0].order === 'asc';
    const order = (isAsc ? 'desc' : 'asc');

    dispatch(setExerciseSearch({
      ...search, orders: [
        {
          order,
          property
        }
      ]
    }));
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = exercises.map((n) => n.id);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setExerciseSearch({
      ...search, page: 0, size: parseInt(event.target.value, 10)
    }));
  };

  const handleChangePage = (page) => {
    dispatch(setExerciseSearch({
      ...search, page
    }));
  };

  const handleFilterByName = (value) => {
    dispatch(setExerciseSearch({
      ...search, value
    }));
  };

  const handleDeleteItem = async (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const handleProcessItem = async (id) => {
    const resp = await processExerciseAPI(id);

    if (resp.code === "200") {
      enqueueSnackbar(translate('message.updateSuccess'), { variant: 'success' });
      dispatch(getExercises());
    } else
      enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  const confirmDeleteItem = async () => {
    let resp;
    if (selected.length > 0)
      resp = await deleteExercisesAPI(selected);
    else
      resp = await deleteExerciseAPI(selectedId);

    handleDeleteResponse(resp);
  };

  const handleDeleteItems = async () => {
    setOpen(true);
  };

  const handleDeleteResponse = (resp) => {
    setOpen(false);
    if (resp.code === "200") {
      enqueueSnackbar(translate('message.deleteSuccess'), { variant: 'success' });
      dispatch(getExercises());
      setSelected([]);
    } else
      enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  const defaultValues = {
    checkedColumns: TABLE_HEAD.filter(item => item.checked).map(item => item.label),
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch } = methods;

  const { checkedColumns } = watch();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    handleCloseFilter();
  };

  return (
    <Page title={translate('hackerthon.exercise.listExercise')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('hackerthon.exercise.listExercise')}
          links={[
            { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('menu.hackerthon'),
              href: PATH_DASHBOARD.hackerthon.root,
            },
            { name: translate('menu.exercise') },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.hackerthon.newExercise}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('button.new')}
            </Button>
          }
        />

        <FormProvider methods={methods}>
          <TableFilterSlidebar
            onResetAll={handleResetFilter}
            isOpen={openFilter}
            onOpen={handleOpenFilter}
            onClose={handleCloseFilter}
            columns={TABLE_HEAD.map(item => item.label)}
          />
        </FormProvider>

        <Card>
          <DataGridListToolbar
            numSelected={selected.length}
            filterName={search.value}
            onFilterName={handleFilterByName}
            onDelete={() => handleDeleteItems()}
            showFilter={handleOpenFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DataGridListHead
                  order={search.orders[0].order}
                  orderBy={search.orders[0].property}
                  headLabel={TABLE_HEAD.filter(head => checkedColumns.indexOf(head.label) > -1)}
                  rowCount={numberOfElements}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                   {/* <TableBody>
                  {exercises.map((row) => (
                    <MyTableRow
                      row={row}
                      key={row.id}
                      TABLE_HEAD={TABLE_HEAD}
                      checkedColumns={checkedColumns}
                      selected={selected}
                      handleClick={handleClick}
                      handleDeleteItem={handleDeleteItem}
                    />
                  ))}
                  <TableNoData
                    isNotFound={numberOfElements === 0}
                    error={error}
                    length={checkedColumns.length + 1}
                    searchQuery={search.value}
                  />
                </TableBody> */}
                <TableBody>
                  {exercises.map((row) => {
                    const { id } = row;

                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                        </TableCell>

                        {TABLE_HEAD.map(head => {
                          if (checkedColumns.indexOf(head.label) === -1) return null;

                          if (head.id === 'title')
                            return (
                              <TableCell sx={{ display: 'flex', alignItems: 'center' }} key={head.id}>
                                <Image
                                  onClick={() => previewVideo(row)}
                                  disabledEffect
                                  alt={row[head.id]}
                                  src={`${mediaBaseURL}/stream/video/${id}/thumbnail/thumb.jpg?token=${row.token}`}
                                  sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                                />
                                <Typography variant="subtitle2">
                                  {row[head.id]}
                                  <br />
                                  {/* <Typography variant="caption">{row.id}</Typography> */}
                                </Typography>
                              </TableCell>
                            );

                        
                          if (head.id === '')
                            return <TableCell align="right" key={head.id}>
                              <VideoMoreMenu pathEdit={`${PATH_DASHBOARD.hackerthon.root}/exercise/${id}/edit`}
                                pathView={`${PATH_DASHBOARD.hackerthon.root}/exercise/${id}/view`}
                                onDelete={() => handleDeleteItem(id)} onProcess={() => handleProcessItem(id)} />
                            </TableCell>;

                          if (head.id === 'category')
                            return <TableCell key={head.id}>
                              <Typography variant="subtitle2" noWrap>
                                {row[head.id].id}
                              </Typography>
                            </TableCell>;

                          // if (head.id === '')
                          // return <TableCell key={head.id}>
                          //   <Typography variant="subtitle2" noWrap>
                          //     {row[head.id].id}
                          //   </Typography>
                          // </TableCell>;

                          if (head.id === 'description')
                            return (
                              <TableCell key={head.id}>
                                <Markdown children={row[head.id]} />
                              </TableCell>
                            );

                          return (<TableCell key={head.id}>
                            {row[head.id]}
                          </TableCell>);
                        })}
                      </TableRow>
                    );
                  })}

                  <TableNoData
                    isNotFound={numberOfElements === 0}
                    error={error}
                    length={checkedColumns.length + 1}
                    searchQuery={search.value}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={search.size}
            page={search.page}
            onPageChange={(_, value) => handleChangePage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <ConfirmDialog values={{ title: translate("message.dialogDeleteTitle"), content: translate("message.dialogDeleteContent") }}
          onClose={() => setOpen(false)} isOpen={open} onSubmit={confirmDeleteItem} />
      </Container>
      <VideoPlayerPreview
        video={video}
        isOpen={openVideoPreview}
        onClose={() => setOpenVideoPreview(false)}
      />
    </Page >
  );

}
function MyTableRow({ row, TABLE_HEAD, checkedColumns, selected, handleClick, handleDeleteItem }) {
  const { id } = row;
  const isItemSelected = selected.indexOf(id) !== -1;
  const [expandRow, setExpandRow] = useState(false);
  const handleOpen = () => {
    setExpandRow(!expandRow);
  };

  return (
    <Fragment key={id}>
      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isItemSelected} aria-checked={isItemSelected}>
        <TableCell padding="checkbox">
          <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
        </TableCell>

        {TABLE_HEAD.map((head) => {
          if (checkedColumns.indexOf(head.label) === -1) return null;

          if (head.id === 'title')
            return (
              <TableCell key={head.id}>
                <Markdown children={row[head.id]} />
              </TableCell>
            );

          if (head.id === 'description')
            return (
              <TableCell key={head.id}>
                <Markdown children={row[head.id]} />
              </TableCell>
            );

          if (head.id === '')
            return (
              <TableCell align="right" key={head.id}>
                <IconButton onClick={handleOpen}>
                  {expandRow ? (
                    <Iconify icon={'ant-design:minus-outlined'} width={20} height={20} />
                  ) : (
                    <Iconify icon={'ant-design:plus-outlined'} width={20} height={20} />
                  )}
                </IconButton>
                <DataGridMoreMenu
                  pathEdit={`${PATH_DASHBOARD.hackerthon.root}/exam/${id}/edit`}
                  pathView={`${PATH_DASHBOARD.hackerthon.root}/exam/${id}/view`}
                  onDelete={() => handleDeleteItem(id)}
                />
              </TableCell>
            );

          return <TableCell key={head.id}>{row[head.id]}</TableCell>;
        }
        )}
      </TableRow>
      {expandRow && (
        <TableRow hover tabIndex={-1}>
          <TableCell colSpan={checkedColumns.length + 1}>
            {/* <ExamSituationList item={row} key={id} /> */}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
