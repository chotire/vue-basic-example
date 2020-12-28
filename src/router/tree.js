export default [
  {
    path: '/tree',
    name: 'tree',
    component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/Tree.vue'),
  },
];
