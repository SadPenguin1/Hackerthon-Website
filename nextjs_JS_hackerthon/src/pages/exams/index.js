// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ComponentMUI, ComponentHero, ComponentExtra, ComponentFoundation } from '../../sections/overview';
import Tongquan from 'src/sections/overview/Tongquan';
import Danhmuc from 'src/sections/overview/Danhmuc';
import Cauhoi from 'src/pages/exercises/exerciseList';
import Category from 'src/sections/overview/Category';
import ExamList from 'src/pages/exams/list';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

Overview.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Overview() {
  return (
    <Page >
      <RootStyle>
        <Container sx={{ mt: 10 }}>
          <ExamList />
        </Container>
      </RootStyle>
    </Page>
  );
}
