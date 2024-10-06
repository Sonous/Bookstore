import React, { useEffect, useState } from 'react';
import Header from '~/layouts/Header/Header';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';
import PaymentMethod from './PaymentMethod';
export default function PayingPage() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const [validateAddress, setValidateAddress] = useState([]);
    const [form] = Form.useForm();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const getCity = async () => {
        const response = await axios.get('https://provinces.open-api.vn/api/');
        const dataCity = [];
        response.data.map((city, idx) => {
            dataCity.push({
                label: city.name,
                value: city.code,
            });
        });
        setCity(dataCity);
    };
    const getDistrict = async (e) => {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`);
        const dataDistrict = [];
        response.data.districts.map((district, idx) => {
            dataDistrict.push({
                label: district.name,
                value: district.code,
            });
        });
        setDistrict(dataDistrict);
    };
    const getWards = async (e) => {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`);

        const dataWard = [];
        response.data.wards.map((ward, idx) => {
            dataWard.push({
                label: ward.name,
                value: ward.code,
            });
        });
        setWard(dataWard);
    };
    useEffect(() => {
        getCity();
    }, []);
    return (
        <div>
            <Header />
            <div className="px-24 bg-gray-100 pb-[300px]">
                <div className="pt-6"></div>
                <div className="bg-white px-6 py-6">
                    <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">
                        Địa chỉ giao hàng
                    </h1>
                    <Form form={form} className="my-4" name="basic" onFinish={onFinish} autoComplete="off">
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Họ và tên người nhận:</p>}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ tên người nhận',
                                },
                            ]}
                        >
                            <Input className="" placeholder="Nhập họ và tên người nhận" />
                        </Form.Item>
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Số điện thoại:</p>}
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại nhận hàng',
                                },
                            ]}
                        >
                            <Input className="" placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Tỉnh/Thành Phố:</p>}
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn tỉnh/thành phố',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
                                defaultValue={'Thành phố Hà Nội'}
                                style={{ width: '100%' }}
                                onChange={(e) => {
                                    getDistrict(e);
                                    form.setFieldsValue({ district: null, ward: null });
                                    setValidateAddress((prev) => ['city']);
                                }}
                                options={city}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Quận/Huyện:</p>}
                            name="district"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn quận',
                                },
                            ]}
                        >
                            <Select
                                disabled={validateAddress.includes('city') ? false : true}
                                placeholder="Chọn quận/huyện"
                                style={{ width: '100%' }}
                                onChange={(e) => {
                                    getWards(e);
                                    form.setFieldsValue({ ward: null });
                                    setValidateAddress((prev) => ['city', 'district']);
                                }}
                                options={district}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Phường/Xã:</p>}
                            name="ward"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phường/xã',
                                },
                            ]}
                        >
                            <Select
                                disabled={validateAddress.includes('district') ? false : true}
                                placeholder="Chọn phường/xã"
                                style={{ width: '100%' }}
                                onChange={() => {
                                    setValidateAddress((prev) => [...prev, 'ward']);
                                }}
                                options={ward}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<p className="min-w-[170px] text-start text-sm">Địa chỉ nhận hàng:</p>}
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số địa chỉ nhận hàng',
                                },
                            ]}
                        >
                            <Input className="" placeholder="Nhập địa chỉ nhận hàng" />
                        </Form.Item>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                </div>
                <PaymentMethod />
                <div className="bg-white px-6 py-6 mt-6">
                    <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">
                        Kiểm tra lại đơn hàng
                    </h1>
                    <div className="flex gap-4 ">
                        <div
                            className="basis-[13%] min-w-[150px] h-[150px] bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(https://cdn0.fahasa.com/media/catalog/product//b/_/b_a-in-g_c-nh_-c_-n_ng.jpg)`,
                            }}
                        ></div>
                        <div className="mt-4 basis-[50%]">
                            <p>Góc nhỏ có nắng</p>
                        </div>
                        <div className="mt-4 basis-[12%]">
                            <p className="text-sm">54.400 đ</p>
                            <p className="text-sm line-through text-gray-500">68.000 đ</p>
                        </div>
                        <div className="mt-4 basis-[10%]">
                            <p>Số lượng : 1</p>
                        </div>
                        <div className="mt-4 basis-[10%]">
                            <p className="text-yellow-500 font-bold">54.400 đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 left-0 bg-white px-24 py-4 ">
                <div className="flex items-end flex-col">
                    <div className="flex">
                        <p>Thành tiền</p>
                        <p className="min-w-[180px] text-end">54.400 đ</p>
                    </div>
                    <div className="flex">
                        <p>Phí vận chuyển (Giao hàng tiêu chuẩn)</p>
                        <p className="min-w-[180px] text-end">20.000 đ</p>
                    </div>
                    <div className="flex">
                        <p className="font-bold">Tổng Số Tiền (gồm VAT)</p>
                        <p className="min-w-[180px] text-end text-lg text-yellow-500 font-extrabold">74.400 đ</p>
                    </div>
                </div>
                <div className="my-4 h-[0.5px] w-full bg-gray-300"></div>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Checkbox defaultChecked />
                        <div>
                            <p className="text-sm text-gray-700 font-semibold">Bằng việc mua hàng bạn đồng ý với</p>
                            <p className="text-sm text-blue-500 font-bold">Điều khoản & Điều kiện của Kim Đồng</p>
                        </div>
                    </div>
                    <div className="px-6 py-2 cursor-pointer select-none rounded-md transition-all hover:bg-red-700 bg-primary-color text-white text-xl font-bold">
                        Xác nhận thanh toán
                    </div>
                </div>
            </div>
        </div>
    );
}
