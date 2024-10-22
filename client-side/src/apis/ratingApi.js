import { request } from '~/config'; // Ensure the path is correct

const reviewApi = {
    // Get user reviews
    getUserReviews: async (userId) => {
        try {
            const data = await request.get(`/rating/${userId}`);
            return data || []; // Return the reviews data or an empty array if no data
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default reviewApi;
