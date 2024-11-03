import React, { useContext, useEffect, useState } from 'react';
import { FaHouse } from 'react-icons/fa6';
import Process from './Process';
import { useParams } from 'react-router-dom';

import Header from '~/layouts/Header/Header';
import OrderCard from '~/pages/OrderDetail/OrderCard';
import UserHeading from '../User/UserHeading';
import { UserContext } from '~/context/UserContextProvider';
import orderApi from '~/apis/orderApi';
import { formatDate } from '~/utils/functions/formatDate';
import Footer from '~/layouts/Footer/Footer';
import StatusTag from '~/component/Order/StatusTag';
import { convertPriceToString } from '~/utils/functions';
import Loading from '~/component/Loading';

const OrderDetailPage = () => {
    const { orderId } = useParams();

    const { user } = useContext(UserContext);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const order = await orderApi.getOrderById(orderId);

                setOrder(order);
            } catch (error) {
                console.error('Error fetching orders or addresses:', error);
            }
        };

        fetchOrder();
    }, [user]);

    return (
        <>
            {order ? (
                <>
                    <Header />
                    <UserHeading />

                    <div className=" mb-5  justify-center " key={order.order_id}>
                        <div className="order mt-10 mx-20 border rounded-xl px-5 py-5 flex flex-col gap-5 hover:shadow-md">
                            <div className="topOrder flex text-center items-center justify-between ">
                                <div className="orderID flex gap-10 text-center items-center ">
                                    <h1 className="font-bold text-2xl">Mã đơn hàng #{order.order_id}</h1>
                                    <StatusTag status={order.order_status} />
                                </div>
                                <div className="date">
                                    <h1>Ngày mua: {formatDate(order.created_at)}</h1>
                                </div>
                            </div>
                            <div className="process">
                                <Process
                                    status={order.order_status} // Pass the isCancel variable
                                    orderDate={formatDate(order.created_at)}
                                    completeDate={formatDate(order.updated_at)}
                                />
                            </div>
                            <div className="information flex flex-col gap-5 md:flex-row md:justify-between">
                                {/* User Information */}
                                <div className="userInfor border rounded-xl flex flex-col p-5 w-full md:w-2/5 shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg text-center">Thông tin người nhận</p>
                                    <p>{order.order_address_info.user_name}</p>
                                    <p>Tel: {order.order_address_info.user_phone}</p>
                                    <div className="address flex gap-2 items-center">
                                        <FaHouse />
                                        <p>
                                            {order.order_address_info.address.address_house_number},{' '}
                                            {order.order_address_info.address.address_ward},{' '}
                                            {order.order_address_info.address.address_district},{' '}
                                            {order.order_address_info.address.address_province}
                                        </p>
                                    </div>
                                </div>
                                {/* Payment Method */}
                                <div className="payment-method border rounded-xl flex flex-col p-5 w-full md:w-1/5 text-center shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg">Phương thức thanh toán</p>
                                    <p>{order.pay_method_name || 'Phương thức không có sẵn'}</p>
                                </div>
                                {/* Total Amount */}
                                <div className="total border rounded-xl flex flex-col p-5 w-full md:w-2/5 text-center shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg">Tổng tiền</p>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500">Tạm tính</p>
                                        <p className="font-semibold">
                                            {convertPriceToString(order.books_total_prices)}
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500">Phí vận chuyển</p>
                                        <p>{convertPriceToString(order.transport_cost)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-lg">Tổng tiền (bao gồm VAT): </p>
                                        <p className="font-semibold text-red-500 text-lg">
                                            {convertPriceToString(order.order_total_cost)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Transport Section */}
                            <div className="transport flex flex-col gap-5 md:flex-row md:justify-between">
                                {/* Transport Type */}
                                <div className="transportType border rounded-xl flex flex-col p-5 w-full md:w-1/2 shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg">Phương thức vận chuyển</p>
                                    <p>{order.transport_name}</p>
                                </div>
                                {/* Notes */}
                                <div className="note border rounded-xl flex flex-col p-5 w-full md:w-1/2 shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg">Ghi chú</p>
                                    <p>Không có</p>
                                </div>
                            </div>

                            <OrderCard OrderData={order} />
                        </div>
                    </div>
                    <Footer />
                </>
            ) : (
                <div className="h-svh flex justify-center items-center">
                    <Loading />
                </div>
            )}
        </>
    );
};

export default OrderDetailPage;
