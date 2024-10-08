import React from 'react'
import FullProcess from './DeliveryProcess'
import { searchResult } from '~/dataTemorary'
import ProductTable from './ProductTable'
const test = [
    {
        title: 'Đồi Thỏ (Tái Bản 2023)',
        image: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935235238961.jpg',
        currentPrice: 36000,
        quantity: 3,
        rate: 4
    },
    {
        title: 'Bay Trên Tổ Chim Cúc Cu (Tái Bản 2019)',
        image: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180770.jpg',
        currentPrice: 36000,
        quantity: 3,
        rate: 4
    }
]
function OrderCard() {
  return (
    <div className=' border rounded-xl flex flex-col py-8 '>
        <div className="pakageInfo flex justify-between">
            <div className="pakage flex items-center gap-5">
                <div className="pakageName bg-gray-100 rounded-r-xl">
                    <p>Kiện hàng 1</p>
                </div>
                <p className='font-semibold text-lg'>Mã đơn hàng: #1235-123</p>
            </div>
            <div className="look-up flex gap-5 items-center px-5">
                <p className='text-blue-500'>Tra cứu vận chuyển</p>
                <div className="complete border rounded-2xl w-[100px] bg-green-200 text-green-500 font-bold text-center">
                        <h1 >Hoan tat</h1>
                 </div>
            </div>
        </div>
        <div className="process mx-5 p-5"></div>
        <FullProcess />
        
        <ProductTable products={test}/>
    </div>
  )
}

export default OrderCard