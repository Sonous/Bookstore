import React, { useContext, useEffect, useState } from 'react';
import UserHeading from './UserHeading';
import Header from '~/layouts/Header/Header';
import OrderStatus from '~/component/Order/OrderStatus';
import OrderItem from '~/component/Order/OrderItem';
import Footer from '~/layouts/Footer/Footer';
import { UserContext } from '~/context/UserContextProvider';
import userApi from '~/apis/userApi';
import orderApi from '~/apis/orderApi';
import images from '~/assets/images';

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
    const [orders, setOrders] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('Tất Cả');
    const [isReload, setIsReload] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const fetchApi = async () => {
                try {
                    const result = await userApi.getOrdersByUser(user.user_id, currentStatus);

                    const quantityArr = await Promise.all(
                        statusList.map((status) => orderApi.countOrders(user.user_id, status)),
                    );

                    setOrderQuantity(quantityArr);
                    setOrders(result);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchApi();
        }
    }, [currentStatus, isReload]);

    return (
        <>
            {user && (
                <>
                    <Header />
                    <UserHeading />
                    <div className="bg-main-bg-color py-5 flex flex-col gap-2">
                        <div className="bg-white rounded-xl sm:p-5 mx-5 ">
                            <span className="text-xl font-semibold">Đơn hàng của tôi</span>
                            <div className="flex justify-between px-10 mt-5">
                                {orderQuantity.map((item, index) => {
                                    return (
                                        <OrderStatus
                                            status={item.status}
                                            orderQuantity={item.quantity}
                                            currentStatus={currentStatus === item.status}
                                            setCurrentStatus={setCurrentStatus}
                                            key={index}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        {orders.length > 0 ? (
                            <>
                                {orders.map((item, index) => {
                                    return <OrderItem key={index} {...item} setIsReload={setIsReload} />;
                                })}
                            </>
                        ) : (
                            <div className=" flex flex-col items-center bg-white rounded-xl sm:p-7 mx-5">
                                <img src={images.nothingIcon} alt="nothing" className="h-32 w-32" />
                                <span>Chưa có sản phẩm nào...</span>
                            </div>
                        )}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}
