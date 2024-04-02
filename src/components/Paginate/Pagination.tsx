import classNames from 'classnames'
import React from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductLists/ProductLists'

interface Props {
  queryConfig: QueryConfig
  page_size: number
}

function Pagination({ queryConfig, page_size }: Props) {
  console.log(queryConfig, page_size)
  const range = page_size
  const page = Number(queryConfig.page)
  let dotAfter = false
  let dotBefore = false
  const renderDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border' key={index}>
          ...
        </span>
      )
    }
    return null
  }

  const renderDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border' key={index}>
          ...
        </span>
      )
    }
    return null
  }
  const renderPagination = () => {
    return Array(page_size)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // dieu kien return '...'
        if (page <= range * 2 + 1 && pageNumber > page + range && pageNumber < page_size - range + 1) {
          if (!dotAfter) {
            return renderDotAfter(index)
          }
          return null
        } else if (page > range * 2 + 1 && page < page_size - range * 2) {
          if (pageNumber < page - range && pageNumber > range) {
            return renderDotBefore(index)
          } else if (pageNumber > page + range && pageNumber < page_size + 1 - range) {
            return renderDotAfter(index)
          }
        } else if (page >= page_size - range * 2 && pageNumber > range && pageNumber < page - range) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            className={classNames(' rounded px-3 py-2 shadow-sm mx-2 cursor-pointer', {
              '!bg-orange text-white': pageNumber === page,
              'bg-white': pageNumber !== page
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-[#ccc] rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Previous</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Previous
        </Link>
      )}
      {renderPagination()}
      {page === page_size ? (
        <span className='bg-[#ccc] rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
