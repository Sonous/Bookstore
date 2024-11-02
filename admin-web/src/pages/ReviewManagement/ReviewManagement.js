import React, { useEffect, useState } from 'react';
import { Rate, Spin, Alert } from 'antd';
import ReviewDetailModal from './ReviewDetailModal';
import adminRatingApi from '~/apis/ratingApi';
import { formatDate } from '~/utils/formatDate';

const types = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chờ duyệt', value: 'pending' },
    { label: 'Đã duyệt', value: 'approved' },
    { label: 'Từ chối', value: 'rejected' },
];

export default function ReviewManagement() {
    const [typeSlt, setTypeSlt] = useState(types[0]);
    const [showRatingIdx, setShowRatingIdx] = useState(-1);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    

    const fetchReviews = async () => {
        setLoading(true);
        setError('');
        try {
            let response;
            switch (typeSlt.value) {
                case 'pending':
                    response = await adminRatingApi.getPendingRatings();
                    break;
                case 'approved':
                    response = await adminRatingApi.getApprovedRatings();
                    break;
                case 'rejected':
                    response = await adminRatingApi.getRejectedRatings();
                    break;
                default:
                    response = await adminRatingApi.getAllRatingAdmin(); // Fetch pending as default
            }
            setReviews(response.data);
        } catch (error) {
            setError('Error fetching reviews.');
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (reviewId) => {
        try {
            await adminRatingApi.approveRating(reviewId);
            fetchReviews(); // Refresh the reviews after approval
        } catch (error) {
            setError('Error approving review.');
            console.error('Error approving review:', error);
        }
    };

    const handleReject = async (reviewId) => {
        try {
            await adminRatingApi.rejectRating(reviewId);
            fetchReviews(); // Refresh the reviews after rejection
        } catch (error) {
            setError('Error rejecting review.');
            console.error('Error rejecting review:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [typeSlt]);

    return (
        <div className="px-12 py-12">
            <p className="text-2xl font-bold">Quản lý đánh giá</p>
            <div className="flex mt-6 gap-4">
                {types.map((type, index) => (
                    <div
                        key={`type-${index}`}
                        onClick={() => setTypeSlt(type)}
                        className={`${
                            typeSlt.value === type.value
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-600 hover:bg-blue-50'
                        } font-medium cursor-pointer transition-all px-8 py-2 rounded-md border-[1px] border-blue-600`}
                    >
                        {type.label}
                    </div>
                ))}
            </div>

            
            {error && <Alert message={error} type="error" showIcon />}

            <div className="mt-4 flex flex-col gap-2">
                {loading && (
                    <div className="flex justify-center mt-10">
                        <Spin size="large" />
                    </div>
                )}
                {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center">No reviews available.</p>
                ) : (
                    reviews.map((review, idx) => (
                        <div
                            onClick={() => setShowRatingIdx(idx)}
                            key={`rating-${idx}`}
                            className="cursor-pointer hover:bg-gray-100 transition-all flex gap-2 px-2 py-2 rounded-md border-[1px]"
                        >
                            <div
                                className="min-w-[60px] h-[60px] bg-no-repeat rounded-full bg-contain"
                                style={{
                                    backgroundImage: `url(${review.user.user_avatar_url})`,
                                }}
                            ></div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold">{review.user.user_name}</p>
                                    <Rate disabled defaultValue={review.rating_star} />
                                    <p className="text-gray-400 font-medium">{new Date(review.created_at).toLocaleDateString()}</p>
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
                                <p className="text-sm text-gray-500 font-medium line-clamp-2">
                                    {review.rating_content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showRatingIdx !== -1 && (
                <ReviewDetailModal
                    setShowRatingIdx={setShowRatingIdx}
                    review={reviews[showRatingIdx]}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}
