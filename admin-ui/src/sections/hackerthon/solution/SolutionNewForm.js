/* eslint-disable react/prop-types */
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Card, Chip, FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// routes
import { UploadSingleFile } from '../../../components/upload';

import useLocales from '../../../hooks/useLocales';
import { getExercises, setExerciseSearch } from '../../../redux/slices/hackerthon/hackerthon.exercise';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { createSolutionAPI } from '../../../service/hackerthon/hackerthon.solution.service';
// components
import {
  FormProvider, RHFEditor, RHFTextField
} from '../../../components/hook-form';
import { getFileName } from '../../../utils/getFileFormat';
import { getSlug } from '../../../utils/urlSlug';
import { getSolutions } from 'src/redux/slices/hackerthon/hackerthon.solution';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function SolutionNewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const { exercises, search: searchExercise, isLoading: isLoadingExercise, } = useSelector((state) => state.exercise);

  const NewItemSchema = Yup.object().shape({
    title: Yup.string().required(translate('validation.required')),
    exercise: Yup.object().nullable().required(translate('validation.required')),
    description: Yup.string().required(translate('validation.required')),

  });

  const defaultValues = useMemo(
    () => ({
    
      fileObj: null,
      solution: null,
      content: '',  
    }),
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getSolutions());
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchExercise]);// eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterTitleExercise = (value) => {
    dispatch(setExerciseSearch({ ...searchExercise, value }));
  };

  const methods = useForm({
    resolver: yupResolver(NewItemSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  const onSubmit = async (data) => {
    const resp = await createSolutionAPI(data);

    if (resp.code === '200') {
      reset();
      enqueueSnackbar(translate('message.createSuccess'));
      navigate(PATH_DASHBOARD.hackerthon.solutions);
    } else
      enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue('fileObj', Object.assign(file, { preview: URL.createObjectURL(file), }));
        setValue('title', getFileName(file.name), { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label={translate('hackerthon.exercise.title')} />
              <Controller
                name="exercise"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete fullWidth
                    {...field}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={exercises?.map(({ id, title }) => ({ id, title }))}
                    getOptionLabel={(option) => option.title || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    loading={isLoadingExercise}
                    onInputChange={(event, value) => {
                      handleFilterTitleExercise(value);
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.id} size="small" label={option.title} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label={translate('hackerthon.solution.exercise')}
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <div>
                <LabelStyle>{translate('hackerthon.solution.content')}</LabelStyle>
                <RHFEditor simple name="content" />
                
               
              </div>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {translate('button.new')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>

  );
}
