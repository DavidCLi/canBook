import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import './bus'
import currency from './filter/currency'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(VueI18n)
Validator.localize('zh-TW', zhTW)

const i18n = new VueI18n({
  locale: 'zh-TW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

// 自訂手機格式
const getMessage = '格式不正確，請輸入10位手機號碼(09xxxxxxxx)'
const validate = (value) => {
  const regex = /^[09]{2}[0-9]{8}$/
  return regex.test(value)
}
const myValidate = {
  getMessage,
  validate
}
Validator.extend('phone', myValidate)

Vue.component('loading', Loading)

axios.defaults.withCredentials = true

Vue.filter('currency', currency)

new Vue({
  i18n,
  router,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
