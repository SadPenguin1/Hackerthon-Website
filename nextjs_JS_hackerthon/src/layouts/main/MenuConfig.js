// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Components',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.components,
  },
  {
    title: 'PROBLEMS',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.exercises,
  },
  {
    title: 'STATUS',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.status,
  },
  {
    title: 'RANKS',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.ranks,
  },
  {
    title: 'DISCUSS',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.discuss,
  },
  {
    title: 'CONTESTS',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_PAGE.exams,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: PATH_PAGE.about },
          { title: 'Contact us', path: PATH_PAGE.contact },
          { title: 'FAQs', path: PATH_PAGE.faqs },
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Payment', path: PATH_PAGE.payment },
          { title: 'Maintenance', path: PATH_PAGE.maintenance },
          { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
        ],
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_AUTH.loginUnprotected },
          { title: 'Register', path: PATH_AUTH.registerUnprotected },
          { title: 'Reset password', path: PATH_AUTH.resetPassword },
          { title: 'Verify code', path: PATH_AUTH.verify },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 404', path: PATH_PAGE.page404 },
          { title: 'Page 500', path: PATH_PAGE.page500 },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
  {
    title: 'Documentation',
    icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    path: PATH_DOCS,
  },
];

export default menuConfig;
