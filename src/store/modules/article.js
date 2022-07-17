import ArticleService from '@/services/ArticleService'

const Types = {
  SET_ARTICLES: 'SET_ARTICLES',
  SET_LOADING: 'SET_LOADING',
  ERROR_SERVICE: 'ERROR_SERVICE',
}

const state = () => ({
  loading: false,
  error: null,
  articles: [],
})

const getters = {
  articles(state) {
    return state.articles
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
  [Types.SET_ARTICLES]: (state, payload) => (state.articles = payload),
}

const actions = {
  async getArticle({ commit }, payload) {
    try {
      const { data: response } = await ArticleService.getArticle(payload)
      if (response.success) {
        commit(Types.SET_ARTICLES, response.data)
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
