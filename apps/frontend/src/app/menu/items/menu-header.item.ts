export const menuHeaderItem = [
  {
    label: 'Login',
    icon: 'fas fa-sign-in-alt',
    routerLink: '/login',
  },
  {
    label: 'Bus',
    icon: 'fas fa-bus',
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-list',
              routerLink: 'bus-list',
            },
            {
              label: 'Form',
              icon: 'fas fa-file-alt',
              routerLink: ['bus-form'],
            },
          ],
        },
      ],
    ],
  },
  {
    label: 'Fleet',
    icon: 'fas fa-warehouse',
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-list',
              routerLink: 'fleet-list',
            },
            {
              label: 'Form',
              icon: 'fas fa-file-alt',
              routerLink: ['fleet-form'],
            },
          ],
        },
      ],
    ],
  },
  {
    label: 'Trip',
    icon: 'fas fa-route',
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-list',
              routerLink: 'trip-list',
            },
            {
              label: 'Form',
              icon: 'fas fa-file-alt',
              routerLink: ['trip-form'],
            },
          ],
        },
      ],
    ],
  },
  {
    label: 'Logout',
    icon: 'fas fa-arrow-right-from-bracket',
  },
];
