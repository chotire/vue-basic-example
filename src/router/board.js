export default [
  {
    path: '/boards/work',
    name: 'work-board',
    component: () => import(/* webpackChunkName: "work-board" */ '@/views/board/Work.vue'),
  },
  {
    path: '/boards/objective',
    name: 'objective-board',
    component: () => import(/* webpackChunkName: "objective-board" */ '@/views/board/Objective.vue'),
  },
];
