import * as Yup from 'yup';

import { useEffect, useMemo, useRef, useState } from 'react';
// @mui
import { Box, Card, Button, TextField, IconButton, styled, Typography, Grid, Stack } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { getExercise } from 'src/redux/slices/hackerthon/hackerthon.exercise';
import { createSolutionAPI } from 'src/service/hackerthon/hackerthon.solution.service';
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Scrollbar from 'src/components/Scrollbar';
import { useSnackbar } from 'notistack';
// components
// import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function SolutionPostInput() {
  const fileInputRef = useRef(null);
  const { exercise } = useSelector((state) => state.hackerthonExercise);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;



  useEffect(() => {
    dispatch(getExercise(id));
  }, []);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = async (data) => {
    const requestData = {
      exercise: {
        id: exercise.id
      },
      content: data.content,
      likes:0
    };
    const resp = await createSolutionAPI(requestData);

    if (resp.code === '200') {
      console.log(resp.data)
      // reset();
      // enqueueSnackbar(translate('message.createSuccess'));
    }
    else
      console.log(resp.code)
    // enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

  const NewSolution = Yup.object().shape({
    content: Yup.string().required('Content is required'),

  });
  const methods = useForm({
    resolver: yupResolver(NewSolution),
    defaultValues: {
      content: ''
    }
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const RootStyle = styled('div')({
    flexGrow: 3,
    display: 'flex',
    flexDirection: 'column',
  });
  return (
    <RootStyle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

          <Grid item xs={12} >
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                
                <LabelStyle>Content</LabelStyle>
               
                <RHFEditor name="content" style={{
                  width: '100%',
                  height: '360px',
                
                }} />    
                <Button onClick={methods.handleSubmit(onSubmit)} loading={isSubmitting}>Post</Button>
              </Stack>
            </Card>
          </Grid>
      </FormProvider>
    </RootStyle>
  );
}
