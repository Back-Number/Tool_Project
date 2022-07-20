const routeList = [
  {
    path: '/',
    component: '@/layouts/BaseLayout.js',
    routes: [
      { exact: true, path: '/', redirect: '/authorTool' },
      { path: '/authorTool', component: '@/pages/HomePage' },
    ],
  },
];

export default routeList;
