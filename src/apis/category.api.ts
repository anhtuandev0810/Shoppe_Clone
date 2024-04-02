import { Category } from 'src/types/categories.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/ultis/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi
