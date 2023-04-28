import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import '@/styles/tailwind.css'
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import { mapGetters } from 'vuex'
import SlideVerify from 'vue-monoplasty-slide-verify'
import request from '@/utils/request'
import YXTX from 'yxtx-lib'
Vue.use(YXTX)
import {
  setDomain,
  setAxiosInstance
} from '@/api/apis'

setDomain(process.env.VUE_APP_BASE_API)
setAxiosInstance(request)

Vue.use(SlideVerify)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.config.productionTip = false
Vue.mixin({
  computed: {
    ...mapGetters({
      roles: 'roles',
      userid: 'userid'
    })
  },
  methods: {
    getType(t) {
      const status = ['删除', '已发布', '草稿']
      return status[t] || ''
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
