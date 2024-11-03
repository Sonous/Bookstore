import React from 'react';
import ProductTable from './ProductTable';
import StatusTag from '~/component/Order/StatusTag';

function OrderCard({ OrderData }) {
    if (!OrderData) {
        return <p>No Order Data</p>;
    }

    const products = OrderData.order_books || [];

    return (
        <div className="border rounded-xl flex flex-col py-8">
            <div className="packageInfo flex justify-between">
                <div className="package flex items-center gap-5">
                    <div className="packageName bg-gray-100 rounded-r-xl">
                        <p>Kiện hàng</p>
                    </div>
                    {/* Displaying order number dynamically */}
                    <p className="font-semibold text-lg">Mã đơn hàng: #{OrderData.order_id}</p>
                </div>
                <div className="look-up flex gap-5 items-center px-5">
                    <p className="text-blue-500">Tra cứu vận chuyển</p>
                    <StatusTag status={OrderData.order_status} />
                </div>
            </div>

            {/* Display the product table */}
            <ProductTable products={products} />
        </div>
    );
}

export default OrderCard;
