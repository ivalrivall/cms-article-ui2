import http from '../http-common'
class AuthService {
  login(data) {
    return http.post('/login-web', data)
  }
  checkUser() {
    return http.get('/check-user')
  }
  register(data) {
    return http.post('/register', data)
  }
}
export default new AuthService()
