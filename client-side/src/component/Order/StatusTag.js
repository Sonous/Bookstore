import classNames from 'classnames';
import React from 'react';

export default function StatusTag({ status }) {
    return (
        <div
            className={classNames('border rounded-2xl px-3 font-bold text-center bg-yellow-200 text-yellow-500', {
                '!bg-green-200 !text-green-500': status === 'Hoàn tất',
                '!bg-red-200 !text-red-500': status === 'Bị hủy',
                '!bg-gray-200 !text-gray-500': status === 'Đổi trả',
            })}
        >
            <span>{status}</span>
        </div>
    );
}
