/* eslint-disable react/prop-types */
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Card, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// routes
import useLocales from '../../../hooks/useLocales';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { getExercises, setExerciseSearch } from '../../../redux/slices/hackerthon/hackerthon.exercise';
import { createExamExerciseAPI } from '../../../service/hackerthon/hackerthon.examExercise.service';


// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ExamExerciseNewForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentRole: PropTypes.object,
};


export default function ExamExerciseNewForm({exam,refresh }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { exercises,searchExercise, isLoading: isLoadingExamExercise } = useSelector((state) => state.exercise);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getExercises());
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchExercise]);



  const handleFilterExamByTitle = (value) => {
    dispatch(setExerciseSearch({ ...searchExercise, value }));
  };


  const NewItemSchema = Yup.object().shape({
    // orderNo: Yup.number().moreThan(0, translate('validation.positiveNumber')),
    exam: Yup.object().nullable().required(translate('validation.required')),
    // exercise: Yup.object().nullable().required(translate('validation.required')),
  });

  const defaultValues = useMemo(
    () => ({
      exam: {id: exam?.id},
      exercise: null,
      id: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewItemSchema),
    defaultValues,
  });

  const { reset, setValue, control, handleSubmit, formState: { isSubmitting }, } = methods;

  const onSubmit = async (data) => {
    const resp = await createExamExerciseAPI(data);

    if (resp.code === '200') {
      reset();
      enqueueSnackbar(translate('message.createSuccess'));
      refresh();
    } else enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }} alignItems="center" >
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
                    loading={isLoadingExamExercise}
                    onInputChange={(event, value) => {
                      handleFilterExamByTitle(value);
                    }}
                    renderExams={(value, getExamProps) =>
                      value.map((option, index) => (
                        <Chip {...getExamProps({ index })} key={option.id} size="small" label={option.title} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label={translate('hackerthon.examExercise.exercise')}
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              {/* <RHFTextField name="orderNo" label={translate('hackerthon.examExercise.orderNo')}
                onChange={(event) => setValue('orderNo', Number(event.target.value), { shouldValidate: true })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              /> */}

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting} sx={{ minWidth: 200 }}>
                {translate('button.new')}
              </LoadingButton>

            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider >
  );
}
