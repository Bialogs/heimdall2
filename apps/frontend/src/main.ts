import 'core-js/stable';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import {ServerModule} from './store/server';
import axios from 'axios';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  created() {
    axios.interceptors.response.use(
      (response) => response, // simply return the response
      (error) => {
        // If there is no backend token then it is safe to assume this request
        // originated from the login page and should not perform the logout action.
        if (ServerModule.token !== '' && error?.response?.status === 401) {
          // if we catch a 401 error
          ServerModule.Logout();
        }
        console.log(error);
        return Promise.reject(error); // reject the Promise, with the error as the reason
      }
    );
  },
  render: (h) => h(App)
}).$mount('#app');

// The following line is a hot patch to add regex support, theyre are better
// places to edit Prism variables, but could not locate them. Namely this is
// the Prism library variables, and not the Prism component variables
//@ts-ignore
Prism.languages.rb.string[1].pattern = /("|')(\1|(?:(?![^\\]\1)[\s\S])*[^\\]\1)/g;
