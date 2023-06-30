
import { useEffect, useState } from 'react';
// next
import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { getExam, getExams, } from '../../redux/slices/hackerthon/hackerthon.exam';
import { getExercise, getExercises, } from '../../redux/slices/hackerthon/hackerthon.exercise';
import Scrollbar from 'src/components/Scrollbar';
import Iconify from 'src/components/Iconify';
// @mui
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

// --------------------------------------------------------------------
const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2)
  },
}));

export default function ExamDetails({ id, handleClose }) {
  const { exams, search } = useSelector((state) => state.hackerthonExam);
  const { exercises, search} = useSelector((state) => state.hackerthonExercise)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExams());
  }, [search]);
  // useEffect(() => {
  //   dispatch(getExams());
  // }, [search]);
  // const item = exams.find(element => element.id === id);
  const item = exams.find(exam => exam.id === id);
  // const item = exams.find(element => element.id === selectedItemId);
  console.log(item)
  return (
    <RootStyle>
      {/* <MailDetailsToolbar mail={item} /> */}
      <Divider />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
          <MarkdownWrapperStyle>
            {/* <Markdown children={item.title} /> */}
            <Markdown children={item.description} />
          </MarkdownWrapperStyle>
        </Box>
      </Scrollbar>

      {/* {isAttached && <MailDetailsAttachments mail={mail}  />} */}

      <Divider />
      {/* <Typography onClick={handleClose}>Close</Typography> */}
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>

          <Link href="/answer">Do </Link>

        </Button>
      </Box>
      {/* <MailDetailsReplyInput /> */}
    </RootStyle>
  );
}
