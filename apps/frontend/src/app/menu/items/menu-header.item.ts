export const menuHeaderItem = [
  {
    label: 'Login',
    icon: 'pi pi-bus',
  },
  {
    label: 'Bus Management',
    icon: 'pi pi-bus',
    items: [
      [
        {
          label: 'Bus Form',
          icon: 'pi pi-pencil',
          routerLink: '/bus-form',
        },
        {
          label: 'Bus List',
          icon: 'pi pi-list',
          routerLink: '/bus-list',
        },
      ],
    ],
  },
  {
    label: 'Fleet Management',
    icon: 'pi pi-truck',
    items: [
      [
        {
          label: 'Fleet Overview',
          icon: 'pi pi-eye',
          routerLink: '/fleet',
        },
      ],
    ],
  },
];
