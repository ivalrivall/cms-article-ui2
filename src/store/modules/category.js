import CategoryService from '@/services/CategoryService'

const Types = {
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_LOADING: 'SET_LOADING',
  ERROR_SERVICE: 'ERROR_SERVICE',
}

const state = () => ({
  loading: false,
  error: null,
  categories: [],
})

const getters = {
  categories(state) {
    return state.categories
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
}

const mutations = {
  [Types.SET_LOADING]: (state, payload) => (state.loading = payload),
  [Types.ERROR_SERVICE]: (state, payload) => (state.error = payload),
  [Types.SET_CATEGORIES]: (state, payload) => (state.categories = payload),
}

const actions = {
  async getCategory({ commit }, payload) {
    try {
      const { data: response } = await CategoryService.getCategory(payload)
      if (response.success) {
        commit(Types.SET_CATEGORIES, response.data)
      }
    } catch (e) {
      if (e?.response.status === 500) {
        commit(Types.ERROR_SERVICE, e.response.data)
      } else {
        commit(Types.ERROR_SERVICE, e)
      }
    }
  },
}

const article = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default article
