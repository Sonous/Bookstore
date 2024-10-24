import React, { useContext, useEffect, useState } from 'react';
import UserReviewCard from './UserReviewCard';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import reviewApi from '~/apis/ratingApi';
import { UserContext } from '~/context/UserContextProvider';
import { formatDate } from '~/utils/functions/formatDate';

const UserReview = ({ book }) => {
    const { user } = useContext(UserContext); // Get the current user from context
    const [showAll, setShowAll] = useState(false);
    const [reviews, setReviews] = useState([]); // State to store reviews
    const [loading, setLoading] = useState(true); // Loading state
    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const fetchReviews = async () => {
            // Check if the book exists to prevent unnecessary API calls
            if (!book || !book.book_id) return;

            try {
                const data = await reviewApi.getBookReviews(book.book_id);
                setReviews(data); // Set reviews in state
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false
            }
        };

        fetchReviews(); // Call the function to fetch reviews
    }, [book]);
    console.log('review',reviews)
    const handleLoadMore = () => {
        setVisibleCount(reviews.length); 
        setShowAll(true);
    };

    const handleShowLess = () => {
        setVisibleCount(3); 
        setShowAll(false);
    };

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="content flex flex-col gap-[10px]">
                {reviews.slice(0, visibleCount).map((item, index) => (
                    <UserReviewCard 
                    key={index}
                    name={user?.user_name} // Safely access user name
                    img={user?.user_avatar_url} // Safely access user avatar
                    rating={item.rating_star}
                    review={item.rating_content}
                    since={formatDate(item.created_at)} 
                    />
                ))}
            </div>

            <div className="more-btn flex justify-center gap-4">
                {!showAll ? (
                    <Button
                        variant="outline"
                        className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
                        onClick={handleLoadMore} // Correctly handle "load more" action
                    >
                        Xem thêm đánh giá
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
                        onClick={handleShowLess} // Correctly handle "show less" action
                    >
                        Hủy
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserReview;
