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
import ExamExerciseNewForm from './ExamExerciseNewForm';

// ----------------------------------------------------------------------

export default function ExamCreate() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const isView = pathname.includes('view');
  const isNew = !isEdit && !isView;
  const { error, examExercises } = useSelector((state) => state.examExercise);

  const examExercise = examExercises.find(c => c.id === parseInt(id, 10));

  return (
    <Page title={isNew ? translate('hackerthon.examExercise.newExamExercise') : examExercise?.title}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={isNew ? translate('hackerthon.examExercise.newExamExercise') : examExercise?.title}
          links={[
            { name: translate('menu.dashboard'), href: PATH_DASHBOARD.root },
            {
              name: translate('menu.hackerthon'),
              href: PATH_DASHBOARD.hackerthon.root,
            },
            {
              name: translate('menu.hackerthon'),
              href: PATH_DASHBOARD.hackerthon.exams,
            },
            { name: isNew ? translate('hackerthon.examExercise.newExamExercise') : examExercise?.title || '' },
          ]}
        />
        {error && (isEdit || isView) ? (
          <Box sx={{ py: 3 }}>
            <ErrorOccur error={error} />
          </Box>
        ) :
          <ExamExerciseNewForm isEdit={isEdit} currentExamSituation={isEdit || isView ? examExercise : null} isView={isView} />
        }
      </Container>
    </Page>
  );
}
