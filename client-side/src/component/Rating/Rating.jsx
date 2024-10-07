import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faRegStar } from '@fortawesome/free-solid-svg-icons'; // Use this line if you are using solid and half stars.

const Rating = ({ rating, maxRating = 5 }) => {
    const ratings = Array.from({ length: maxRating }, (_, index) => {
        if (index < Math.floor(rating)) {
            return <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400" />; // Filled star
        } else if (index === Math.floor(rating) && rating % 1 !== 0) {
            return <FontAwesomeIcon key={index} icon={faStarHalfAlt} className="text-yellow-400" />; // Half star
        } else {
            return <FontAwesomeIcon key={index} icon={faRegStar} className="text-yellow-400" />; // Outline star
        }
    });

    return (
        <div className="flex">
            {ratings}
        </div>
    );
};


export default Rating