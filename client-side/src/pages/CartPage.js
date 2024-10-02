import React from 'react';
import Header from '~/layouts/Header/Header';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
export default function CartPage() {
    return (
        <div className="">
            <Header />
            <div className="px-24 bg-gray-100 h-[1000px]">
                <h2 className="pt-6 text-xl mb-4">GIỎ HÀNG (2 sản phẩm)</h2>
                <div className="flex gap-4">
                    <div className="basis-[70%]">
                        <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white">
                            <div className="basis-[60%] flex text-sm font-semibold items-center gap-2 ">
                                <Checkbox></Checkbox>
                                <p>Chọn tất cả (2 sản phẩm)</p>
                            </div>
                            <div className="basis-[40%] flex items-center">
                                <p className=" basis-[45%] text-center">Số lượng</p>
                                <p className=" basis-[45%]  text-center">Thành tiền</p>
                                <p className=" basis-[10%]  text-center"></p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-lg overflow-hidden ">
                            {[1, 2, 3].map((el, idx) => {
                                return (
                                    <>
                                        <div className={`flex px-4 py-6 bg-white `}>
                                            <div className="basis-[60%] flex gap-4">
                                                <Checkbox />
                                                <div
                                                    style={{
                                                        backgroundImage: `url(https://cdn0.fahasa.com/media/catalog/product//b/1/b1-1_1_5.jpg)`,
                                                    }}
                                                    className="min-w-[120px] h-[120px] bg-no-repeat bg-cover"
                                                ></div>
                                                <div className="flex flex-col justify-between">
                                                    <p className="text-sm line-clamp-3">
                                                        Destination B1 - Grammar And Vocabulary with Answer Key
                                                    </p>
                                                    <div className="flex items-end gap-1">
                                                        <p className="font-bold">131.820 đ</p>
                                                        <p className="text-xs mb-1 line-through text-gray-500">
                                                            169.000 đ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-[40%] flex items-center">
                                                <div className=" basis-[45%] flex justify-center">
                                                    <div className=" border-[1px] rounded-md text-center items-center justify-center inline-flex">
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                            className="px-2 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                                        />
                                                        <p className="font-bold text-gray-700 px-2 select-none">1</p>
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className="px-2 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <p className=" basis-[45%]  text-center select-none text-primary-color font-bold">
                                                    131.820 đ
                                                </p>
                                                <div className="basis-[10%]">
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="text-xl text-gray-400 cursor-pointer hover:text-gray-700 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {idx !== 2 && (
                                            <div className="bg-white w-[100%] h-[1px]">
                                                <div className="h-[1px] w-[90%] mx-auto bg-gray-200"></div>
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className="basis-[30%]">
                        <div className="px-4  py-4 bg-white rounded-lg">
                            <div className="flex pb-3 justify-between">
                                <h1>Thành tiền</h1>
                                <h1>0 đ</h1>
                            </div>
                            <div className="bg-gray-200 h-[1px] w-full mx-auto"></div>
                            <div className="flex justify-between py-4 items-center">
                                <h1 className="font-bold">Tổng số tiền (gồm VAT)</h1>
                                <h1 className="text-xl text-primary-color font-bold">0 đ</h1>
                            </div>
                            <div className="w-full py-2 bg-primary-color text-white uppercase font-bold text-center rounded-md cursor-pointer transition-all hover:bg-red-700 select-none">
                                Thanh toán
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
