// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import vueResoure from 'vue-resource'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/element-#76D7C4/index.css'
import 'font-awesome/css/font-awesome.css'
import store from './store/store'
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vueResoure);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  template: '<App/>',
  components: { App },
  data: {
    eventHub: new Vue()
  }
});
// webpack入口文件
