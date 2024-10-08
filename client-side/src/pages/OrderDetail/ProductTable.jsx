import React from 'react';

const ProductTable = ({ products }) => {
  const productCount = products.length; // Count the number of products
  const totalCost = products.reduce((acc, product) => acc + (product.currentPrice * product.quantity), 0);

  return (
    <div className="overflow-x-auto p-5">
      <table className="min-w-full bg-white border border-gray-200 rounded-t-xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 font-semibold text-gray-600">
              Sản phẩm ({productCount} sản phẩm)
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Giá</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Số lượng</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4 flex items-center">
                <img
                  src={product.image || 'https://via.placeholder.com/50'} // Placeholder image if none
                  alt={product.title}
                  className="w-20 h-20 object-cover mr-4"
                />
                <span>{product.title}</span>
              </td>
              <td className="py-3 px-4">
                {product.currentPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </td>
              <td className="py-3 px-4">{product.quantity}</td>
              <td className="py-3 px-4">
                {(product.currentPrice * product.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </td>
            </tr>
          ))}
            <tr className="border-b">
                <td colSpan="3" className="text-right py-3 px-4 font-semibold">Tổng thành tiền:</td>
                <td className="py-3 px-4 font-semibold">
                {totalCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
