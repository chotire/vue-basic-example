export default [
  {
    path: '/todo',
    name: 'todo',
    component: () => import(/* webpackChunkName: "todo" */ '@/views/todo/Todo.vue'),
  },
];
