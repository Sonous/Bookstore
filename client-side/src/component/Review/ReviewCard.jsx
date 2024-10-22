import React from 'react';
import Rating from '../Rating/Rating';

export const ReviewCard = ({ img, title, rating, review, price }) => {
  return (
    <div className="flex flex-col xl:flex-row px-3 mx-5 sm:mx-10 items-center justify-between max-w-screen-md bg-gray-800 rounded-xl"> {/* Vertical for small screens, horizontal for lg and above */}
    <div className="overflow-hidden flex-none">
      <img
        src={img}
        alt="No image"
        className="mx-auto h-[180px] w-[180px] object-cover transition duration-700 hover:skew-x-2"
      />
    </div>
    <div className="space-y-2 p-3 flex-grow">
      <div className="items-center border-b border-blue-500">
        <h1 className="line-clamp-2 text-center font-bold text-2xl px-5">{title}</h1>
       
      </div>
      <div className="flex items-center gap-2 opacity-70 justify-center">
        <div className="px-5 rating flex justify-center items-center gap-3">
          <h1>{rating}</h1>
          <span><Rating rating={rating} /></span>
        </div>
        <div className="items-center justify-between py-3">
          <p className="text-xl font-bold text-primary">{price} d {/* Show "Not available" if price is falsy */}</p>
        </div>
      </div>
      <div className="review">
        <h1 className='text-center'>Your Review:</h1>
        <p className='px-5'>{review}</p>
      </div>
    </div>
  </div>
  );
}
