import classNames from 'classnames';
import React from 'react';

export default function StatusTag({ status }) {
    return (
        <div
            className={classNames('py-1 px-4 border-[1px] rounded-full', {
                'border-yellow-500 bg-yellow-100 text-yellow-500': status.includes('Đang xử lí'),
                'border-red-500 bg-red-100 text-red-500': status.includes('Bị hủy'),
                'border-green-500 bg-green-100 text-green-500': status.includes('Hoàn tất'),
            })}
        >
            {status}
        </div>
    );
}
