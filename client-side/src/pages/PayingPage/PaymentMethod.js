import React, { useState } from 'react';
import { Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
export default function PaymentMethod() {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="bg-white mt-6 px-6 py-6">
            <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">Phương thức thanh toán</h1>
            <Radio.Group onChange={onChange} value={value}>
                <div className="mt-4 flex flex-col">
                    <Radio value={1} className="flex items-center gap-1">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMoneyBill} className="text-3xl min-w-[40px]" />
                            <p className="text-base">Thanh toán khi nhận hàng</p>
                        </div>
                    </Radio>
                    <Radio value={2} className="flex items-center gap-1 mt-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-[40px] h-[24px] bg-no-repeat bg-cover"
                                style={{
                                    backgroundImage: `url(	https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_momopay.svg?q=105987)`,
                                }}
                            ></div>
                            <p className="text-base">Ví MoMo</p>
                        </div>
                    </Radio>
                </div>
            </Radio.Group>
        </div>
    );
}
