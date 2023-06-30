import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @muiCategoryNewForm
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FormProvider, RHFEditor, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
// import { createBlogTagAPI, updateBlogTagAPI } from '../../../service/blog/blog.tag.service';
// import { getSlug } from '../../../utils/urlSlug';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

TagNewForm.propTypes = {
  isEdit: PropTypes.bool,
  isView: PropTypes.bool,
  currentTag: PropTypes.object,
};

export default function TagNewForm({ isEdit, isView, currentTag }) {
  // const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const NewTagSchema = Yup.object().shape({
    title: Yup.string().required(translate('validation.required')),
    description: Yup.string().required(translate('validation.required')),
    slug: Yup.string().required(translate('validation.required')),
    metaTitle: Yup.string().required(translate('validation.required')).max(80, translate('validation.maxLength', { size: 80 })),
    metaDescription: Yup.string().required(translate('validation.required')).max(160, translate('validation.maxLength', { size: 160 })),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentTag?.title || '',
      description: currentTag?.description || '',
      metaTitle: currentTag?.metaTitle || '',
      metaDescription: currentTag?.metaDescription || '',
      slug: currentTag?.slug || '',
      id: currentTag?.id || '',
    }),
    [currentTag]
  );

  const methods = useForm({
    resolver: yupResolver(NewTagSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue("metaTitle", value.title, { shouldValidate: true })
        // setValue("slug", getSlug(value.title), { shouldValidate: true })
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data) => {
    let resp;
    // if (isEdit) resp = await updateBlogTagAPI(data);
    // else resp = await createBlogTagAPI(data);

    if (resp.code === '200') {
      reset();
      enqueueSnackbar(!isEdit ? translate('message.createSuccess') : translate('message.updateSuccess'));
      // navigate(PATH_DASHBOARD.blog.tags);
    } else enqueueSnackbar(`${resp.code} - ${resp.message}`, { variant: 'error' });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label={translate('blog.category.title')} disabled={isView} />

              <div>
                <LabelStyle>{translate('blog.category.description')}</LabelStyle>
                <RHFEditor simple name="description" readOnly={isView} />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <LabelStyle>{translate('label.otherSection')}</LabelStyle>
                <RHFTextField name="metaTitle" label={translate('blog.category.metaTitle')} disabled={isView} />
                <RHFTextField name="slug" label={translate('blog.category.slug')} disabled={isView} />
                <RHFTextField name="metaDescription" label={translate('blog.category.metaDescription')} multiline rows={4} disabled={isView} />
              </Stack>
            </Card>

            {isView ? (
              <Button
                variant="contained"
                component={RouterLink}
                to={`${PATH_DASHBOARD.blog.root}/tag/${currentTag?.id}/edit`}
                size="large"
                startIcon={<Iconify icon={'eva:edit-fill'} />}
              >
                {translate('button.edit')}
              </Button>
            ) : (
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? translate('button.new') : translate('button.save')}
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
