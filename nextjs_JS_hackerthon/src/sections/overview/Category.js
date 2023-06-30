// @mui
import { Typography, Grid, Box, Paper } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { CATEGORY_LIST, FOUNDATION_LIST } from './PathConfig';
import Lich from './Lich';
import { useDispatch, useSelector } from '../../redux/store';

import { useEffect, useState } from 'react';
import { getCategories } from '../../redux/slices/hackerthon/hackerthon.category';
// ----------------------------------------------------------------------

export default function Category() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const { categories, search } = useSelector((state) => state.hackerthonCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [search]);

  console.log(categories)
  console.log(CATEGORY_LIST)
  return (
    <Grid container spacing={2} >
      <Grid item xs={9}>
        <Paper
          sx={{
            display: 'flex',
            gap: 0.5,
            gridTemplateColumns: { xs: 'repeat(0,2, 1fr)', md: 'repeat(10, 1fr)' },
          }}
        >
          {categories?.map((item) => (
            <ComponentCard key={item.title} item={item} />
          ))}
        </Paper >
      </Grid>
    </Grid>
  );
}
