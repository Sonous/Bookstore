import { Rate } from 'antd';
import React from 'react';

export default function ReviewDetailModal({ review, setShowRatingIdx, onApprove, onReject }) {
    console.log('Review in Modal:', review);
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
                <header className="text-2xl font-bold">Đánh giá trên sách "{review.book.book_name}"</header>
                <div className="flex gap-2  my-4">
                    <div
                        className="min-w-[60px] h-[60px] bg-no-repeat rounded-full bg-contain"
                        style={{
                            backgroundImage: `url(${review.user.user_avatar_url})`,
                        }}
                    ></div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4">
                            <p className="text-lg font-semibold">{review.user.user_name}</p>
                            <Rate disabled defaultValue={2} />
                            <p className="text-gray-400 font-medium">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-1 mb-4">
                            <p className="text-blue-600 font-semibold">on {review.book.book_name}</p>
                            <div className="w-[1px] bg-gray-300 h-[20px]"></div>
                            <p
                                className={`font-bold ${
                                    review.review_status === 'approved'
                                        ? 'text-green-600'
                                        : review.review_status === 'rejected'
                                        ? 'text-red-600'
                                        : 'text-yellow-600'
                                }`}
                            >
                                {review.review_status}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{review.rating_content}</p>
                    </div>
                </div>
                {review.review_status === 'pending' && (
                    <div className="w-full flex justify-end gap-4">
                        <div
                            className="px-4 py-2 rounded-md border-[1px] font-semibold cursor-pointer bg-red-500 text-white"
                            onClick={() => {
                                onReject(review.review_id); // Pass the review ID for rejection
                                setShowRatingIdx(-1);
                            }}
                        >
                            Từ chối
                        </div>
                        <div
                            className="px-4 py-2 rounded-md border-[1px] font-semibold cursor-pointer text-white bg-blue-600"
                            onClick={() => {
                                onApprove(review.review_id); // Pass the review ID for approval
                                setShowRatingIdx(-1);
                            }}
                        >
                            Duyệt
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
