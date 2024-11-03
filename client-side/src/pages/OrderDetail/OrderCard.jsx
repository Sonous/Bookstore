import React from 'react'
import FullProcess from './DeliveryProcess'
import { searchResult } from '~/dataTemorary'
import ProductTable from './ProductTable'

function OrderCard({ OrderData }) {
   
    // console.log('OrderCard', OrderData);
    if (!OrderData) {
      return <p>No Order Data</p>;
    }
    const isCancel = OrderData.order_status === 'Hủy';
  
   
    const products = OrderData.order_books|| [];
    // console.log('Products in OrderCard', products);
  
    return (
      <div className='border rounded-xl flex flex-col py-8'>
        <div className="packageInfo flex justify-between">
          <div className="package flex items-center gap-5">
            <div className="packageName bg-gray-100 rounded-r-xl">
              <p>Kiện hàng 1</p>
            </div>
            {/* Displaying order number dynamically */}
            <p className='font-semibold text-lg'>Mã đơn hàng: #{OrderData.order_id}</p>
          </div>
          <div className="look-up flex gap-5 items-center px-5">
            <p className='text-blue-500'>Tra cứu vận chuyển</p>
            <div className={`complete border rounded-2xl w-[100px] ${isCancel ? 'bg-red-200 text-red-500' : 'bg-green-200 text-green-500'} font-bold text-center`}>
                <h1>{isCancel ? 'Hủy' : 'Hoàn tất'}</h1>
            </div>
          </div>
        </div>
  
        {/* Processing info (if applicable) */}
        <div className="process mx-5 p-5"></div>
        <FullProcess 
             isCancel={isCancel} // Pass the isCancel variable
             orderDate={OrderData.created_at}
             completeDate={OrderData.updated_at}
             />
  
        {/* Display the product table */}
        <ProductTable products={products} />
      </div>
    );
  }

export default OrderCard