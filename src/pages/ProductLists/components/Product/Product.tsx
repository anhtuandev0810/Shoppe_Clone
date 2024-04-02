import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'
import { Product as ProductType } from 'src/types/products.type'
import { formatMoney, formatNumber, generateNameId } from 'src/ultis/ultis'

interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative '>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3 justify-between'>
            <div className='line-through max-w[50%] text-gray-500 truncate'>
              <span className='text-xs'>đ</span>
              <span>{product.price_before_discount}</span>p
            </div>
            <div className='max-w[50%] text-orange truncate'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatMoney(product.price)}</span>
            </div>
          </div>
          <div className='flex mt-3 items-center justify-end'>
            <ProductRating rating={product.rating}/>
            <div className='ml-2 text-sm'>
              <span>{formatNumber(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
