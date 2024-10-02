import { Checkbox } from 'antd';
import React from 'react';
import Header from '~/layouts/Header/Header';

export default function PayingPage() {
    return (
        <div>
            <Header />
            <div className="px-24 bg-gray-100 h-[1000px]">
                <div className="pt-6"></div>
                <div className="bg-white px-6 py-6">
                    <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">
                        Địa chỉ giao hàng
                    </h1>
                </div>
                <div className="bg-white px-6 py-6 mt-6">
                    <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">
                        Kiểm tra lại đơn hàng
                    </h1>
                    <div className="flex gap-4 ">
                        <div
                            className="basis-[13%] min-w-[150px] h-[150px] bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(https://cdn0.fahasa.com/media/catalog/product//b/_/b_a-in-g_c-nh_-c_-n_ng.jpg)`,
                            }}
                        ></div>
                        <div className="mt-4 basis-[50%]">
                            <p>Góc nhỏ có nắng</p>
                        </div>
                        <div className="mt-4 basis-[12%]">
                            <p className="text-sm">54.400 đ</p>
                            <p className="text-sm line-through text-gray-500">68.000 đ</p>
                        </div>
                        <div className="mt-4 basis-[10%]">
                            <p>Số lượng : 1</p>
                        </div>
                        <div className="mt-4 basis-[10%]">
                            <p className="text-yellow-500 font-bold">54.400 đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 left-0 bg-white px-24 py-4 ">
                <div className="flex items-end flex-col">
                    <div className="flex">
                        <p>Thành tiền</p>
                        <p className="min-w-[180px] text-end">54.400 đ</p>
                    </div>
                    <div className="flex">
                        <p>Phí vận chuyển (Giao hàng tiêu chuẩn)</p>
                        <p className="min-w-[180px] text-end">20.000 đ</p>
                    </div>
                    <div className="flex">
                        <p className="font-bold">Tổng Số Tiền (gồm VAT)</p>
                        <p className="min-w-[180px] text-end text-lg text-yellow-500 font-extrabold">74.400 đ</p>
                    </div>
                </div>
                <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Checkbox />
                        <div>
                            <p className="text-sm text-gray-700 font-semibold">Bằng việc mua hàng bạn đồng ý với</p>
                            <p className="text-sm text-blue-500 font-bold">Điều khoản & Điều kiện của Kim Đồng</p>
                        </div>
                    </div>
                    <div className="px-6 py-2 cursor-pointer select-none rounded-md transition-all hover:bg-red-700 bg-primary-color text-white text-xl font-bold">
                        Xác nhận thanh toán
                    </div>
                </div>
            </div>
        </div>
    );
}
