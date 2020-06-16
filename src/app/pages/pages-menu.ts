import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Device management',
    icon: 'smartphone-outline',
    children: [
      {
        title: 'Devices',
        link: '/pages/devices',
      },
      {
        title: 'Configuration profiles',
      },
    ],
  },
];
