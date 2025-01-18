export const menuHeaderItem = [
  {
    label: 'Auth.Login',  // Translation key
    icon: 'fas fa-sign-in-alt',
    routerLink: '/login',
    visible: true,  // Initially visible
  },
  {
    label: 'Bus.Name',  // Translation key
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
    ],
  },
  {
    label: 'Fleet.Name',  // Translation key
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
    ],
  },
  {
    label: 'Trip.Name',  // Translation key
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
    ],
  },
  {
    label: 'Auth.Logout',  // Translation key
    icon: 'fas fa-arrow-right-from-bracket',
    visible: false,
  },
];
