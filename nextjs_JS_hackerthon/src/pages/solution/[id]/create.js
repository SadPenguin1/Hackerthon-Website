import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete, Paper } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import { getExercise } from 'src/redux/slices/hackerthon/hackerthon.exercise';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { createSolutionAPI } from 'src/service/hackerthon/hackerthon.solution.service';
import Scrollbar from 'src/components/Scrollbar';

// ----------------------------------------------------------------------

// const TAGS_OPTION = [
//   'Toy Story 3',
//   'Logan',
//   'Full Metal Jacket',
//   'Dangal',
//   'The Sting',
//   '2001: A Space Odyssey',
//   "Singin' in the Rain",
//   'Toy Story',
//   'Bicycle Thieves',
//   'The Kid',
//   'Inglourious Basterds',
//   'Snatch',
//   '3 Idiots',
// ];

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function SolutionNewPostForm() {

    const { exercise } = useSelector((state) => state.hackerthonExercise);
    const { exercises, search } = useSelector((state) => state.hackerthonExercise);



    const { push } = useRouter();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        dispatch(getExercise(id));
    }, []);
    console.log(exercise)




    const [open, setOpen] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleOpenPreview = () => {
        setOpen(true);
    };

    const handleClosePreview = () => {
        setOpen(false);
    };

    const NewSolutionSchema = Yup.object().shape({
        //title: Yup.string().required('Title is required'),
        // description: Yup.string().required('Description is required'),
        content: Yup.string().required('Content is required'),
        // cover: Yup.mixed().required('Cover is required'),
    });


    const defaultValues = {
        //  title: '',
        // description: '',
        content: '',
        // cover: null,
        // tags: ['Logan'],
        // publish: true,
        // comments: true,
        // metaTitle: '',
        //metaDescription: '',
        //metaKeywords: ['Logan'],
    };

    const methods = useForm({
        resolver: yupResolver(NewSolutionSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();

    const onSubmit = async () => {
        const requestData = {
            exercise: {
                id: exercise.id
            },
            content: '',
        };
        try {

            var resp = await createSolutionAPI(requestData);
            console.log(resp);
            setResponse(resp);


            console.log("oke");
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>

            <Paper sx={{ width: 730, height: 500}}>
                <Scrollbar sx={{ flexGrow: 1 }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <Card sx={{ p: 3 }}>
                                    <Stack spacing={3}>
                                        <Typography>{exercise.title}</Typography>

                                        <LabelStyle>Content</LabelStyle>
                                        <RHFEditor name="content" />
                                        <Button variant="contained" color="primary" onClick={() => onSubmit()} >Submitttt</Button>
                                    </Stack>
                                </Card>

                            </Grid>
                        </Grid>
                    </FormProvider>
                </Scrollbar>
            </Paper>
        </>
    );
}
