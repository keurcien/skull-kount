import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import './registerServiceWorker'

Vue.use(BootstrapVue);

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
	store,
	render: (h) => h(App),
}).$mount("#app");
