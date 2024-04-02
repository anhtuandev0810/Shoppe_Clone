import React, { useState } from 'react'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import getProductsAPI from 'src/apis/products.api'
import Pagination from 'src/components/Paginate/Pagination'
import { ProductListConfig } from 'src/types/products.type'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductLists() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.namne,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryConfig], // giống deps của useEffect, khi queryParams thay đổi thì useQuery sẽ nhận biết đc và gọi lại
    queryFn: () => {
      return getProductsAPI.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData : true
  })
  
  const { data: category} = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <div className='bg-gray-200 py-6 '>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={category?.data.data || []}/>
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} page_size={data.data.data.pagination.page_size}/>
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {data ? (
                  data.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))
                ) : (
                  <div role='status' className='col-span-9 animate-pulse'>
                    <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700  mb-4'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5'></div>
                    <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 '></div>
                    <span className='sr-only'>Loading...</span>
                  </div>
                )}
              </div>
              <Pagination queryConfig={queryConfig} page_size={data.data.data.pagination.page_size} />
            </div>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default ProductLists
