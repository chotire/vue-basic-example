import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
  },
];

const files = require.context('.', true, /^(?!\.\/index).*\.js$/);
files.keys().forEach(file => routes.push(...files(file).default));

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.unauthorized) {
    next();
  } else {
    if (to.path === '/todo') {
      next('/dashboard');
      return;
    }
    next();
  }
});

export default router;
