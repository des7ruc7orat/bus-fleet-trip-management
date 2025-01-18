export const menuHeaderItem = [
  {
    label: 'Login',
    icon: 'fas fa-sign-in-alt',
    routerLink: '/login',
    visible: true,  // Initially visible
  },
  {
    label: 'Bus',
    icon: 'fas fa-bus',
    visible: false,  // Initially visible
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-bus-list',
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
    visible: false,
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-bus-list',
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
    visible: false,
    items: [
      [
        {
          items: [
            {
              label: 'List',
              icon: 'fas fa-bus-list',
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
    visible: false,
  },
];
