import { MegaMenuItem } from 'primeng/api';

export const menuHeaderItem: MegaMenuItem[] = [
  {
    label: 'Login',  // Translation key
    icon: 'fas fa-sign-in-alt',
    routerLink: '/login',
    visible: true,  // Initially visible
  },
  {
    label: 'Bus',  // Translation key
    icon: 'fas fa-bus',
    visible: false,  // Initially visible
    items: [
      [
        {
          items: [
            {
              label: 'List',  // Translation key
              icon: 'fas fa-bus-list',
              routerLink: 'bus-list',
            },
            {
              label: 'Form',  // Translation key
              icon: 'fas fa-file-alt',
              routerLink: ['bus-form'],
            },
          ],
        },
      ],
    ],  // Correct structure, array of arrays
  },
  {
    label: 'Fleet',  // Translation key
    icon: 'fas fa-warehouse',
    visible: false,
    items: [
      [
        {
          items: [
            {
              label: 'List',  // Translation key
              icon: 'fas fa-bus-list',
              routerLink: 'fleet-list',
            },
            {
              label: 'Form',  // Translation key
              icon: 'fas fa-file-alt',
              routerLink: ['fleet-form'],
            },
          ],
        },
      ],
    ],  // Correct structure
  },
  {
    label: 'Trip',  // Translation key
    icon: 'fas fa-route',
    visible: false,
    items: [
      [
        {
          items: [
            {
              label: 'List',  // Translation key
              icon: 'fas fa-bus-list',
              routerLink: 'trip-list',
            },
            {
              label: 'Form',  // Translation key
              icon: 'fas fa-file-alt',
              routerLink: ['trip-form'],
            },
          ],
        },
      ],
    ],  // Correct structure
  },
  {
    label: 'Logout',  // Translation key
    icon: 'fas fa-arrow-right-from-bracket',
    visible: false,
    command: undefined,
  }
];
