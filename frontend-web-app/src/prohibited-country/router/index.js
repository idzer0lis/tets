import Vue from 'vue';
import Router from 'vue-router';

import ProhibitedCountry from '@/components/ProhibitedCountry';

Vue.use(Router);

const routes = [
  {
    path: '/prohibited',
    name: 'ProhibitedCountry',
    component: ProhibitedCountry,
    meta: {
      title: 'Wealthe Migrate',
    },
  },
  {
    path: '*',
    redirect: () => ({
      path: '/prohibited',
    }),
  }
];

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes,
});

router.beforeEach(async (to, from, next) => {
  
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
