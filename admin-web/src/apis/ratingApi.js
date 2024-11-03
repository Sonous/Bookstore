const { request } = require('~/configs');

const adminRatingApi = {
    getPendingRatings: async () => {
        try {
            const response = await request.get('/rating/pending');
            return response || [];
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Approve a rating
    approveRating: async (reviewId) => {
        try {
            const response = await request.put(`/rating/approve/${reviewId}`);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    // Reject a rating
    rejectRating: async (reviewId) => {
        try {
            const response = await request.put(`/rating/reject/${reviewId}`);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getApprovedRatings: async () => {
        try {
            const response = await request.get('/rating/approved');
            return response || [];
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    getRejectedRatings: async () => {
        try {
            const response = await request.get('/rating/rejected');
            return response || [];
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllRatingAdmin: async () => {
        try {
            const response = await request.get('/rating/getAllRatingAdmin');
            return response || [];
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default adminRatingApi;
