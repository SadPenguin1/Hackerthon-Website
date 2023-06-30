
import { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader, Tab, Tabs, Paper } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
import Label from 'src/components/Label';
import { capitalCase } from 'change-case';
// ----------------------------------------------------------------------

// --------------------------------------------------------------------
const RootStyle = styled('div')({
  flexGrow: 3,
  display: 'flex',
  flexDirection: 'column',
});

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2)
  },
}));

ExerciseDetails.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

export default function ExerciseDetails() {

  const dispatch = useDispatch();

  const { exercise } = useSelector((state) => state.hackerthonExercise);
  const { exercises, search } = useSelector((state) => state.hackerthonExercise);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getExercise(id));
  }, []);

  return (
    <Grid marginTop={0}>
      <RootStyle>
      
      <Paper sx={{ width: 730, height: 500 }}>

        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h3" gutterBottom>
              {exercise?.title}
            </Typography>
            <MarkdownWrapperStyle>
              <Markdown children={exercise?.description} />
              <Typography variant="h6" gutterBottom>
                Input:
              </Typography>
              <Markdown children={exercise?.input} />
              <Typography variant="h6" gutterBottom>
                ExpectedOutput:
              </Typography>
              <Markdown children={exercise?.output} />

            </MarkdownWrapperStyle>
          </Box>
        </Scrollbar>
       
        </Paper>
  
      </RootStyle>
    </Grid>
  );
}

export  function ExerciseEditional() {

  const dispatch = useDispatch();

  const { exercise } = useSelector((state) => state.hackerthonExercise);
  const { exercises, search } = useSelector((state) => state.hackerthonExercise);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getExercise(id));
  }, []);

  return (
    <Grid marginTop={0}>
      <RootStyle>
      
      <Paper sx={{ width: 730, height: 500 }}>

        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h3" gutterBottom>
              {exercise?.title}
            </Typography>
            <MarkdownWrapperStyle>
              <Markdown children={exercise?.editional} />

            </MarkdownWrapperStyle>
          </Box>
        </Scrollbar>
       
        </Paper>
       
      </RootStyle>
    </Grid>
  );
}
  