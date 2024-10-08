import React from 'react';
import { FaClipboardList, FaBox, FaCircleCheck } from "react-icons/fa6";

function Process() {
  return (
    <div className='bg-green-100 rounded-xl shadow-sm hover:shadow-lg'>
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 gap-5 py-10">
        
        {/* New Order Section */}
        <div className="newOrder flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaClipboardList className='text-green-500 text-3xl' />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Đơn hàng mới</h1>
            <p className='text-sm md:text-base'>11/09/2024 - 21:30</p>
          </div>
        </div>

        {/* Road Section */}
        <div className="road flex-grow mx-4 flex items-center">
          <div className="border-dotted border-b-8 border-green-700 w-full"></div>
        </div>

        {/* Processing Section */}
        <div className="processing flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaBox className='text-green-500 text-3xl' />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Đang xử lý</h1>
            <p className='text-sm md:text-base'>11/09/2024 - 22:10</p>
          </div>
        </div>

        {/* Road Section */}
        <div className="road flex-grow mx-4 flex items-center">
          <div className="border-dotted border-b-8 border-green-700 w-full"></div>
        </div>

        {/* Complete Section */}
        <div className="complete flex gap-5 items-center">
          <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
            <FaCircleCheck className='text-green-500 text-3xl' />
          </div>
          <div className="content flex flex-col">
            <h1 className='font-bold text-lg md:text-xl'>Hoàn tất</h1>
            <p className='text-sm md:text-base'>11/09/2024 - 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
