import Vue from 'vue';
import Vuex from 'vuex';
import Login from '@/components/Login';
import { shallow, createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Actions from '@/components/../store/actions';
// import * as mutations from "../../../../src/store/mutations";
// import * as getters from "../../../../src/store/getters";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Login.vue', () => {
  let actions, store, mutations, getters;


  beforeEach(() => {
    actions = {
      setCaptcha: function () {
        //
      }
    };
    mutations = {
      SET_FLASH_MESSAGES: function () {
      //
      }
    };
    store = new Vuex.Store({
      state: {},
      actions,
      mutations
    })
  });

  it('should render a form with inputs and button', () => {

    const wrapper = mount(Login, {store, localVue });
    const form = wrapper.find('form');
    const inputs = form.findAll('b-input').wrappers;
    const button = form.find('button');

    expect(form).to.exist;
    expect(button).to.exist;

    // check the existance of both inputs and test their types
    expect(inputs.length).to.equal(2);
    expect(inputs[0].html()).contains('email');
    expect(inputs[1].html()).to.contain('password');


  });
});
