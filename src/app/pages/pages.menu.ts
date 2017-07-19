export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'forms',
        data: {
          menu: {
            title: 'Forms',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'inputs',
            data: {
              menu: {
                title: 'Inputs',
              },
            },
          },
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'Layouts',
              },
            },
          },
        ],
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          },
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login',
              },
            },
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register',
              },
            },
          },
        ],
      },
    ],
  },
];
