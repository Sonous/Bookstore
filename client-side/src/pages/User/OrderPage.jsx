import React, { useState } from 'react';
import UserHeading from './UserHeading';
import Header from '~/layouts/Header/Header';
import OrderStatus from '~/component/Order/OrderStatus';
import OrderItem from '~/component/Order/OrderItem';
import Footer from '~/layouts/Footer/Footer';

const statusList = ['Tất Cả', 'Chờ thanh toán', 'Đang xử lý', 'Đang giao', 'Hoàn tất', 'Bị hủy', 'Đổi trả'];

const orderItem = [
    {
        order_id: 103544151,
        order_status: 'Đổi trả',
        created_at: '21/09/2024 - 14:58',
        books: [
            {
                book_id: 1,
                book_name: 'Hồi Kí Vanitas - Tập 10',
                book_end_cost: '34560.00',
                bookimages: [
                    {
                        book_image_url: 'hoi_ki_vanitas_10_1.webp',
                    },
                ],
                bookorder: {
                    quantity: 1,
                },
            },
        ],
        order_total_cost: '34560.00',
    },
];

export default function OrderPage() {
    const [orderQuantity, setOrderQuantity] = useState(3);
    const [currentStatus, setCurrentStatus] = useState('Tất Cả');

    return (
        <>
            <Header />
            <UserHeading />
            <div className="bg-main-bg-color py-5 flex flex-col gap-2">
                <div className="bg-white rounded-xl sm:p-5 mx-5 ">
                    <span className="text-xl font-semibold">Đơn hàng của tôi</span>
                    <div className="flex justify-between px-10 mt-5">
                        {statusList.map((status, index) => {
                            return (
                                <OrderStatus
                                    status={status}
                                    orderQuantity={orderQuantity}
                                    currentStatus={currentStatus === status}
                                    setCurrentStatus={setCurrentStatus}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
                {orderItem.map((item, index) => {
                    return <OrderItem key={index} {...item} />;
                })}
            </div>
            <Footer />
        </>
    );
}
