import { isUndefined } from 'lodash'
import AuthService from '@/services/AuthService'
import moment from 'moment'
import router from '@/router'

const Types = {
  SET_AUTH_DATA: 'SET_AUTH_DATA',
  SET_USER_DATA: 'SET_USER_DATA',
  REMOVE_AUTH_DATA: 'REMOVE_AUTH_DATA',
  SET_LOADING: 'SET_LOADING',
  ERROR_SERVICE: 'ERROR_SERVICE',
  SET_TOKEN: 'SET_TOKEN',
  SET_IS_LOGIN: 'SET_IS_LOGIN',
}

const state = () => ({
  authData: localStorage.getItem('allstar_authdata')
    ? JSON.parse(localStorage.getItem('allstar_authdata'))
    : {},
  userData: localStorage.getItem('allstar_authdata')
    ? JSON.parse(localStorage.getItem('allstar_authdata'))
    : {},
  loading: false,
  error: null,
  isLoggedIn: false,
  token: null,
})

const getters = {
  authData(state) {
    return state.authData
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  token(state) {
    return state.token
  },
  userData(state) {
    return state.userData
  },
}

const mutations = {
  [Types.SET_LOADING]: (state, payload) => (state.loading = payload),
  [Types.ERROR_SERVICE]: (state, payload) => (state.error = payload),
  [Types.SET_USER_DATA]: (state, payload) => (state.userData = payload),
  [Types.SET_AUTH_DATA](state, payload) {
    state.authData = payload
    state.isLoggedIn = true
  },
  [Types.REMOVE_AUTH_DATA](state) {
    state.authData = []
    state.isLoggedIn = false
  },
  [Types.SET_TOKEN]: (state, payload) => (state.token = payload),
  [Types.SET_IS_LOGIN](state, payload) {
    state.isLoggedIn = payload
  },
}

const actions = {
  async login({ commit }, payload) {
    try {
      const { data: response } = await AuthService.login(payload)
      if (response.success) {
        const auth = {
          expiresIn: moment(response.data.expiresIn).diff(moment(), 'seconds'),
          refreshToken: response.data.refreshToken,
          token: response.data.token,
        }
        commit(Types.SET_AUTH_DATA, auth)
        localStorage.setItem('allstar_token', auth.token)
        localStorage.setItem('allstar_authdata', JSON.stringify(auth))
        // this.$axios.setToken(auth.token, 'Bearer')
        window.location.href = '/'
      }
    } catch (e) {
      console.log('error login', e)
      console.log('response error login', e.response)
      if (e.response.status === 500) {
        commit(Types.ERROR_SERVICE, e.response.data)
      } else {
        commit(Types.ERROR_SERVICE, e)
      }
    }
  },
  logout({ commit }) {
    commit(Types.REMOVE_AUTH_DATA)
    commit(Types.SET_USER_DATA, {})
    localStorage.removeItem('allstar_token')
    localStorage.removeItem('allstar_authdata')
    localStorage.removeItem('allstar_userdata')
    // localStorage.removeItem('userData')
    // this.$axios.setToken(false)
    router.replace('/pages/login')
    console.log('logout')
  },
  setIsLoggedIn({ commit }, payload) {
    commit(Types.SET_IS_LOGIN, payload)
    if (!payload) {
      // router.push('/pages/login')
      console.log('to login')
    }
  },
  checkLogin({ commit, dispatch }) {
    const token = localStorage.getItem('allstar_token')
    if (isUndefined(token) || !token || token == null) {
      console.log('checklogin logout')
      dispatch('logout')
    }

    if (token && token !== null) {
      console.log('login')
      commit(Types.SET_TOKEN, token)
      commit(Types.SET_IS_LOGIN, true)
      // this.$axios.setToken(token)
    }
  },
  async getInfoAccount({ commit, dispatch }) {
    try {
      const response = await AuthService.checkUser()
      commit(Types.SET_USER_DATA, response.data)
      localStorage.setItem('allstar_userdata', JSON.stringify(response.data))
    } catch (e) {
      console.log('error get info account', e)
      if (e.response.status === 401) {
        dispatch('logout')
      }
    }
  },
  async register(context, payload) {
    try {
      const response = await AuthService.register(payload)
      return response
    } catch (error) {
      return error
    }
  },
}

const auth = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default auth
