import { uniqueId } from 'lodash';

import { IconUserCircle, IconAperture } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Modern',
    icon: IconAperture,
    href: '/dashboards/modern',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    navlabel: true,
    subheader: 'Pages',
  },
  {
    id: uniqueId(),
    title: 'Account Setting',
    icon: IconUserCircle,
    href: '/pages/account-settings',
  },
];

export default Menuitems;
