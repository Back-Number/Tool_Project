const routeList = [
  {
    path: '/',
    component: '@/layouts/BaseLayout.tsx',
    routes: [
      { exact: true, path: '/', redirect: '/home' },
      { path: '/home', component: '@/pages/HomePage' },
      { path: '/example1', component: '@/pages/example1' },
      { path: '/example2', component: '@/pages/example2' },
      { path: '/example3', component: '@/pages/example3' },
      { path: '/example4', component: '@/pages/example4' },
    ],
  },
];

export default routeList;
