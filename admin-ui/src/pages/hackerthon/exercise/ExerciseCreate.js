import { useLocation, useParams } from 'react-router-dom';
// @mui
import { Box, Container } from '@mui/material';
// redux
import { useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import ErrorOccur from '../../../components/ErrorOccur';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import useLocales from '../../../hooks/useLocales';
import EditForm from '../../../sections/hackerthon/exercise/ExerciseEditForm';
import NewForm from '../../../sections/hackerthon/exercise/ExerciseNewForm';

// ----------------------------------------------------------------------

export default function ExcersiceCreate() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');
  const isNew = !isEdit && !isView;
  const { error, exercises } = useSelector((state) => state.exercise);

  const exercise = exercises.find(c => c.id === id);

  const renderForm = () => {
    if (isNew)
      return <NewForm />;

    return error ? <Box sx={{ py: 3 }}>
      <ErrorOccur error={error} />
    </Box> : <EditForm isEdit={isEdit} currentItem={exercise} isView={isView} />;
  };

  return (
    <Page title={isNew ? translate('hackerthon.exercise.newExercise') : exercise?.title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isNew ? translate('hackerthon.exercise.newExercise') : exercise?.title}
          links={[
            { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('menu.hackerthon'),
              href: PATH_DASHBOARD.hackerthon.root,
            },
            {
              name: translate('menu.exercise'),
              href: PATH_DASHBOARD.hackerthon.exercises,
            },
            { name: isNew ? translate('hackerthon.exercise.newExercise') : exercise?.title || '' },
          ]}
        />
        {renderForm()}
      </Container>
    </Page>
  );
}
