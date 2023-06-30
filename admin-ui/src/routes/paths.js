function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  hackerthon: {
    root: path(ROOTS_DASHBOARD, '/hackerthon'),

    newRole: path(ROOTS_DASHBOARD, '/hackerthon/role/new'),
    roles: path(ROOTS_DASHBOARD, '/hackerthon/roles'),

    newCategory: path(ROOTS_DASHBOARD, '/hackerthon/category/new'),
    categories: path(ROOTS_DASHBOARD, '/hackerthon/categories'),

    newExam: path(ROOTS_DASHBOARD, '/hackerthon/exam/new'),
    exams: path(ROOTS_DASHBOARD, '/hackerthon/exams'),

    newTag: path(ROOTS_DASHBOARD, '/hackerthon/tag/new'),
    tags: path(ROOTS_DASHBOARD, '/hackerthon/tags'),

    newExercise: path(ROOTS_DASHBOARD, '/hackerthon/exercise/new'),
    exercises: path(ROOTS_DASHBOARD, '/hackerthon/exercises'),

    newExamExercise: path(ROOTS_DASHBOARD, '/hackerthon/examexercise/new'),
    examExercises: path(ROOTS_DASHBOARD, '/hackerthon/examexercises'),

    newPrivilege: path(ROOTS_DASHBOARD, '/hackerthon/privilege/new'),
    privileges: path(ROOTS_DASHBOARD, '/hackerthon/privileges'),

    users: path(ROOTS_DASHBOARD, '/hackerthon/users'),

    caches: path(ROOTS_DASHBOARD, '/hackerthon/caches'),
  },
  dashboard: {
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
  },
};

// export const PATH_DOCS = 'https://onthibanglaixe.net';
// export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';