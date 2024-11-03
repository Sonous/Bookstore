import React from 'react';
import { FaClipboardList, FaBox, FaCircleCheck, FaTruck, FaCircleXmark } from "react-icons/fa6";

function FullProcess({ isCancel, orderDate, completeDate  }) {
  const orderStatus = isCancel ? "Bị hủy" : "Hoàn tất";
  // Set classes based on isCancel status
  const textColor = isCancel ? 'text-red-500' : 'text-green-500';
  const borderColor = isCancel ? 'border-red-700' : 'border-green-700';

  return (
    <div className={`rounded-xl mx-5 shadow-sm hover:shadow-lg ${isCancel ? 'bg-red-50' : 'bg-blue-50'}`}>
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 gap-5 py-10">
        
        {/* New Order Section */}
        <div className="newOrder flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaClipboardList className={`${textColor} text-3xl`} />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Đơn hàng mới</h1>
            <p className='text-sm md:text-base'>{orderDate}</p>
          </div>
        </div>

        {/* Road Section */}
        <div className="road flex-grow mx-4 flex items-center">
          <div className={`border-dotted border-b-8 w-full ${borderColor}`}></div>
        </div>

        {/* Processing Section */}
        <div className="processing flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaBox className={`${textColor} text-3xl`} />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Đang xử lý</h1>
            <p className='text-sm md:text-base'>{completeDate}</p>
          </div>
        </div>

        {/* Road Section */}
        <div className="road flex-grow mx-4 flex items-center">
          <div className={`border-dotted border-b-8 w-full ${borderColor}`}></div>
        </div>

        {/* Delivery Section */}
        <div className="delivery flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaTruck className={`${textColor} text-3xl`} />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Đang giao hàng</h1>
            <p className='text-sm md:text-base'>12/09/2024 - 06:00</p>
          </div>
        </div>

        {/* Road Section */}
        <div className="road flex-grow mx-4 flex items-center">
          <div className={`border-dotted border-b-8 w-full ${borderColor}`}></div>
        </div>

        {/* Complete Section */}
        <div className="complete flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
          {isCancel ? (
              <FaCircleXmark className='text-red-500 text-3xl' />
            ) : (
              <FaCircleXmark className='text-green-500 text-3xl' />
            )}
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>{orderStatus}</h1>
            <p className='text-sm md:text-base'>11/09/2024 - 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullProcess;
