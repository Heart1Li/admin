import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入全局css样式
import './assets/css/global.css'
//导入阿里图标样式库
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
