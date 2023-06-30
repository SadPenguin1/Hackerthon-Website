
import { useEffect, useRef, useState } from 'react';
// next
// import Markdown from '../../components/Markdown';
import { useRouter } from 'next/router';
import { Box, Stack, Grid, Container, Accordion, Typography, Button, Divider, Link, AccordionSummary, AccordionDetails, Card, CardHeader, Tab, Tabs, Paper, TextField, IconButton, FormControlLabel, Checkbox, AvatarGroup, InputAdornment } from '@mui/material';
import Iconify from 'src/components/Iconify';

// @mui
import { styled } from '@mui/material/styles';
// layouts
// import ExerciseDetails, { ExerciseEditional } from '../exercises/[id]';
import { capitalCase } from 'change-case';
import useTabs from 'src/hooks/useTabs';
import { useDispatch, useSelector } from 'react-redux';
import { getExercise } from 'src/redux/slices/hackerthon/hackerthon.exercise';
import Layout from 'src/layouts';
import { getSolutions } from 'src/redux/slices/hackerthon/hackerthon.solution';
import SolutionPostInput from './SolutionPostInput';
import SolutionPostCard from './SolutionPostCard';
import MyAvatar from 'src/components/MyAvatar';
import EmojiPicker from 'src/components/EmojiPicker';
import Markdown from 'src/components/Markdown';
import Scrollbar from 'src/components/Scrollbar';
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

SolutionList.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

export default function SolutionList() {

    // const dispatch = useDispatch();

    // const { exercise } = useSelector((state) => state.hackerthonExercise);

    // const router = useRouter();
    // const { id } = router.query;
    const { currentTab, onChangeTab } = useTabs('solutions');
    const TABS = [
        {
            value: 'solutions', label: 'Solutions',
            icon: <Iconify icon={'pepicons-pop:list'} width={20} height={20} />,
            component: <SolutionPostCard1 />,
        },
        {
            value: 'new', label: 'New',
            icon: <Iconify icon={'typcn:pen'} width={20} height={20} />,
            component: <SolutionPostInput />,
        },
    ];

    // useEffect(() => {
    //     dispatch(getExercise(id));
    // }, []);
    // useEffect(() => {
    //     dispatch(getSolutions)
    // }, []);

    const fileInputRef = useRef(null);

    const handleAttach = () => {
        fileInputRef.current?.click();
    };


    return (
        <Grid container spacing={2} >
            <Grid item xs={12}>
                <RootStyle>

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

                    </Card>

                </RootStyle>
            </Grid>
        </Grid>
    );
}
export function SolutionPostCard1({solution}) {

    const dispatch = useDispatch();

    const { exercise } = useSelector((state) => state.hackerthonExercise);

    const router = useRouter();
    const { id } = router.query;

    const { solutions, search } = useSelector((state) => state.hackerthonSolution)

    // const [isLiked, setLiked] = useState(solution.likes);

    // const [likes, setLikes] = useState(post.personLikes.length);


    useEffect(() => {
        dispatch(getExercise(id));
    }, []);
    useEffect(() => {
        dispatch(getSolutions())
    }, [search]);

    const filteredSolutions = solutions.filter(solution => solution.exercise.id === parseInt(id));

    console.log(filteredSolutions)
    console.log(solutions)
    // const handleLike = () => {
    //     setLiked(true);
    //     setLikes((prevLikes) => prevLikes + 1);
    //   };

    //   const handleUnlike = () => {
    //     setLiked(false);
    //     setLikes((prevLikes) => prevLikes - 1);
    //   };

    const RootStyle = styled('div')({
        flexGrow: 3,
        display: 'flex',
        flexDirection: 'column',
    });

    return (

        <Card marginTop={0}>
            <RootStyle>
                <Paper sx={{ width: 730, height: 610 }}>

                    <Scrollbar style={{ width: '100%', height: '100%' }} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1.5}>
                            {filteredSolutions.map((solution) => (

                                <Card >
                                    <Stack spacing={1} sx={{ p: 3 }}>
                                        {/* <Typography>{solution.content}</Typography> */}
                                        <Markdown children={solution?.content} />


                                        <Stack direction="row" alignItems="center">
                                        <Checkbox
                                                        size="small"
                                                        color="error"
                                                        // checked={isLiked}
                                                        icon={<Iconify icon={'eva:heart-fill'} />}
                                                        checkedIcon={<Iconify icon={'eva:heart-fill'} />}
                                                        // onChange={isLiked ? handleUnlike : handleLike}
                                                    />
                                                    <Typography variant="body2">{solution?.likes}</Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </Scrollbar>

                </Paper>
            </RootStyle>
        </Card>

    );
}
