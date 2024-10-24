import React, { useContext, useEffect, useState } from 'react';
import Header from '~/layouts/Header/Header';
import OrderCard from '~/pages/OrderDetail/OrderCard';
import { FaHouse } from 'react-icons/fa6';
import Process from './Process';
import { FaAngleDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { routes } from '~/config';
import UserHeading from '../User/UserHeading';
import { UserContext } from '~/context/UserContextProvider';
import orderApi from '~/apis/orderApi';
import addressApi from '~/apis/addressApi';
import { formatDate } from '~/utils/functions/formatDate';

const OrderDetailPage = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!user) {
                setLoading(false); // Set loading to false if no user is present
                return;
            }
            setLoading(true);

            try {
                const [orderData, addressData] = await Promise.all([
                    orderApi.getOrderByUser(user.user_id),
                    addressApi.getAddressByUser(user.user_id),
                ]);
                setOrders(orderData);
                setAddress(addressData);

                // console.log('Fetched Orders:', orderData); // Log fetched orders
                console.log('Fetched Address:', addressData); // Log fetched address
            } catch (error) {
                console.error('Error fetching orders or addresses:', error);
                // Optionally, show a user-friendly error message
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchOrder();
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    if (loading) {
        return <p>Loading orders...</p>;
    }

    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    if (!address || address.length === 0) {
        return <p>Địa chỉ không có sẵn</p>;
    }
    const userAddress = address.length > 0 ? address[0] : null;
    return (
        <div>
            <Header />
            <UserHeading />
            {orders.map((order) => {
                const isCancel = order.order_status === 'Hủy'; // Move this declaration outside of JSX
                return (
                    <div className="" key={order.order_id}>
                        <div className="order mt-10 mx-20 border rounded-xl px-5 py-5 flex flex-col gap-5">
                            <div className="topOrder flex text-center items-center justify-between">
                                <div className="orderID flex gap-10 text-center items-center">
                                    <h1 className="font-bold text-2xl">Mã đơn hàng #{order.order_id}</h1>
                                    <div
                                        className={
                                            isCancel
                                                ? 'bg-red-100 rounded-xl shadow-sm hover:shadow-lg p-1'
                                                : 'bg-green-100 rounded-xl shadow-sm hover:shadow-lg p-1'
                                        }
                                    >
                                        <h1>{isCancel ? 'Đã hủy' : 'Hoàn tất'}</h1>
                                    </div>
                                </div>
                                <div className="date">
                                    <h1>Ngày mua: {formatDate(order.created_at)}</h1>
                                </div>
                            </div>
                            <div className="process">
                                <Process
                                    isCancel={isCancel} // Pass the isCancel variable
                                    orderDate={order.created_at}
                                    completeDate={order.updated_at}
                                />
                            </div>
                            <div className="information flex flex-col gap-5 md:flex-row md:justify-between">
                                {/* User Information */}
                                <div className="userInfor border rounded-xl flex flex-col p-5 w-full md:w-2/5 shadow-sm hover:shadow-lg">
                                    <p className="pb-4 font-semibold text-lg text-center">Thông tin người nhận</p>
                                    <p>{user.user_name}</p>
                                    <p>Tel: {user.user_phone}</p>
                                    <div className="address flex gap-2 items-center">
                                        <FaHouse />
                                        <p>
                                            {userAddress.address_house_number}, {userAddress.address_ward},{' '}
                                            {userAddress.address_district}, {userAddress.address_province}
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
                                        <p className="font-semibold">{order.books_total_prices}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500">Phí vận chuyển</p>
                                        <p>{order.transport_cost}d</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-lg">Tổng tiền (bao gồm VAT): </p>
                                        <p className="font-semibold text-red-500 text-lg">{order.order_total_cost}</p>
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

                            {/* Order History Section */}
                            <div className="history border rounded-xl flex flex-col p-5 gap-5 justify-between shadow-sm hover:shadow-lg">
                                <p className="pb-4 font-semibold text-lg text-center">Lịch sử đơn hàng</p>
                                <div className="detail flex flex-col">
                                    <p>
                                        Đơn hàng <span>{order.order_id} </span>
                                        {isCancel
                                            ? 'của quý khách đã bị hủy. Quý khách hãy phản hồi nếu có vấn đề gì cho chúng tôi.'
                                            : ' của quý khách đã được đối tác vận chuyển xác nhận giao hàng thành công. Cảm ơn quý khách đã mua hàng tại KimDong.'}
                                    </p>
                                    <p className="text-gray-500 text-sm">{order.updated_at}</p>
                                </div>
                                <div className="more flex justify-center items-center gap-5">
                                    <p className="text-blue-500 cursor-pointer">Xem thêm</p>
                                    <FaAngleDown />
                                </div>
                            </div>

                            <OrderCard OrderData={order} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderDetailPage;
