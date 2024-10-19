import React from 'react';
import Header from '~/layouts/Header/Header';
import OrderCard from '~/pages/OrderDetail/OrderCard';
import { FaHouse } from 'react-icons/fa6';
import Process from './Process';
import { FaAngleDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { routes } from '~/config';
import UserHeading from '../User/UserHeading';

const OrderDetailPage = () => {
    const OrderData = [
        {
            firstname: 'Khoa',
            lastname: 'Phan',
            email: 'khoaphan@gmail.com',
            number: '1235',
        },
        {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@gmail.com',
            number: '5678',
        },
    ];
    console.log('UserData:', OrderData); // Log UserData array
    console.log('UserData[0]:', OrderData[0]); // Log first user data

    return (
        <div>
            <Header />
            <UserHeading />
            <div className="order mt-10 mx-20 border rounded-xl px-5 py-5 flex flex-col gap-5">
                <div className="topOrder flex text-center items-center  justify-between ">
                    <div className="orderID flex gap-10 text-center items-center ">
                        <h1 className="font-bold text-2xl">Mã đơn hàng #4000</h1>
                        <div className="complete border rounded-2xl w-[100px] bg-green-200 text-green-500 font-bold">
                            <h1>Hoan tat</h1>
                        </div>
                    </div>
                    <div className="date">
                        <h1>Ngay mua: 11/09/2024 - 20:20</h1>
                    </div>
                </div>
                <div className="process ">
                    <Process />
                </div>
                <div className="information flex flex-col gap-5 md:flex-row md:justify-between">
                    {/* User Information */}
                    <div className="userInfor border rounded-xl flex flex-col p-5 w-full md:w-2/5 shadow-sm hover:shadow-lg">
                        <p className="pb-4 font-semibold text-lg text-center">Thông tin người nhận</p>
                        <p>Khoa Phan</p>
                        <p>tel: 056***1553</p>
                        <div className="address flex gap-2 items-center">
                            <FaHouse />
                            <p>Võ Văn Vân, Vĩnh Lộc B, Bình Chánh</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="payment-method border rounded-xl flex flex-col p-5 w-full md:w-1/5 text-center shadow-sm hover:shadow-lg">
                        <p className="pb-4 font-semibold text-lg">Phương thức thanh toán</p>
                        <p>Ví ZaloPay</p>
                    </div>

                    {/* Total Amount */}
                    <div className="total border rounded-xl flex flex-col p-5 w-full md:w-2/5 text-center shadow-sm hover:shadow-lg">
                        <p className="pb-4 font-semibold text-lg">Tổng tiền</p>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Tạm tính</p>
                            <p className="font-semibold">52.250d</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Phí vận chuyển</p>
                            <p className="">19.000d</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold text-lg">Tổng tiền (bao gồm VAT): </p>
                            <p className="font-semibold text-red-500 text-lg">71.250d</p>
                        </div>
                    </div>
                </div>

                {/* Transport Section */}
                <div className="transport flex flex-col gap-5 md:flex-row md:justify-between">
                    {/* Transport Type */}
                    <div className="transportType border rounded-xl flex flex-col p-5 w-full md:w-1/2 shadow-sm hover:shadow-lg">
                        <p className="pb-4 font-semibold text-lg">Phương thức vận chuyển</p>
                        <p>Giao hàng tiêu chuẩn</p>
                    </div>

                    {/* Notes */}
                    <div className="note border rounded-xl flex flex-col p-5 w-full md:w-1/2 shadow-sm hover:shadow-lg">
                        <p className="pb-4 font-semibold text-lg">Ghi chú</p>
                        <p>không có</p>
                    </div>
                </div>

                {/* Order History Section */}
                <div className="history border rounded-xl flex flex-col p-5 gap-5 justify-between shadow-sm hover:shadow-lg">
                    <p className="pb-4 font-semibold text-lg text-center">Lịch sử đơn hàng</p>
                    <div className="detail flex flex-col">
                        <p>
                            Đơn hàng 1235_123 của quý khách đã được đối tác vận chuyển xác nhận giao hàng thành công.
                            Cảm ơn quý khách đã mua hàng tại KimDong
                        </p>
                        <p className="text-gray-500 text-sm">22/09/2024 - 12:00</p>
                    </div>
                    <div className="more flex justify-center items-center gap-5">
                        <p className="text-blue-500 cursor-pointer">Xem thêm</p>
                        <FaAngleDown />
                    </div>
                </div>

                <OrderCard OrderData={OrderData[0]} />
            </div>
        </div>
        // Ensure UserData[0] is passed
    );
};

export default OrderDetailPage;
