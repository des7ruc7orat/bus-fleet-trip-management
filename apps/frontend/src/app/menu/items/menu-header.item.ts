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
          label: 'List',
          icon: 'fas fa-list',
          routerLink: '/bus-list',
        },
        {
          label: 'Form',
          icon: 'fas fa-file-alt',
          routerLink: '/bus-form',
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
          label: 'Form',
          icon: 'pi pi-list',
          routerLink: '/fleet-list',
        },
        {
          label: 'List',
          icon: 'pi pi-pencil',
          routerLink: '/fleet-form',
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
          label: 'Form',
          icon: 'pi pi-list',
          routerLink: '/trip-list',
        },
        {
          label: 'List',
          icon: 'pi pi-pencil',
          routerLink: '/trip-form',
        },
      ],
    ],
  },
  {
    label: 'Logout',
    icon: 'fas fa-arrow-right-from-bracket',
  },
];
