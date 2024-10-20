import React from 'react'
import { ReviewCard } from './ReviewCard'
const ReviewData = [
    {
        img: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935235238961.jpg',
        title: "Đồi thỏ",
        date: "02/10/2024",
        rating: "5",
        review: "Đồi Thỏ của Richard Adams là một tác phẩm mà tôi rất yêu thích. Cuốn sách không chỉ đơn thuần là câu chuyện về cuộc hành trình của những chú thỏ, mà còn là một bài học về tình bạn, sự kiên trì và lòng dũng cảm.",
        price: '135.200',
      },
      {
        img: 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935235238961.jpg',
        title: "Đồi thỏ",
        date: "02/10/2024",
        rating: "5",
        review: "Đồi Thỏ của Richard Adams là một tác phẩm mà tôi rất yêu thích. Cuốn sách không chỉ đơn thuần là câu chuyện về cuộc hành trình của những chú thỏ, mà còn là một bài học về tình bạn, sự kiên trì và lòng dũng cảm.",
        price: '135.200',
      },
    ]
const Review = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-5 rounded-xl">
        <section data-aos="fade-up" className="container ">
      
            <h1 className='items-center text-center text-2xl pb-5 font-bold'>Your reviews</h1>
          <div className="grid grid-rows-1 gap-8 transition-all duration-300 ease-in-out justify-center">
            {ReviewData.map((item, index) => (
              <ReviewCard
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
    </div>
  )
}

export default Review