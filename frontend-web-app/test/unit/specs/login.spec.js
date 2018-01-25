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
localVue.use(Notify);
describe('Login.vue', () => {
  let actions, store, mutations, getters;
  let submitLoginStub = function() {

  };

  beforeEach(() => {
    actions = {
      getSession: function () {

      },
      setCaptcha: function () {
        //
      },
    };
    mutations = {
      SET_FLASH_MESSAGES: function () {
      //
      }
    };
    store = new Vuex.Store({
      state: {
        userCaptcha: 'string for simulating captcha pass'
      },
      actions,
      mutations
    })
  });

  it('should render a form with inputs and button', () => {

    const wrapper = mount(Login, {store, localVue, submitLogin: submitLoginStub });
    const form = wrapper.find('form');
    const inputs = form.findAll('b-input').wrappers;
    const button = form.find('button');

    expect(form).to.exists;
    expect(button).exists;

    // check the existance of both inputs and test their types
    expect(inputs.length).to.equal(2);
    expect(inputs[0].html()).contains('email');
    expect(inputs[1].html()).to.contain('password');

  });

  describe('should make the login request when pressing the submit button', ()=> {
    it('should only make the request when both inputs are filled', ()=> {
      const wrapper = mount(Login, {store, localVue });
      const inputs = wrapper.findAll('b-input').wrappers;
      wrapper.setProps({
        email: 'a@a.ro',
        password: 'passworD!'
      });

      sinon.spy(wrapper.vm, "submitLogin");
      wrapper.find('button').trigger('click');
      expect(wrapper.vm.submitLogin).to.have.been.called;

    });
    it('should have validation', ()=> {
      const wrapper = mount(Login, {store, localVue });
      sinon.spy(wrapper.vm, "submitLogin");
      wrapper.find('button').trigger('click');
      expect(wrapper.vm.submitLogin).to.throw();
    });
  });
});
