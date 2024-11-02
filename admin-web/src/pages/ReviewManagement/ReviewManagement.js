import React, { useState } from 'react';
import { Rate } from 'antd';
import ReviewDetailModal from './ReviewDetailModal';
const types = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chờ duyệt', value: 'pending' },
    { label: 'Đã duyệt', value: 'approved' },
    { label: 'Từ chối', value: 'rejected' },
];
export default function ReviewManagement() {
    const [typeSlt, setTypeSlt] = useState(types[0]);
    const [showRatingIdx, setShowRatingIdx] = useState(-1);
    return (
        <div className="px-12 py-12">
            <p className="text-2xl font-bold">Quản lý đánh giá</p>
            <div className="flex mt-6 gap-4">
                {types.map((type, index) => {
                    return (
                        <div
                            key={`type-${index}`}
                            onClick={() => setTypeSlt(type)}
                            className={`${
                                typeSlt.value === type.value
                                    ? 'bg-blue-600 text-white'
                                    : 'text-blue-600 hover:bg-blue-50'
                            } font-medium  cursor-pointer   transition-all px-8 py-2 rounded-md border-[1px] border-blue-600`}
                        >
                            {type.label}
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {[1, 2, 3, 3, 4, 5].map((rating, idx) => {
                    return (
                        <div
                            onClick={() => setShowRatingIdx(idx)}
                            key={`rating-${idx}`}
                            className="cursor-pointer hover:bg-gray-100  transition-all flex gap-2 px-2 py-2 rounded-md border-[1px]"
                        >
                            <div
                                className="min-w-[60px] h-[60px] bg-no-repeat rounded-full bg-contain"
                                style={{
                                    backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/6596/6596121.png)`,
                                }}
                            ></div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold">Vũ Đình An</p>
                                    <Rate disabled defaultValue={2} />
                                    <p className="text-gray-400 font-medium">24/12/2024</p>
                                    <p className="text-blue-600 font-semibold">on Test Book</p>
                                    <div className="w-[1px] bg-gray-300 h-[20px]"></div>
                                    <p className="text-orange-600 font-bold">Đang chờ duyệt</p>
                                </div>
                                <p className="text-sm text-gray-500 font-medium line-clamp-2">
                                    lorem ipsum is simply dummy text of the printing and typesetting industrylorem ipsum
                                    is simply dummy text of the printing and typesetting industrylorem ipsum is simply
                                    dummy text of the printing and typesetting industrylorem ipsum is simply dummy text
                                    of the printing and typesetting industry
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showRatingIdx !== -1 && <ReviewDetailModal setShowRatingIdx={setShowRatingIdx} />}
        </div>
    );
}
