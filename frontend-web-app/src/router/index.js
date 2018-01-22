import Vue from 'vue';
import Router from 'vue-router';

// We only load the bare minimum right away */
import PageNotFound from '@/components/PageNotFound';

const About = () => import(/* webpackChunkName: "group-app-main" */'@/components/About');
const News = () => import(/* webpackChunkName: "group-app-main" */'@/components/News');
const TermsAndConditions = () => import(/* webpackChunkName: "group-app-main" */'@/components/TermsAndConditions');
const Contact = () => import(/* webpackChunkName: "group-app-main" */'@/components/Contact');

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
const Faq = () => import(/* webpackChunkName: "group-ico-contribution" */'@/components/Faq.vue');

const IcoLandingHomepage = () => import(/* webpackChunkName: "group-app-landing" */'@/components/IcoLandingHomepage');

const ProhibitedCountry = () => import(/* webpackChunkName: "group-dev-pages" */'@/components/ProhibitedCountry');
const Homepage = () => import(/* webpackChunkName: "group-dev-pages" */'@/components/Homepage');
const StyleGuide = () => import(/* webpackChunkName: "group-dev-pages" */'@/components/StyleGuide');

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

const Listing = () => import(/* webpackChunkName: "group-ico-listing" */'@/components/Listing.vue');
const Projects = () => import(/* webpackChunkName: "group-ico-listing" */'@/components/Projects.vue');
const Project = () => import(/* webpackChunkName: "group-ico-listing" */'@/components/Project.vue');
const Favorites = () => import(/* webpackChunkName: "group-ico-listing" */'@/components/Favorites.vue');

const redirects = [];
redirects.push({
  path: '/about',
  beforeEnter: (to, from, next) => {
    window.location = "https://gbx.gi/"
  }
});
redirects.push({
  path: '/news',
  beforeEnter: (to, from, next) => {
    window.location = "https://gbx.gi/news/"
  }
});
if (process.env.ICO_LISTING_REDIRECT=== 'YES') {
  redirects.push({ path: '/', redirect: { name: 'Listing' }});
}
if (process.env.LOGIN_REDIRECT=== 'YES') {
  redirects.push({ path: '/', redirect: { name: 'Login' }});
}

const listingRoutes = [];
if (process.env.ICO_LISTING_ENABLED === 'YES') {
  listingRoutes.push({
    path: '/projects/:project/:section?',
    name: 'Project',
    component: Project,
    meta: {
      title: 'GBX',
    },
  });
  listingRoutes.push({
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      title: 'GBX',
    },
  });
  listingRoutes.push({
    path: '/listing',
    name: 'Listing',
    component: Listing,
    meta: {
      title: 'GBX',
    },
  });
  listingRoutes.push({
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  })
}

const routes = [
  ...redirects,
  {
    path: '/',
    name: 'IcoLandingHomepage',
    component: IcoLandingHomepage,
    meta: {
      title: 'GBX',
    },
  },
  ...listingRoutes,
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'GBX',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'GBX',
    },
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      title: 'GBX',
    },
  },
  {
    path: '/terms-and-conditions',
    name: 'TermsAndConditions',
    component: TermsAndConditions,
    meta: {
      title: 'GBX',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'GBX',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'GBX',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/recover-password',
    name: 'Recover Password',
    component: RecoverPassword,
    meta: {
      title: 'GBX',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/reset-password',
    name: 'Reset Pasword',
    component: ResetPassword,
    meta: {
      title: 'GBX',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/change-password',
    name: 'Change Pasword',
    component: ChangePassword,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/ico/contribute',
    name: 'Contribute',
    component: Contribute,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/ico/verification',
    name: 'Verification',
    component: Verification,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/ico/faq',
    name: 'Faq',
    component: Faq,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      title: 'GBX',
    },
    beforeEnter: authGuard,
  },
  {
    path: '/confirm',
    name: 'ConfirmAccount',
    component: ConfirmAccount,
    meta: {
      title: 'GBX',
    },
    beforeEnter: nonAuthGuard,
  },
  {
    path: '/_homepage',
    name: 'Homepage',
    component: Homepage,
    meta: {
      title: 'GBX - Homepage',
    },
  },
  {
    path: '/_styleguide',
    name: 'StyleGuide',
    component: StyleGuide,
    meta: {
      title: 'Style guide - GBX',
    },
  },
  {
    path: '/_prohibited',
    name: 'ProhibitedCountry',
    component: ProhibitedCountry,
    meta: {
      title: 'Prohibited Country - GBX',
    },
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: 'Page not found - GBX',
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
