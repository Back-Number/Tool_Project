const routeList = [
  {
    path: '/',
    component: '@/layouts/BaseLayout.tsx',
    routes: [
      { exact: true, path: '/', redirect: '/home' },
      { path: '/home', component: '@/pages/MainPage' },
    ],
  },
];

export default routeList;
