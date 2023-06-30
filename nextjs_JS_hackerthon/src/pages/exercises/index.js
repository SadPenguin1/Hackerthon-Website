// @mui
import { styled } from '@mui/material/styles';
import { Container, Grid ,Typography} from '@mui/material';
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
import ExerciseList from './list';

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
    <Page title="Day la nha">
      <RootStyle>

        <Grid container spacing={2} >

          <Container sx={{ mt: 10 }}>
            <Grid item xs={9}>
            </Grid>
            <Grid item xs={9}>
              {/* <Cauhoi /> */}
              <ExerciseList />
            </Grid>

          </Container>
        </Grid>
      </RootStyle>
    </Page >
  );
}
