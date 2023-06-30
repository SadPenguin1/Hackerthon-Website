
import { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
import { getExam, getExams, } from '../../redux/slices/hackerthon/hackerthon.exam';
import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
import Label from 'src/components/Label';
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

ExerciseOfExam.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

export default function ExerciseOfExam() {

  const dispatch = useDispatch();

  //const { exercise } = useSelector((state) => state.hackerthonExercise);
  // const { exercises, search } = useSelector((state) => state.hackerthonExercise);

  const {exam} = useSelector((state) => state.hackerthonExam)
   const {exams, search } = useSelector((state) => state.hackerthonExam);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getExams(id));
  }, []);

  const TABS = [
    { value: 'content', label: 'Description' },
    { value: 'editional', label: 'Editional' },
    { value: 'solutions', label: 'Solutions' },
    { value: 'submissions', label: 'Submissions' },

  ];
  return (
    <Grid marginTop={10}>
      <RootStyle>
        <Divider />
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          // value={filterStatus}
          // onChange={onFilterStatus}
          sx={{ px: 2, bgcolor: 'background.neutral' }}
        >
          {TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              label={
                <Stack spacing={1} direction="row" alignItems="center">
                  <div>{tab.label}</div>
                </Stack>
              }
            />
          ))}
        </Tabs>

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
        <Divider />
      </RootStyle>
    </Grid>
  );
}