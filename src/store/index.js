import { createStore } from 'vuex'
import authStore from '@/store/modules/auth'
import articleStore from '@/store/modules/article'
import categoryStore from '@/store/modules/category'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    auth: authStore,
    article: articleStore,
    category: categoryStore,
  },
})
