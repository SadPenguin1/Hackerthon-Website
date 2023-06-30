import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// ----------------------------------------------------------------------
const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

// media
const ExerciseList = Loadable(lazy(() => import('../pages/hackerthon/exercise/ExerciseList')));
const ExerciseCreate = Loadable(lazy(() => import('../pages/hackerthon/exercise/ExerciseCreate')));

const MediaRoleCreate = Loadable(lazy(() => import('../pages/hackerthon/role/MediaRoleCreate')));
const MediaRoleList = Loadable(lazy(() => import('../pages/hackerthon/role/MediaRoleList')));

const CategoryCreate = Loadable(lazy(() => import('../pages/hackerthon/category/CategoryCreate')));
const CategoryList = Loadable(lazy(() => import('../pages/hackerthon/category/CategoryList')));

const ExamCreate = Loadable(lazy(() => import('../pages/hackerthon/exam/ExamCreate')));
const ExamList = Loadable(lazy(() => import('../pages/hackerthon/exam/ExamList')));

const TagCreate = Loadable(lazy(() => import('../pages/hackerthon/tag/TagCreate')));
const TagList = Loadable(lazy(() => import('../pages/hackerthon/tag/TagList')));

const MediaPrivilegeCreate = Loadable(lazy(() => import('../pages/hackerthon/privilege/MediaPrivilegeCreate')));
const MediaPrivilegeList = Loadable(lazy(() => import('../pages/hackerthon/privilege/MediaPrivilegeList')));

const UserList = Loadable(lazy(() => import('../pages/hackerthon/user/MediaUserList')));
const UserEdit = Loadable(lazy(() => import('../pages/hackerthon/user/MediaUserEdit')));

const MediaCacheList = Loadable(lazy(() => import('../pages/hackerthon/cache/MediaCacheList')));
const MediaCacheKeyList = Loadable(lazy(() => import('../pages/hackerthon/cache/MediaCacheKeyList')));

const hackerthonRoute = {
  path: 'hackerthon',
  element: (
    <RoleBasedGuard accessibleRoles={['ROLE_ADMIN']}>
      <Outlet />
    </RoleBasedGuard>
  ),
  children: [
    { element: <Navigate to="/dashboard/hackerthon/exercises" replace />, index: true },

    // exercise
    { path: 'exercise/new', element: <ExerciseCreate /> },
    { path: 'exercises', element: <ExerciseList /> },
    { path: 'exercise/:id/edit', element: <ExerciseCreate /> },
    { path: 'exercise/:id/view', element: <ExerciseCreate /> },



    // category
    { path: 'category/new', element: <CategoryCreate /> },
    { path: 'categories', element: <CategoryList /> },
    { path: 'category/:id/edit', element: <CategoryCreate /> },
    { path: 'category/:id/view', element: <CategoryCreate /> },

    // exam
    { path: 'exam/new', element: <ExamCreate /> },
    { path: 'exams', element: <ExamList /> },
    { path: 'exam/:id/edit', element: <ExamCreate /> },
    { path: 'exam/:id/view', element: <ExamCreate /> },

     // tag
     { path: 'tag/new', element: <TagCreate /> },
     { path: 'tags', element: <TagList /> },
     { path: 'tag/:id/edit', element: <TagCreate /> },
     { path: 'tag/:id/view', element: <TagCreate /> },

    // role
    { path: 'role/new', element: <MediaRoleCreate /> },
    { path: 'roles', element: <MediaRoleList /> },
    { path: 'role/:id/edit', element: <MediaRoleCreate /> },
    { path: 'role/:id/view', element: <MediaRoleCreate /> },

    // privilege
    { path: 'privilege/new', element: <MediaPrivilegeCreate /> },
    { path: 'privileges', element: <MediaPrivilegeList /> },
    { path: 'privilege/:id/edit', element: <MediaPrivilegeCreate /> },
    { path: 'privilege/:id/view', element: <MediaPrivilegeCreate /> },

    // user
    { path: 'users', element: <UserList /> },
    { path: 'user/:id/view', element: <UserEdit /> },
    { path: 'user/:id/edit/role', element: <UserEdit /> },
    { path: 'user/:id/edit/email', element: <UserEdit /> },
    { path: 'user/:id/edit/phone', element: <UserEdit /> },
    { path: 'user/:id/edit/status', element: <UserEdit /> },
    { path: 'user/:id/edit/uid', element: <UserEdit /> },
    { path: 'user/:id/edit/info', element: <UserEdit /> },

    // cache
    { path: 'caches', element: <MediaCacheList /> },
    { path: 'cache/:name/keys', element: <MediaCacheKeyList /> },
  ],
};

export default hackerthonRoute;
