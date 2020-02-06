import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/globel.css'
import './assets/font_1628414_0ijnk88yjde8/iconfont.css'

Vue.config.productionTip = false
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')