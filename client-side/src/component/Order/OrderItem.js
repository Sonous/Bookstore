import React from 'react';
import StatusTag from './StatusTag';
import { imageUrl } from '~/config/axios.config';
import { convertPriceToString } from '~/utils/functions';
import classNames from 'classnames';
import { formatDate } from '~/utils/functions/formatDate';
import orderApi from '~/apis/orderApi';
import Swal from 'sweetalert2';
import userApi from '~/apis/userApi';
import { useNavigate } from 'react-router-dom';

export default function OrderItem({
    order_id,
    order_status,
    created_at,
    order_books,
    order_total_cost,
    setIsReload,
    pay_method_name,
    user_id,
}) {
    const book = order_books[0];
    const navigate = useNavigate();

    const handleNavigateToDetail = () => {
        navigate(`/order/${order_id}`);
    };

    const handleCandel = async () => {
        try {
            const result = await Swal.fire({
                title: 'Bạn có muốn hủy đơn hàng này không?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            });

            if (result.isConfirmed) {
                await orderApi.updateOrder(order_id, 'Bị hủy');

                await Swal.fire({
                    title: 'Hủy đơn thành công!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });

                setIsReload((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePurchaseAgain = async () => {
        try {
            await Promise.all(
                order_books.map((book) => userApi.addBookToCart(user_id, book.book_id, book.cart.quantity)),
            );

            navigate('/cart');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl sm:p-7 mx-5">
            <div className="flex border-b-2 pb-5 cursor-pointer" onClick={handleNavigateToDetail}>
                <div className="flex-1 flex gap-3">
                    <span>#{order_id}</span>
                    <StatusTag status={order_status} />
                </div>
                <span>{formatDate(created_at)}</span>
            </div>
            <div className="flex gap-3 py-5 border-b-2 cursor-pointer" onClick={handleNavigateToDetail}>
                <img src={`${imageUrl}/${book.bookimages[0].book_image_url}`} alt="" className="w-[90px] h-[90px]" />
                <span>{book.book_name}</span>
            </div>
            <div className="flex items-center pt-5">
                <span className="flex-1">{order_books.length} sản phẩm</span>
                <div>
                    <div className="text-end py-2">
                        Tổng tiền:
                        <span className="font-bold"> {convertPriceToString(order_total_cost)}</span>
                    </div>
                    {order_status !== 'Đang giao' && (
                        <div className="grid grid-cols-2 gap-3">
                            {order_status === 'Hoàn tất' ? (
                                <button className="w-[180px] border-2 border-blue-400 border-solid rounded-md text-blue-400 font-bold py-2 hover:opacity-70">
                                    Đánh giá đơn hàng
                                </button>
                            ) : (
                                <button
                                    className={classNames(
                                        'w-[180px] border-2  border-solid rounded-md font-bold py-2 hover:opacity-70',
                                        {
                                            'border-gray-400 text-gray-400 hover:cursor-not-allowed': [
                                                'Bị hủy',
                                                'Đổi trả',
                                            ].includes(order_status),
                                            'col-span-2': !['Bị hủy', 'Đổi trả'].includes(order_status),
                                        },
                                    )}
                                    disabled={['Bị hủy', 'Đổi trả'].includes(order_status)}
                                    onClick={handleCandel}
                                >
                                    Hủy đơn
                                </button>
                            )}
                            {['Hoàn tất', 'Bị hủy', 'Đổi trả'].includes(order_status) && (
                                <button
                                    className="bg-primary-color text-white font-bold rounded-md hover:opacity-70"
                                    onClick={handlePurchaseAgain}
                                >
                                    Mua lại
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
