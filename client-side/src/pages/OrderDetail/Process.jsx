import classNames from 'classnames';
import React from 'react';
import { FaClipboardList, FaBox, FaCircleCheck, FaCircleXmark, FaTruck } from 'react-icons/fa6';

function Process({ status, orderDate, completeDate }) {
    return (
        <div
            className={classNames('bg-yellow-100 rounded-xl shadow-sm hover:shadow-lg', {
                '!bg-red-100': status === 'Bị hủy',
                '!bg-green-100 ': status === 'Hoàn tất',
                '!bg-blue-100 ': status === 'Đang xác nhận',
            })}
        >
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-10 gap-5 py-10">
                {/* New Order Section */}
                <div className="newOrder flex gap-5 items-center">
                    <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
                        <FaClipboardList
                            className={classNames('text-yellow-500 text-3xl', {
                                '!text-red-500': status === 'Bị hủy',
                                '!text-green-500': status === 'Hoàn tất',
                                '!text-blue-500': status === 'Đang xác nhận',
                            })}
                        />
                    </div>
                    <div className="content flex flex-col">
                        <h1 className="font-bold text-lg md:text-xl">Đơn hàng mới</h1>
                        <p className="text-sm md:text-base">{orderDate}</p>
                    </div>
                </div>

                {/* Road Section */}
                <div className="road flex-grow mx-4 flex items-center">
                    <div
                        className={classNames('border-dotted border-b-8 w-full border-zinc-500', {
                            '!border-red-700': status === 'Bị hủy',
                            '!border-green-700': status === 'Hoàn tất',
                            '!border-blue-700': status === 'HĐang xác nhận',
                        })}
                    ></div>
                </div>

                {/* Processing Section */}
                <div className="processing flex gap-5 items-center">
                    <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
                        <FaBox
                            className={classNames('text-zinc-500 text-3xl', {
                                '!text-red-500': status === 'Bị hủy',
                                '!text-green-500': status === 'Hoàn tất',
                                '!text-blue-500': status === 'HĐang xác nhận',
                            })}
                        />
                    </div>
                    <div className="content flex flex-col">
                        <h1
                            className={classNames('font-bold text-lg md:text-xl', {
                                'text-zinc-500': status === 'Đang xử lý',
                            })}
                        >
                            Đang xử lý
                        </h1>
                    </div>
                </div>

                {/* Road Section */}
                <div className="road flex-grow mx-4 flex items-center">
                    <div
                        className={classNames('border-dotted border-b-8 w-full border-zinc-500', {
                            '!border-red-700': status === 'Bị hủy',
                            '!border-green-700': status === 'Hoàn tất',
                            '!border-blue-700': status === 'HĐang xác nhận',
                        })}
                    ></div>
                </div>

                {/* Delivery Section */}
                <div className="delivery flex gap-5 items-center">
                    <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
                        <FaTruck
                            className={classNames('text-zinc-500 text-3xl', {
                                '!text-red-500': status === 'Bị hủy',
                                '!text-green-500': status === 'Hoàn tất',
                                '!text-blue-500': status === 'HĐang xác nhận',
                            })}
                        />
                    </div>
                    <div className="content flex flex-col">
                        <h1
                            className={classNames('font-bold text-lg md:text-xl', {
                                'text-zinc-500': status === 'Đang xử lý',
                            })}
                        >
                            Đang giao hàng
                        </h1>
                    </div>
                </div>

                {/* Road Section */}
                <div className="road flex-grow mx-4 flex items-center">
                    <div
                        className={classNames('border-dotted border-b-8 w-full border-zinc-500', {
                            '!border-red-700': status === 'Bị hủy',
                            '!border-green-700': status === 'Hoàn tất',
                            '!border-blue-700': status === 'HĐang xác nhận',
                        })}
                    ></div>
                </div>

                {/* Complete Section */}
                <div className="complete flex gap-5 items-center">
                    <div className="bg-white rounded-full border w-[65px] h-[65px] flex items-center justify-center">
                        {status === 'Bị hủy' ? (
                            <FaCircleXmark className="text-red-500 text-3xl" />
                        ) : (
                            <FaCircleCheck
                                className={classNames('text-green-500 text-3xl', {
                                    'text-zinc-500': status !== 'Hoàn tất',
                                })}
                            />
                        )}
                    </div>
                    <div className="content flex flex-col">
                        <h1
                            className={classNames('font-bold text-lg md:text-xl', {
                                'text-zinc-500': status === 'Đang xử lý',
                            })}
                        >
                            {'Hoàn tất'}
                        </h1>
                        <p
                            className={classNames('text-sm md:text-base', {
                                'text-zinc-500': status === 'Đang xử lý',
                            })}
                        >
                            {completeDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Process;
