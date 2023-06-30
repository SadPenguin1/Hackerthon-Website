
import { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader, Tabs, Tab, TableContainer, Table, TableBody, TablePagination, FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';

import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
import NextLink from 'next/link';
import { navigate } from 'next/router'


// sections
// @mui
import { styled } from '@mui/material/styles';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from 'src/components/table';

import { InvoiceTableRow, InvoiceTableToolbar } from 'src/sections/@dashboard/invoice/list';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------
import { useTheme } from '@mui/material/styles';
// hooks


import useTabs from 'src/hooks/useTabs';
import useSettings from 'src/hooks/useSettings';
import useTable, { emptyRows, getComparator } from 'src/hooks/useTable';
import { _invoices } from 'src/_mock';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
import { sumBy } from 'lodash';
import ExcerciseAnalytic from 'src/sections/@dashboard/exercise/ExerciseAnalytic';
import { ExerciseTableRow, ExerciseTableToolbar } from 'src/sections/@dashboard/exercise/list';
import { getCategories } from 'src/redux/slices/hackerthon/hackerthon.category';
// --------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});



const TABLE_HEAD = [
  { id: 'title', label: 'title', align: 'left', width: 400 },
  { id: 'dueDate', label: 'Solution', align: 'left' },
  { id: 'price', label: 'Acceptance', align: 'center', width: 140 },
  { id: 'difficulty', label: 'Difficulty', align: 'left' },
  { id: 'sent', label: 'Frequency', align: 'center', width: 140 },
  { id: '' },
  ,
];

// ----------------------------------------------------------------------

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2)
  },
}));

ExerciseList.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

export default function ExerciseList() {
  const dispatch = useDispatch();

  let router = useRouter();
  router.query.id

  const { exercises, search } = useSelector((state) => state.hackerthonExercise);
  const { exercise, id } = useSelector((state) => state.hackerthonExercise);

  const { categories } = useSelector((state) => state.hackerthonCategory)
  const categoryTitles = categories.map(category => category.title);


  useEffect(() => {
    dispatch(getExercises());
  }, [search]);
  console.log(exercises)

  useEffect(() => {
    dispatch(getCategories());
  }, []);


  const CATEGORY_OPTIONS = ['all', ...categoryTitles];
  console.log(CATEGORY_OPTIONS)

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'title' });

  const [tableData, setTableData] = useState(exercises);

  useEffect(() => {
    setTableData(exercises);
  }, [exercises]);
  console.log(tableData)

  const [filterName, setFilterName] = useState('');

  const [filterTitle, setFilterTitle] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterCategory, setFilterCategory] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');
  const { currentTab: filterDifficulty, onChangeTab: onFilterDifficulty } = useTabs('all');


  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterTitle = (filterTitle) => {
    setFilterName(filterTitle);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleFilterCategory = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {

    router.push(`/answer/${id}`);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterTitle,
    filterService,
    filterCategory,
    filterStatus,
    filterDifficulty,
    filterStartDate,
    filterEndDate,
  });

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterTitle) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterDifficulty) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterCategory) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  // const getLengthByStatus = (status) => tableData.filter((item) => item.status === status).length;
  const getLengthByDifficulty = (difficulty) => tableData.filter((item) => item.difficulty === difficulty).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalPrice'
    );

  // const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;
  const getPercentByDifficulty = (difficulty) => (getLengthByDifficulty(difficulty) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'info', count: tableData.length },
    { value: 'easy', label: 'Easy', color: 'default', count: getLengthByDifficulty('easy') },
    { value: 'medium', label: 'Medium', color: 'success', count: getLengthByDifficulty('medium') },
    { value: 'hard', label: 'Hard', color: 'warning', count: getLengthByDifficulty('hard') },
    { value: 'extreme', label: 'Extreme', color: 'error', count: getLengthByDifficulty('extreme') },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>


      <Card sx={{ mb: 5 }}>
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <ExcerciseAnalytic
              title="Total"
              total={tableData.length}
              percent={100}
              price={sumBy(tableData, 'totalPrice')}
              icon="ic:round-receipt"
              color={theme.palette.info.main}
            />
            <ExcerciseAnalytic
              title="Easy"
              total={getLengthByDifficulty('easy')}
              percent={getPercentByDifficulty('easy')}
              price={getTotalPriceByStatus('easy')}
              icon="eva:checkmark-circle-2-fill"
              color={theme.palette.text.main}
            />
            <ExcerciseAnalytic
              title="Medium"
              total={getLengthByDifficulty('medium')}
              percent={getPercentByDifficulty('medium')}
              price={getTotalPriceByStatus('medium')}
              icon="eva:clock-fill"
              color={theme.palette.success.main}
            />
            <ExcerciseAnalytic
              title="Hard"
              total={getLengthByDifficulty('hard')}
              percent={getPercentByDifficulty('hard')}
              price={getTotalPriceByStatus('hard')}
              icon="eva:bell-fill"
              color={theme.palette.warning.main}
            />
            <ExcerciseAnalytic
              title="Extreme"
              total={getLengthByDifficulty('extreme')}
              percent={getPercentByDifficulty('extreme')}
              price={getTotalPriceByStatus('extreme')}
              icon="eva:file-fill"
              color={theme.palette.error.secondary}
            />
          </Stack>
        </Scrollbar>
      </Card>

      <Card>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={filterDifficulty}
          onChange={onFilterDifficulty}
          sx={{ px: 2, bgcolor: 'background.neutral' }}
        >
          {TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              label={
                <Stack spacing={1} direction="row" alignItems="center">
                  <div>{tab.label}</div> <Label color={tab.color}> {tab.count} </Label>
                </Stack>
              }
            />
          ))}
        </Tabs>

        <Divider />

        <ExerciseTableToolbar
          filterName={filterName}
          filterTitle={filterTitle}
          filterService={filterService}
          filterCategory={filterCategory}
          filterStartDate={filterStartDate}
          filterEndDate={filterEndDate}
          onFilterName={handleFilterName}
          onFilterTitle={handleFilterTitle}
          onFilterService={handleFilterService}
          onFilterCategory={handleFilterCategory}
          onFilterStartDate={(newValue) => {
            setFilterStartDate(newValue);
          }}
          onFilterEndDate={(newValue) => {
            setFilterEndDate(newValue);
          }}

          optionsCategory={CATEGORY_OPTIONS}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                actions={
                  <Stack spacing={1} direction="row">
                    <Tooltip title="Sent">
                      <IconButton color="primary">
                        <Iconify icon={'ic:round-send'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download">
                      <IconButton color="primary">
                        <Iconify icon={'eva:download-outline'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Print">
                      <IconButton color="primary">
                        <Iconify icon={'eva:printer-fill'} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                // onSelectAllRows={(checked) =>
                //   onSelectAllRows(
                //     checked,
                //     tableData.map((row) => row.id)
                //   )
                // }
              />

              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <ExerciseTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                  />
                ))}

                <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </Container>

  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterTitle,
  filterStatus,
  filterService,
  filterCategory,
  filterStartDate,
  filterEndDate,
  filterDifficulty,
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  // if (filterName) {
  //   tableData = tableData.filter(
  //     (item) =>
  //       item.status.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
  //       item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  //   );
  // }
  if (filterTitle) {
    tableData = tableData.filter(
      (item) =>
        // item.status.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1 ||
        item.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1
    );
  }


  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }
  if (filterDifficulty !== 'all') {
    tableData = tableData.filter((item) => item.difficulty === filterDifficulty);
  }

 
  if (filterCategory !== 'all') {
    tableData = tableData.filter((item) => item.category.title === filterCategory);
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item) =>
        item.title.getTime() >= filterStartDate.getTime() && item.title.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
