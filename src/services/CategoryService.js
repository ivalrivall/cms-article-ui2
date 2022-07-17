import http from '../http-common'
class CategoryService {
  getCategory(payload) {
    return http.post('/app-content/category/paginate', payload, {
      params: payload.params,
    })
  }
}
export default new CategoryService()
