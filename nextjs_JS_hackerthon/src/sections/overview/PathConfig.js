import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

export const FOUNDATION_LIST = ['C', 'C++', 'Java', 'JavaScript', 'Python'].map((item) => ({
  name: item,
  href: `/components/foundation/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));
export const CATEGORY_LIST = ['Classical', 'Challenge', 'Partial', 'Tutorial', 'Riddle','Basics'].map((item) => ({
  name: item,
  href: `/components/foundation/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));

export const MUI_LIST = [
  'Accordion',
  'Alert',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumbs',
  'Buttons',
  'Checkbox',
  'Chip',
  'Dialog',
  'List',
  'Menu',
  'Pagination',
  'Pickers',
  'Popover',
  'Progress',
  'Radio Button',
  'Rating',
  'Slider',
  'Stepper',
  'Switch',
  'Table',
  'Tabs',
  'Textfield',
  'Timeline',
  'Tooltip',
  'Transfer List',
  'TreeView',
  'Data Grid',
].map((item) => ({
  name: item,
  href: `/components/mui/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));

export const EXTRA_LIST = [
  'Chart',
  'Map',
  'Editor',
  'Copy to clipboard',
  'Upload',
  'Carousel',
  'Multi language',
  'Animate',
  'Mega Menu',
  'Form Validation',
  'Lightbox',
  'Image',
  'Label',
  'Scroll',
  'Snackbar',
  'Text Max Line',
  'Navigation Bar',
].map((item) => ({
  name: item,
  href: `/components/extra/${paramCase(item)}`,
  icon: `https://minimal-assets-api.vercel.app/assets/images/components/${paramCase(item)}.png`,
}));
