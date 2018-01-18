// Intersection observer polyfill
require('intersection-observer');

import 'font-awesome/scss/font-awesome.scss';
import Cookie from 'js-cookie';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import { sync } from 'vuex-router-sync';
import VueResourceMock from 'vue-resource-mock';
import VueClipboard from 'vue-clipboard2';
import VModal from 'vue-js-modal';
import * as Uiv from 'uiv';
import VueAnalytics from 'vue-ua';
import VueObserveVisibility from 'vue-observe-visibility'
import VuePreventParentScroll from 'vue-prevent-parent-scroll';

let store;
let router;

if (process.env.PROHIBITED_COUNTRY_BUILD !== 'YES') {
  store = require('./store').default;
  router = require('./router').default;

  sync(store, router);
} else {
  store = require('./prohibited-country/store').default;
  router = require('./prohibited-country/router').default;
}

import MockData from '../mocks';

// Main SCSS
import './assets/sass/main.scss';

import App from './App.vue';

Vue.use(VueResource);
Vue.use(VueClipboard);
Vue.use(VModal);
Vue.use(VueObserveVisibility);
Vue.use(VuePreventParentScroll);

if (process.env.GA_SITE_KEY) {
  Vue.use(VueAnalytics, {
    appName: 'GBX',
    appVersion: '1.0',
    trackingId: process.env.GA_SITE_KEY,
    vueRouter: router,
  });
}

// We only use mock data on the development environment
if (process.env.VUE_USE_LIVE_API !== 'YES' && process.env.NODE_ENV === 'development') { // don't use it on your production build
  Vue.use(VueResourceMock, MockData, { silent: false }); // after use vue-resource
}

Vue.http.interceptors.push((request, next) => {
  request.credentials = true;

  if (Cookie.get('_csrf_token') && ['PUT', 'POST', 'DELETE'].indexOf(request.method.toUpperCase()) > -1) {
    request.headers.set('x-csrf-token', Cookie.get('_csrf_token'));
  }

  next((resp) => {
    // console.log('Headers', resp.headers);
  });
});

Vue.use(Uiv);

Vue.config.productionTip = false;

store.dispatch('getSession', { $http: Vue.http })
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App },
    });
  })
  .catch(() => { window.location = `/?bust=${new Date().getTime}`; });
