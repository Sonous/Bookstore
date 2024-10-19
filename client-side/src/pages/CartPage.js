import React, { useContext } from 'react';
import Header from '~/layouts/Header/Header';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '~/context/UserContextProvider';
import { imageUrl } from '~/config/axios.config';
import { Link } from 'react-router-dom';
import { convertPriceToString } from '~/utils/functions';
import cartApi from '~/apis/cartApi';
export default function CartPage() {
    const { cartItems, setCartItems, user } = useContext(UserContext);
    const handleAddQuantity = async (bookId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.book_id === bookId) {
                return { ...item, cart: { ...item.cart, quantity: item.cart.quantity + 1 } };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        await cartApi.addQuantity(user.user_id, bookId);
    };
    const handleSubQuantity = async (bookId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.book_id === bookId && item.cart.quantity > 1) {
                // Only decrease if quantity is greater than 1 to avoid negative or zero values
                return { ...item, cart: { ...item.cart, quantity: item.cart.quantity - 1 } };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        await cartApi.subQuantity(user.user_id, bookId);
    };
    return (
        <div className="">
            <Header />
            <div className="px-24 bg-gray-100 ">
                <h2 className="pt-6 text-xl mb-4">GIỎ HÀNG ({cartItems?.length ? cartItems.length : 0} sản phẩm)</h2>
                <div className="flex gap-4">
                    <div className="basis-[70%]">
                        <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white">
                            <div className="basis-[60%] flex text-sm font-semibold items-center gap-2 ">
                                <Checkbox></Checkbox>
                                <p>Chọn tất cả ({cartItems?.length ? cartItems.length : 0} sản phẩm)</p>
                            </div>
                            <div className="basis-[40%] flex items-center">
                                <p className=" basis-[45%] text-center">Số lượng</p>
                                <p className=" basis-[45%]  text-center">Thành tiền</p>
                                <p className=" basis-[10%]  text-center"></p>
                            </div>
                        </div>
                        <div className="mt-4 rounded-lg overflow-hidden ">
                            {cartItems?.map((cartItem, idx) => {
                                return (
                                    <div key={idx}>
                                        <div className={`flex px-4 py-6 bg-white `}>
                                            <div className="basis-[60%] flex gap-4">
                                                <Checkbox />
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${imageUrl}/${cartItem.bookimages[0].book_image_url})`,
                                                    }}
                                                    className="min-w-[120px] h-[120px] bg-no-repeat bg-cover"
                                                ></div>
                                                <div className="flex flex-col justify-between">
                                                    <Link to={`/books/${cartItem.book_name}`} className=" line-clamp-3">
                                                        {cartItem.book_name}
                                                    </Link>
                                                    <div className="flex items-end gap-1">
                                                        <p className="font-bold">
                                                            {convertPriceToString(cartItem.book_end_cost)}
                                                        </p>
                                                        <p className="text-xs mb-1 line-through text-gray-500">
                                                            {convertPriceToString(cartItem.book_cost)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-[40%] flex items-center">
                                                <div className=" basis-[45%] flex justify-center">
                                                    <div className=" border-[1px] rounded-md text-center items-center justify-center inline-flex">
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                            onClick={() => {
                                                                handleSubQuantity(cartItem.book_id);
                                                            }}
                                                            className="px-2 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                                        />
                                                        <p className="font-bold text-gray-700 px-2 select-none">
                                                            {cartItem.cart.quantity}
                                                        </p>
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            onClick={() => {
                                                                handleAddQuantity(cartItem.book_id);
                                                            }}
                                                            className="px-2 py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <p className=" basis-[45%]  text-center select-none text-primary-color font-bold">
                                                    {convertPriceToString(cartItem.book_end_cost)}
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
                                    </div>
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
