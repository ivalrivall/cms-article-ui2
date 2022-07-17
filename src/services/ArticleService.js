import http from '../http-common'
class ArticleService {
  getArticle(payload) {
    return http.post('/app-content/article/paginate', payload, {
      params: payload.params,
    })
  }
}
export default new ArticleService()
