import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const payingMethod = [
    {
        pay_method_id: 40001,
        pay_method_name: 'Thanh toán khi nhận hàng',
    },
    {
        pay_method_id: 40002,
        pay_method_name: 'Ví momo',
    },
];

export default function PaymentMethod({ orderDetail, setOrderDetail }) {
    const [value, setValue] = useState(0);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    useEffect(() => {
        let order = JSON.parse(localStorage.getItem('order'));

        setOrderDetail({
            ...order,
            pay_method_name: payingMethod[value].pay_method_name,
        });
    }, [value]);

    return (
        <div className="bg-white mt-6 px-6 py-6">
            <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">Phương thức thanh toán</h1>
            <Radio.Group onChange={onChange} value={value}>
                <div className="mt-4 flex flex-col">
                    <Radio value={0} className="flex items-center gap-1">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMoneyBill} className="text-3xl min-w-[40px]" />
                            <p className="text-base">{payingMethod[0].pay_method_name}</p>
                        </div>
                    </Radio>
                    <Radio value={1} className="flex items-center gap-1 mt-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-[40px] h-[24px] bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: `url(	https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=105987)`,
                                }}
                            ></div>
                            <p className="text-base">{payingMethod[1].pay_method_name}</p>
                        </div>
                    </Radio>
                </div>
            </Radio.Group>
        </div>
    );
}
