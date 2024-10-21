import React, { useContext, useEffect, useState } from 'react'
import { ReviewCard } from './ReviewCard'
import reviewApi from '~/apis/ratingApi';
import { UserContext } from '~/context/UserContextProvider';

const Review = () => {
  const [reviews, setReviews] = useState([]); // Trạng thái để lưu trữ đánh giá
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const { user } = useContext(UserContext);
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

if (loading) {
    return <div>Loading...</div>;
}

if (reviews.length === 0) {
    return <div>No reviews found.</div>;
}

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-5 rounded-xl">
        <section data-aos="fade-up" className="container ">
      
            <h1 className='items-center text-center text-2xl pb-5 font-bold'>Your reviews</h1>
          <div className="grid grid-rows-1 gap-8 transition-all duration-300 ease-in-out justify-center">
            {reviews.map((item, index) => (
                 
              <ReviewCard
                key={index}
                img={item.Book.image?.book_image_url} // Cập nhật theo cấu trúc dữ liệu của bạn
                title={item.Book.book_name}
                rating={item.rating_star}
                review={item.rating_content}
                price={item.Book.book_end_cost || 'Price not available'}
              />
          
            ))}
  
          </div>
        </section>
    </div>
  )
}

export default Review