import Vue from 'vue';
import Router from 'vue-router';

// We only load the bare minimum right away */
import PageNotFound from '@/components/PageNotFound';

const Register = () => import(/* webpackChunkName: "group-app-main" */'@/components/Register');
const Login = () => import(/* webpackChunkName: "group-app-main" */'@/components/Login');

const Profile = () => import(/* webpackChunkName: "group-profile-main" */'@/components/Profile.vue');
const ChangePassword = () => import(/* webpackChunkName: "group-profile-main" */'@/components/ChangePassword.vue');
const Logout = () => import(/* webpackChunkName: "group-profile-main" */'@/components/Logout');

const ConfirmAccount = () => import(/* webpackChunkName: "group-profile-utility" */'@/components/ConfirmAccount.vue');
const RecoverPassword = () => import(/* webpackChunkName: "group-profile-utility" */'@/components/RecoverPassword.vue');
const ResetPassword = () => import(/* webpackChunkName: "group-profile-utility" */'@/components/ResetPassword.vue');

const Contribute = () => import(/* webpackChunkName: "group-ico-contribution" */'@/components/Contribute.vue');
const Verification = () => import(/* webpackChunkName: "group-ico-contribution" */'@/components/Verification.vue');

const ProhibitedCountry = () => import(/* webpackChunkName: "group-dev-pages" */'@/components/ProhibitedCountry');

import store from '../store';

Vue.use(Router);

function nonAuthGuard(to, from, next) {
  if (store.state.isLoggedIn) {
    return next({ path: '/profile' });
  }

  return next();
}

function authGuard(to, from, next) {
  if (!store.state.isLoggedIn) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    });
  }

  return next();
}

const redirects = [];

const routes = [
  ...redirects,
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/recover-password',
    name: 'Recover Password',
    component: RecoverPassword,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/change-password',
    name: 'Change Pasword',
    component: ChangePassword,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: Contribute,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/kyc/verification',
    name: 'Verification',
    component: Verification,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/confirm',
    name: 'ConfirmAccount',
    component: ConfirmAccount,
    meta: {
      title: 'Welthe Migrate',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/_prohibited',
    name: 'ProhibitedCountry',
    component: ProhibitedCountry,
    meta: {
      title: 'Prohibited Country - Welthe Migrate',
    },
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: 'Page not found - Welthe Migrate',
    },
  },
  {
    path: '*',
    redirect: to => ({
      path: '/404',
      query: {
        source: to.fullPath,
      },
    }),
  }
];

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // Prevent scrolling to top when not switching components
    if (to.name === from.name) {
      return null;
    }

    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  // Hide the footer until we are ready with the new route (only on different routes)
  if (to.name !== from.name) {
    await store.dispatch('setFooterVisible', {visible: false});
  }

  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  await store.dispatch('getSession', { $http: Vue.http });

  next();
});

router.afterEach(async (to, from) => {
  // Show the footer once we are ready with the new route (only on different routes)
  if (to.name !== from.name) {
    await store.dispatch('setFooterVisible', {visible: true});
  }
});

export default router;
