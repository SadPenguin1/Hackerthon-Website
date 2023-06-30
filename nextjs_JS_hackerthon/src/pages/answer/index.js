
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
import Traloi from './Traloi';
// layouts
import Layout from '../../layouts';
import ExerciseDetails, { ExerciseEditional } from '../exercises/[id]';
import { capitalCase } from 'change-case';
import useTabs from 'src/hooks/useTabs';
import SolutionNewPostForm from '../solution/[id]/create';
import SolutionList from '../solution/[id]/list';
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

ExerciseDetailsAndMonaco.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

export default function ExerciseDetailsAndMonaco() {

    const dispatch = useDispatch();

    const { exercise } = useSelector((state) => state.hackerthonExercise);
    const { exercises, search } = useSelector((state) => state.hackerthonExercise);

    const router = useRouter();
    const { id } = router.query;

    const { currentTab, onChangeTab } = useTabs('description');

    useEffect(() => {
        dispatch(getExercise(id));
    }, []);

    const TABS = [
        {
            value: 'description', label: 'Description',
            icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
            component: <ExerciseDetails />,
        },
        {
            value: 'editional', label: 'Editional',
            icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
             component: <ExerciseEditional />,
        },
        {
            value: 'solutions', label: 'Solutions',
            icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
            component: <SolutionList />,
        },
        {
            value: 'submissions', label: 'Submissions',
            icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
            // component: <ProfileGallery gallery={_userGallery} />,
        },
    ];
    return (
        <Grid container spacing={2} marginTop={10} >
            <Grid item xs={6}>
                <RootStyle>

                    {/* <Paper sx={{ width: 730, height: 500 }}> */}
                    <Card
                        sx={{
                            width: 730,
                            mb: 1,
                            height: 700,
                            position: 'relative',
                        }}
                    >
                        <Tabs
                            allowScrollButtonsMobile
                            variant="scrollable"
                            scrollButtons="auto"
                            value={currentTab}
                            onChange={onChangeTab}
                            sx={{ px: 2, bgcolor: 'background.neutral' }}
                        >
                            {TABS.map((tab) => (
                                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />

                            ))}
                        </Tabs>
                        {TABS.map((tab) => {
                            const isMatched = tab.value === currentTab;
                            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                        })}
                        {/* <ExerciseDetails /> */}
                    </Card>

                    {/* </Paper> */}

                </RootStyle>
            </Grid>
            < Grid item xs={6}>
                <Traloi />
            </Grid>
        </Grid>
    );
}
