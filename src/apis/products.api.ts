import { SuccessResponse } from './../types/utils.type'
import { ProductList, Product, ProductListConfig } from 'src/types/products.type'
import http from 'src/ultis/http'

const URL = 'products'
const getProductsAPI = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}

export default getProductsAPI
