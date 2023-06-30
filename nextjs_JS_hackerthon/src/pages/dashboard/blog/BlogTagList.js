import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
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
import SearchNotFound from '../../../components/SearchNotFound';
import NextLink from 'next/link';
// sections
import ConfirmDialog from '../../../components/ConfirmDialog';
import ErrorOccur from '../../../components/ErrorOccur';
import { getBlogTags, setBlogTagSearch } from '../../../redux/slices/blog/blog.tag';
import { deleteBlogTagAPI, deleteBlogTagsAPI } from '../../../service/blog/blog.tag.service';
// sections
import DataGridListHead from '../../../components/datagrid/DataGridListHead';
import DataGridListToolbar from '../../../components/datagrid/DataGridListToolbar';
import DataGridMoreMenu from '../../../components/datagrid/DataGridMoreMenu';
import { FormProvider } from '../../../components/hook-form';
import Markdown from '../../../components/Markdown';
import useLocales from '../../../hooks/useLocales';
import TagFilterSidebar from '../../../sections/@dashboard/blog/TagFilterSidebar';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function BlogTagList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { tags, totalElements, numberOfElements, search, error } = useSelector((state) => state.blogTag);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const { translate } = useLocales();
  const TABLE_HEAD = [
    { id: 'id', label: translate('blog.tag.id'), alignRight: false, checked: false, sort: true },
    { id: 'title', label: translate('blog.tag.title'), alignRight: false, checked: true, sort: true },
    { id: 'seoMeta.title', label: translate('blog.tag.metaTitle'), alignRight: false, checked: false, sort: true },
    { id: 'slug', label: translate('blog.tag.slug'), alignRight: false, checked: false, sort: false },
    { id: 'seoMeta.description', label: translate('blog.tag.metaDescription'), alignRight: false, checked: true, sort: false },
    { id: 'description', label: translate('blog.tag.description'), alignRight: false, checked: false, sort: false },
    { id: 'createdAt', label: translate('blog.tag.createdAt'), alignRight: false, checked: true, sort: true },
    { id: 'createdBy', label: translate('blog.tag.createdBy'), alignRight: false, checked: false, sort: false },
    { id: '', label: translate('label.actions'), alignRight: true, checked: true, sort: false },
  ];
  // goi lai redux neu search thay doi
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getBlogTags());
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  // sap xep
  const handleRequestSort = (property) => {
    const isAsc = search.orders[0].property === property && search.orders[0].order === 'asc';
    const order = isAsc ? 'desc' : 'asc';

    dispatch(
      setBlogTagSearch({
        ...search,
        orders: [
          {
            order,
            property,
          },
        ],
      })
    );
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = tags.map((n) => n.id);
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
    dispatch(
      setBlogTagSearch({
        ...search,
        page: 0,
        size: parseInt(event.target.value, 10),
      })
    );
  };

  const handleChangePage = (page) => {
    dispatch(
      setBlogTagSearch({
        ...search,
        page,
      })
    );
  };

  const handleFilterByName = (value) => {
    dispatch(
      setBlogTagSearch({
        ...search,
        value,
      })
    );
  };

  const handleDeleteTag = async (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const confirmDeleteTag = async () => {
    let resp;
    if (selected.length > 0) resp = await deleteBlogTagsAPI(selected);
    else resp = await deleteBlogTagAPI(selectedId);

    handleDeleteResponse(resp);
  };

  const handleDeleteItems = async () => {
    setOpen(true);
  };

  const handleDeleteResponse = (resp) => {
    setOpen(false);
    if (resp.code === '200') {
      enqueueSnackbar(translate('message.deleteSuccess'), { variant: 'success' });
      dispatch(getBlogTags());
      setSelected([]);
    } else enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  const defaultValues = {
    checkedColumns: TABLE_HEAD.filter((item) => item.checked).map((item) => item.label),
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
    <Page title={translate('blog.tag.listTag')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('blog.tag.listTag')}
          links={[
            { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('menu.blog'),
              href: PATH_DASHBOARD.blog.root,
            },
            { name: translate('blog.tag.listTag') },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.blog.newTag} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Post
              </Button>
            </NextLink>
          }
        />

        <FormProvider methods={methods}>
          <TagFilterSidebar
            onResetAll={handleResetFilter}
            isOpen={openFilter}
            onOpen={handleOpenFilter}
            onClose={handleCloseFilter}
            columns={TABLE_HEAD.map((item) => item.label)}
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
                  headLabel={TABLE_HEAD.filter((head) => checkedColumns.indexOf(head.label) > -1)}
                  rowCount={numberOfElements}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {tags.map((row) => {
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

                        {TABLE_HEAD.map((head) => {
                          if (checkedColumns.indexOf(head.label) === -1) return null;

                          if (head.id === '')
                            return (
                              <TableCell align="right" key={head.id}>
                                <DataGridMoreMenu
                                  pathEdit={`${PATH_DASHBOARD.blog.root}/tag/${id}/edit`}
                                  pathView={`${PATH_DASHBOARD.blog.root}/tag/${id}/view`}
                                  onDelete={() => handleDeleteTag(id)}
                                />
                              </TableCell>
                            );

                          if (head.id === 'description')
                            return (
                              <TableCell key={head.id}>
                                <Markdown children={row[head.id]} />
                              </TableCell>
                            );

                          if (head.id === 'createdBy')
                            return (
                              <TableCell sx={{ display: 'flex', alignItems: 'center' }} key={head.id}>
                                <Avatar
                                  alt={row[head.id].displayName}
                                  src={row[head.id].photoURL}
                                  sx={{ mr: 2, alignItems: 'center' }}
                                />
                                <Typography variant="subtitle2" noWrap>
                                  {row[head.id].displayName}
                                </Typography>
                              </TableCell>
                            );

                          if (head.id === 'seoMeta.description')
                            return <TableCell key={head.id}>{row.seoMeta?.description}</TableCell>;

                          if (head.id === 'seoMeta.title')
                            return <TableCell key={head.id}>{row.seoMeta?.title}</TableCell>;

                          return <TableCell key={head.id}>{row[head.id]}</TableCell>;
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>

                {numberOfElements === 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={checkedColumns.length + 1}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={search.value} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {error && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={checkedColumns.length + 1}>
                        <Box sx={{ py: 3 }}>
                          <ErrorOccur error={error} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalElements}
            rowsPerPage={search.size}
            page={search.page}
            onPageChange={(event, value) => handleChangePage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        <ConfirmDialog values={{ title: translate("message.dialogDeleteTitle"), content: translate("message.dialogDeleteContent") }}
          onClose={() => setOpen(false)} isOpen={open} onSubmit={confirmDeleteTag} />
      </Container>
    </Page>
  );
}
