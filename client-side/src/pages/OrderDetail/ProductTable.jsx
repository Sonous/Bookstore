import React from 'react';

const ProductTable = ({ products }) => {
  // console.log('Book', products);
  
  const productCount = products.length; // Count the number of products
  
  // Calculate total cost
  const totalCost = products.reduce((acc, product) => {
    const cost = parseFloat(product.book_end_cost) || 0; // Convert to number
    const quantity = product.quantity || 1; // Default quantity to 1 if not provided
    return acc + (cost * quantity); // Add cost * quantity to accumulator
  }, 0);

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
          {products.map((product, index) => {
            const cost = parseFloat(product.book_end_cost) || 0; // Convert to number
            const quantity = product.quantity || 1; // Default quantity to 1 if not provided
            const itemTotal = cost * quantity; // Calculate total for this product

            return (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 flex items-center">
                  <img
                    src={(product.bookimages && product.bookimages.length > 0 ? product.bookimages[0].book_image_url : 'https://via.placeholder.com/50')}
                    alt={product.book_name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <span>{product.book_name}</span>
                </td>
                <td className="py-3 px-4">
                  {cost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </td>
                <td className="py-3 px-4">{quantity}</td>
                <td className="py-3 px-4">
                  {itemTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} {/* Displaying the total for each product */}
                </td>
              </tr>
            );
          })}
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
