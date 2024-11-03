import React, { useContext, useEffect, useState } from 'react';
import Header from '~/layouts/Header/Header';
import { Checkbox, Form, Input, Radio, Select, Space, Button } from 'antd';
import axios from 'axios';
import PaymentMethod from './PaymentMethod';
import userApi from '~/apis/userApi';
import { UserContext } from '~/context/UserContextProvider';
import { convertPriceToString } from '~/utils/functions';
import { imageUrl } from '~/config/axios.config';
import orderApi from '~/apis/orderApi';
import cartApi from '~/apis/cartApi';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import AddressForm from './AddressForm';
import NotFound from '../NotFound';

export default function PayingPage() {
    const [form] = Form.useForm();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    const [addressInfo, setAddressInfo] = useState();
    const [selectedAddress, setSelectedAddress] = useState(0);
    const [orderDetail, setOrderDetail] = useState('');
    const { user, setIsReloadCart } = useContext(UserContext);
    const navigate = useNavigate();
    const orderFromStorage = localStorage.getItem('order');

    const { type } = useParams();

    const getCity = async () => {
        const response = await axios.get('https://vapi.vnappmob.com/api/province/');
        const dataCity = [];
        response.data.results.map((city, idx) => {
            dataCity.push({
                label: city.province_name,
                value: city.province_id,
            });
        });
        setCity(dataCity);
        // const response = await axios.get('https://provinces.open-api.vn/api/');
        // const dataCity = [];
        // response.data.map((city, idx) => {
        //     dataCity.push({
        //         label: city.name,
        //         value: city.code,
        //     });
        // });
        // setCity(dataCity);
    };
    const getDistrict = async (e) => {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${e}`);
        const dataDistrict = [];
        response.data.results.map((district, idx) => {
            dataDistrict.push({
                label: district.district_name,
                value: district.district_id,
            });
        });
        setDistrict(dataDistrict);

        // const response = await axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`);
        // const dataDistrict = [];
        // response.data.districts.map((district, idx) => {
        //     dataDistrict.push({
        //         label: district.name,
        //         value: district.code,
        //     });
        // });
        // setDistrict(dataDistrict);
    };
    const getWards = async (e) => {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${e}`);
        const dataWard = [];
        response.data.results.map((ward, idx) => {
            dataWard.push({
                label: ward.ward_name,
                value: ward.ward_id,
            });
        });
        setWard(dataWard);
        // const response = await axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`);
        // const dataWard = [];
        // response.data.wards.map((ward, idx) => {
        //     dataWard.push({
        //         label: ward.name,
        //         value: ward.code,
        //     });
        // });
        // setWard(dataWard);
    };
    useEffect(() => {
        getCity();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const address = await userApi.getAddressOfUser(user.user_id);

            setAddressInfo(address);
        };

        if (user) fetchApi();
    }, [user]);

    const onChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const getLabelByValue = (list, value) => {
        const result = list.find((item) => item.value === value);

        return result.label;
    };

    const submitOrder = async (address) => {
        try {
            const orderInfo = {
                ...orderDetail,
                order_address_info: selectedAddress === 0 ? addressInfo : address,
                order_status: 'Đang xác nhận',
                user_id: user.user_id,
            };

            await orderApi.saveOrder(orderInfo);

            if (!type) {
                orderInfo.order_books.forEach(async (book) => {
                    await cartApi.deleteCartItem(user.user_id, book.book_id);
                });
            }

            setIsReloadCart(true);

            Swal.fire({
                title: 'Đặt hàng thành công!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                didClose: () => {
                    localStorage.removeItem('order');
                    navigate('/');
                },
            });
        } catch (error) {
            Swal.fire({
                title: 'Đặt hàng không thành công, xảy ra lỗi!',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleSubmitOrder = async () => {
        if (selectedAddress === 1) {
            form.submit();
            return;
        }

        await submitOrder();
    };

    const onFinish = async (values) => {
        await submitOrder({
            user_name: values.username,
            user_phone: values.phonenumber,
            address: {
                address_house_number: values.address,
                address_ward: getLabelByValue(ward, values.ward),
                address_district: getLabelByValue(district, values.district),
                address_province: getLabelByValue(city, values.city),
            },
        });
    };

    return (
        <>
            {orderFromStorage ? (
                <>
                    <Header />
                    <div className="px-24 bg-gray-100 pb-[300px]">
                        <div className="pt-6"></div>
                        <div className="bg-white px-6 py-6">
                            <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2 mb-3">
                                Địa chỉ giao hàng
                            </h1>

                            {addressInfo && (
                                <Radio.Group value={selectedAddress} onChange={onChange}>
                                    <Space direction="vertical">
                                        <Radio value={0}>
                                            {addressInfo.user_name} | {Object.values(addressInfo.address).join(', ')} |{' '}
                                            {addressInfo.user_phone}
                                        </Radio>
                                        <Radio value={1}>Giao đến địa chỉ khác</Radio>
                                    </Space>
                                </Radio.Group>
                            )}

                            {selectedAddress === 1 && (
                                <AddressForm
                                    form={form}
                                    city={city}
                                    district={district}
                                    getDistrict={getDistrict}
                                    ward={ward}
                                    getWards={getWards}
                                    onFinish={onFinish}
                                />
                            )}
                        </div>
                        <PaymentMethod orderDetail={orderDetail} setOrderDetail={setOrderDetail} />
                        <div className="bg-white px-6 py-6 mt-6">
                            <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">
                                Kiểm tra lại đơn hàng
                            </h1>

                            <div className="flex flex-col gap-5 mt-5">
                                {orderDetail &&
                                    orderDetail.order_books.map((book, index) => {
                                        return (
                                            <div className="flex gap-4 " key={index}>
                                                <div
                                                    className="basis-[13%] min-w-[150px] h-[150px] bg-no-repeat bg-cover"
                                                    style={{
                                                        backgroundImage: `url(${imageUrl}/${book.bookimages[0].book_image_url})`,
                                                    }}
                                                ></div>
                                                <div className="mt-4 basis-[50%]">
                                                    <p>{book.book_name}</p>
                                                </div>
                                                <div className="mt-4 basis-[12%]">
                                                    <p className="text-sm">
                                                        {convertPriceToString(book.book_end_cost)}
                                                    </p>
                                                    <p className="text-sm line-through text-gray-500">
                                                        {convertPriceToString(book.book_cost)}
                                                    </p>
                                                </div>
                                                <div className="mt-4 basis-[10%]">
                                                    <p>Số lượng: {book.cart.quantity}</p>
                                                </div>
                                                <div className="mt-4 basis-[10%]">
                                                    <p className="text-yellow-500 font-bold">
                                                        {convertPriceToString(book.cart.quantity * book.book_end_cost)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 right-0 left-0 bg-white px-24 py-4 ">
                        <div className="flex items-end flex-col">
                            <div className="flex">
                                <p>Thành tiền</p>
                                <p className="min-w-[180px] text-end">
                                    {convertPriceToString(orderDetail.books_total_prices)}
                                </p>
                            </div>
                            <div className="flex">
                                <p>Phí vận chuyển ({orderDetail.transport_name})</p>
                                <p className="min-w-[180px] text-end">
                                    {convertPriceToString(orderDetail.transport_cost)}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="font-bold">Tổng Số Tiền (gồm VAT)</p>
                                <p className="min-w-[180px] text-end text-lg text-yellow-500 font-extrabold">
                                    {convertPriceToString(orderDetail.order_total_cost)}
                                </p>
                            </div>
                        </div>
                        <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <Checkbox defaultChecked />
                                <div>
                                    <p className="text-sm text-gray-700 font-semibold">
                                        Bằng việc mua hàng bạn đồng ý với
                                    </p>
                                    <p className="text-sm text-blue-500 font-bold">
                                        Điều khoản & Điều kiện của Kim Đồng
                                    </p>
                                </div>
                            </div>

                            <div
                                className="px-6 py-2 cursor-pointer select-none rounded-md transition-all hover:bg-red-700 bg-primary-color text-white text-xl font-bold"
                                onClick={handleSubmitOrder}
                            >
                                Xác nhận thanh toán
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <NotFound />
            )}
        </>
    );
}
