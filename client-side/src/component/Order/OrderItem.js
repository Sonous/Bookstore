import React from 'react';
import StatusTag from './StatusTag';
import { imageUrl } from '~/config/axios.config';
import { convertPriceToString } from '~/utils/functions';
import classNames from 'classnames';

export default function OrderItem({ order_id, order_status, created_at, books, order_total_cost }) {
    const book = books[0];

    const handleNavigateToDetail = () => {
        console.log('fjsdijf');
    };

    const handleCandel = () => {
        console.log('huhuh');
    };

    const handlePurchaseAgain = () => {
        console.log('kokoko');
    };

    return (
        <div className="bg-white rounded-xl sm:p-7 mx-5">
            <div className="flex border-b-2 pb-5 cursor-pointer" onClick={handleNavigateToDetail}>
                <div className="flex-1 flex gap-3">
                    <span>#{order_id}</span>
                    <StatusTag status={order_status} />
                </div>
                <span>{created_at}</span>
            </div>
            <div className="flex gap-3 py-5 border-b-2 cursor-pointer" onClick={handleNavigateToDetail}>
                <img src={`${imageUrl}/${book.bookimages[0].book_image_url}`} alt="" className="w-[90px] h-[90px]" />
                <span>{book.book_name}</span>
            </div>
            <div className="flex items-center pt-5">
                <span className="flex-1">{book.bookorder.quantity} sản phẩm</span>
                <div>
                    <div className="text-end py-2">
                        Tổng tiền:
                        <span className="font-bold"> {convertPriceToString(order_total_cost)}</span>
                    </div>
                    {order_status !== 'Đang giao' && (
                        <div className="grid grid-cols-2 gap-3">
                            {order_status === 'Hoàn tất' ? (
                                <button className="w-[180px] border-2 border-blue-400 border-solid rounded-md text-blue-400 font-bold py-2">
                                    Đánh giá đơn hàng
                                </button>
                            ) : (
                                <button
                                    className={classNames(
                                        'w-[180px] border-2  border-solid rounded-md font-bold py-2',
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
                                    className="bg-primary-color text-white font-bold rounded-md"
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
