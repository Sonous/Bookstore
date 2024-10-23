import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';

export default function AddressForm({ form, city, district, getDistrict, ward, getWards, onFinish }) {
    const [validateAddress, setValidateAddress] = useState([]);

    useEffect(() => {
        return () => {
            setValidateAddress([]);
        };
    }, []);

    return (
        <Form
            form={form}
            className="my-4 max-w-none"
            name="basic"
            autoComplete="off"
            clearOnDestroy={true}
            onFinish={onFinish}
        >
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
                    {
                        pattern: /^(0)(3|5|7|8|9)([0-9]{8})$/,
                        message: 'Số điện thoại không hợp lệ!',
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
        </Form>
    );
}
