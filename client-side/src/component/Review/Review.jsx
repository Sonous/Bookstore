import React, { useContext, useEffect, useState } from 'react'
import { ReviewCard } from './ReviewCard'
import reviewApi from '~/apis/ratingApi';
import { UserContext } from '~/context/UserContextProvider';
import { Button } from 'antd';

const Review = () => {
  const [reviews, setReviews] = useState([]); // Trạng thái để lưu trữ đánh giá
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const { user } = useContext(UserContext);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
        if (!user) return; // Nếu không có user, không gọi API

        try {
            const data = await reviewApi.getUserReviews(user.user_id);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchReviews();
}, [user]); // Thêm user vào mảng phụ thuộc
//Load them review
const handleLoadMore = () => {
  setVisibleCount(reviews.length); 
  setShowAll(true);
};
const handleShowLess = () => {
  setVisibleCount(3); 
  setShowAll(false);
};
if (loading) {
    return <div>Loading...</div>;
}

if (reviews.length === 0) {
    return <div>No reviews found.</div>;
}

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-5 rounded-xl">
        <section data-aos="fade-up" className="container">
          <h1 className='items-center text-center text-2xl pb-5 font-bold'>Your reviews</h1>
          <div className="grid grid-rows-1 gap-8 transition-all duration-300 ease-in-out justify-center">
            {reviews.slice(0, visibleCount).map((item, index)  => (
                 
              <ReviewCard
                key={index}
                img={item.Book.image?.book_image_url}
                title={item.Book.book_name}
                rating={item.rating_star}
                review={item.rating_content}
                price={item.Book.book_end_cost || 'Price not available'}
              />
          
            ))}
              <div className="button items-center text-center">
                {!showAll ? (
                    <Button className='bg-gray-800 text-white text-center' onClick={handleLoadMore}>
                        Xem thêm
                    </Button>
                ) : (
                    <Button className='bg-gray-800 text-white text-center' onClick={handleShowLess}>
                        Rút gọn
                    </Button>
                )}
            </div>
          </div>
          
        </section>
    </div>
  )
}

export default Review