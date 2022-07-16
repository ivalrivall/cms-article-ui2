import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

import http from './http-common'
import commonMixins from './helpers/mixin-common'

const app = createApp(App)
app.use(store)
// app.use(http)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.mixin(commonMixins)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.config.globalProperties.$axios = http
app.mount('#app')
