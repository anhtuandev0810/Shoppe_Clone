import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/products.type'
import { QueryConfig } from '../../ProductLists'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  page_size: number
}

function SortProductList({ queryConfig, page_size }: Props) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString()
    })
  }

  const handlePriceChange = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderValue }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'bg-white !text-black hover:bg-slate-100': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            {' '}
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'bg-white !text-black hover:bg-slate-100': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {' '}
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'bg-white !text-black hover:bg-slate-100': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            {' '}
            Bán chạy
          </button>
          <select
            className={classNames('h-8 px-4 capitalize bg-white text-black text-sm text-left outline-none', {
              'bg-blue/80 text-black ': isActiveSortBy(sortBy.price),
              'bg-white !text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(e) => handlePriceChange(e.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc}>Giá: Thấp đến cao</option>
            <option value={orderConstant.desc}>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{page_size}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex w-9 justify-center items-center h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/40 hover:bg-slate-200 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
                }}
                className='flex w-9 justify-center items-center h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/ hover:bg-slate-200 cursor-pointer '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === page_size ? (
              <span className='flex w-9 justify-center items-center h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/40 hover:bg-slate-200 cursor-not-allowed'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
                }}
                className='flex w-9 justify-center items-center h-8 rounded-tl-sm rounded-bl-sm shadow bg-white/ hover:bg-slate-200 cursor-pointer '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
