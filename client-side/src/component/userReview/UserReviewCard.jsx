import React from 'react';
import Rating from '../Rating/Rating';
import { imageUrl } from '~/config/axios.config';
import { formatDate } from '~/utils/functions/formatDate';

const UserReviewCard = ({ rating }) => {
    return (
        <div className="flex gap-[10px] flex-col bg-gray-300 rounded-[4px] p-[10px]">
            <div className="inforBox flex gap-[10px]">
                <div className="icon w-[50px] h-[50px]">
                    <img
                        src={`${imageUrl}/${rating.user.user_avatar_url}`}
                        alt="No image"
                        className="mx-auto rounded-full w-full h-full  object-cover transition duration-700 hover:skew-x-2 "
                    />
                </div>
                <div className="info flex flex-col gap-1">
                    <p className="text-text/md/semibold">{rating.user.user_name}</p>
                    <div className="mb-[2px] flex items-center gap-[10px] ">
                        <Rating rating={rating.rating_star} />
                        <p className="text-text/md/regular">{formatDate(rating.created_at)}</p>
                    </div>
                </div>
            </div>
            <div className="desc">{rating.rating_content}</div>
        </div>
    );
};

export default UserReviewCard;
