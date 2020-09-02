import Vue from 'vue'
import App from './App.vue'
// 1.1 配置fastclick,避免点击穿透和点击延迟300ms
import Fastclick from 'fastclick'
Fastclick.attach(document.body);
// 1.2 适配rem
import "lib-flexible"

// 1.3 引入router
import router from './router/index'

// 1.4 引入全局样式
import './style/common.less'
// 1.5 引入vant
import './plugin/vant'
// 1.6 引入全局过滤器
import './config/filter'

// 1.7 引入vuex文件
import store from "./store/index";

// 1.8 引入二维码插件
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
