import { Rate } from 'antd';
import React from 'react';

export default function ReviewDetailModal({ setShowRatingIdx }) {
    return (
        <div
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    setShowRatingIdx(-1);
                }
            }}
            className="fixed top-0 right-0 left-0 bottom-0 bg-black/50 flex items-center justify-center"
        >
            <div className="bg-white p-[24px] rounded-xl w-[600px]">
                <header className="text-2xl font-bold">Đánh giá trên sách "Test Book"</header>
                <div className="flex gap-2  my-4">
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
                        </div>
                        <div className="flex items-center gap-4 mt-1 mb-4">
                            <p className="text-blue-600 font-semibold">on Test Book</p>
                            <div className="w-[1px] bg-gray-300 h-[20px]"></div>
                            <p className="text-orange-600 font-bold">Đang chờ duyệt</p>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            lorem ipsum is simply dummy text of the printing and typesetting industrylorem ipsum is
                            simply dummy text of the printing and typesetting industrylorem ipsum is simply dummy text
                            of the printing and typesetting industrylorem ipsum is simply dummy text of the printing and
                            typesetting industry
                        </p>
                    </div>
                </div>
                <div className="w-full flex justify-end gap-4">
                    <div className="px-4 py-2 rounded-md border-[1px] font-semibold cursor-pointer bg-red-500 text-white">
                        Từ chối
                    </div>
                    <div className="px-4 py-2 rounded-md border-[1px] font-semibold cursor-pointer text-white bg-blue-600">
                        Duyệt
                    </div>
                </div>
            </div>
        </div>
    );
}
