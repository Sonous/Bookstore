import React, { useEffect, useState } from 'react';
import UserReviewCard from './UserReviewCard';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import reviewApi from '~/apis/ratingApi';
const ReviewData = [
    {
        img: 'https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mh7ODiu0WfgV6zBme0VteZ1ZHL9u7Imk~tJfb2nawrOSkejebhvK8ISR4Y1GaKpL9Y7EETB9I2qwrt15pOdvHciPgsJYQg14QZU4y-uDmPXW62m1P-DuN~8zdfMbfiSL46MOdrg0ySidN-GOs9GGkaMteJQFDccGtg4uUkpMvimPFAsjy84L4JGNFxx9bsunwB0PgbJV0k7mwMkfRl67~tXjK-1LEKSj8MFHjtu9SiGTG~DdOhx58B726fS8aK8EQAeHkZLHopzKWMwjF5TNpQUoPBmoyAEYAV7acXQ5muCIWWeDh4k8h0HYxlzsTeWI04bJah8NhkYU4sUkLhTYAg__',
        name: 'Nguyen Van B',
        rating: 4,
        since: '1 ngày trước',
        desc: 'Sách rất hay, mọi người nên đọc!',
    },
    {
        img: 'https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mh7ODiu0WfgV6zBme0VteZ1ZHL9u7Imk~tJfb2nawrOSkejebhvK8ISR4Y1GaKpL9Y7EETB9I2qwrt15pOdvHciPgsJYQg14QZU4y-uDmPXW62m1P-DuN~8zdfMbfiSL46MOdrg0ySidN-GOs9GGkaMteJQFDccGtg4uUkpMvimPFAsjy84L4JGNFxx9bsunwB0PgbJV0k7mwMkfRl67~tXjK-1LEKSj8MFHjtu9SiGTG~DdOhx58B726fS8aK8EQAeHkZLHopzKWMwjF5TNpQUoPBmoyAEYAV7acXQ5muCIWWeDh4k8h0HYxlzsTeWI04bJah8NhkYU4sUkLhTYAg__',
        name: 'Nguyen Van B',
        rating: 4,
        since: '1 ngày trước',
        desc: 'Sách rất hay, mọi người nên đọc!',
    },
    {
        img: 'https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mh7ODiu0WfgV6zBme0VteZ1ZHL9u7Imk~tJfb2nawrOSkejebhvK8ISR4Y1GaKpL9Y7EETB9I2qwrt15pOdvHciPgsJYQg14QZU4y-uDmPXW62m1P-DuN~8zdfMbfiSL46MOdrg0ySidN-GOs9GGkaMteJQFDccGtg4uUkpMvimPFAsjy84L4JGNFxx9bsunwB0PgbJV0k7mwMkfRl67~tXjK-1LEKSj8MFHjtu9SiGTG~DdOhx58B726fS8aK8EQAeHkZLHopzKWMwjF5TNpQUoPBmoyAEYAV7acXQ5muCIWWeDh4k8h0HYxlzsTeWI04bJah8NhkYU4sUkLhTYAg__',
        name: 'Nguyen Van B',
        rating: 4,
        since: '1 ngày trước',
        desc: 'Sách rất hay, mọi người nên đọc!',
    },
    {
        img: 'https://s3-alpha-sig.figma.com/img/bd66/44b6/b2a44218a37e0f4a110e8345dba0a38a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mh7ODiu0WfgV6zBme0VteZ1ZHL9u7Imk~tJfb2nawrOSkejebhvK8ISR4Y1GaKpL9Y7EETB9I2qwrt15pOdvHciPgsJYQg14QZU4y-uDmPXW62m1P-DuN~8zdfMbfiSL46MOdrg0ySidN-GOs9GGkaMteJQFDccGtg4uUkpMvimPFAsjy84L4JGNFxx9bsunwB0PgbJV0k7mwMkfRl67~tXjK-1LEKSj8MFHjtu9SiGTG~DdOhx58B726fS8aK8EQAeHkZLHopzKWMwjF5TNpQUoPBmoyAEYAV7acXQ5muCIWWeDh4k8h0HYxlzsTeWI04bJah8NhkYU4sUkLhTYAg__',
        name: 'Nguyen Van B',
        rating: 4,
        since: '1 ngày trước',
        desc: 'Sách rất hay, mọi người nên đọc!',
    },
];
const UserReview = ({ bookId }) => {
    const [showAll, setShowAll] = useState(false);
    const reviewsToShow = showAll ? ReviewData : ReviewData.slice(0, 2);
    const [ratings, setRatings] = useState([]);
    const getAllRatings = async () => {
        const response = await reviewApi.getAllRating(bookId);
        if (response.status === 'success') {
            setRatings(response.data);
        }
    };
    useEffect(() => {
        if (bookId) {
            getAllRatings();
        }
    }, [bookId]);
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="content flex flex-col gap-[10px]">
                {ratings.map((item, index) => (
                    <UserReviewCard key={index} rating={item} />
                ))}
            </div>

            <div className="more-btn flex justify-center gap-4">
                {!showAll ? (
                    <Button
                        variant="outline"
                        className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
                        onClick={() => setShowAll(true)} // Show all reviews on button click
                    >
                        Xem thêm đánh giá
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className="text-text/md/semibold text-black-500 border-black-500 border-[1px] md:text-base"
                        onClick={() => setShowAll(false)} // Hide extra reviews on cancel button click
                    >
                        Hủy
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserReview;
