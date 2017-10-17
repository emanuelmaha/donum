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
        path: 'member',
        data: {
          menu: {
            title: 'Members',
            icon: 'ion-ios-people',
            selected: false,
            expanded: false,
            order: 400,
          },
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                title: 'All',
              },
            },
          },
          {
            path: 'new',
            data: {
              menu: {
                title: 'New',
              },
            },
          },
        ],
      },
      {
        path: 'finance',
        data: {
          menu: {
            title: 'Finance',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 650,
          },
        },
        children: [
          {
            path: 'donation',
            data: {
              menu: {
                title: 'Donation',
              },
            },
          },
          {
            path: 'reports',
            data: {
              menu: {
                title: 'Reports',
              },
            },
          },
        ],
      },
      {
        path: 'utils',
        data: {
          menu: {
            title: 'Utils',
            icon: 'ion-cash',
            selected: false,
            expanded: false,
            order: 660,
          },
        },
        children: [
          {
            path: 'migration',
            data: {
              menu: {
                title: 'Data Base Migration',
              },
            },
          }
        ],
      },
      {
        path: 'logout',
        data: {
          menu: {
            title: 'Logout',
            icon: 'ion-android-exit',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
    ],
  },
];
