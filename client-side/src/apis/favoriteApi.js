import { request } from '~/config'; // Đảm bảo đường dẫn đúng

const favoriteApi = {
    // Thêm sách yêu thích
    addFavoriteBook: async (userId, bookId) => {
        try {
            const data = await request.post('/favorite/add', {
                user_id: userId,
                book_id: bookId,
            });
            if (data?.message === 'Favorite book added successfully!') {
                return data.favoriteBook; // Trả về thông tin sách yêu thích
            }
        } catch (error) {
            console.error("Lỗi khi thêm sách yêu thích:", error); // Ghi log lỗi
            throw new Error(error.message);
        }
    },

    // Lấy danh sách sách yêu thích của người dùng
    getFavoriteBooksByUser: async (userId) => {
        try {
            const data = await request.get(`/favorite/${userId}`);
            
            return data || []; // Trả về danh sách sách yêu thích
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa sách yêu thích
    removeFavoriteBook: async (userId, bookId) => {
        try {
            const data = await request.delete(`/favorite/${userId}/${bookId}`
            );
            if (data?.message === 'Favorite book removed successfully!') {
                return true; // Trả về true nếu xóa thành công
            }
        } catch (error) {
            throw new Error("Loi xoa",error.message);
        }
    },

    // Xóa tất cả sách yêu thích
    removeAllFavoriteBooks: async (userId) => {
        try {
            const data = await request.delete(`/favorite/${userId}`); // Gọi API xóa tất cả
            if (data?.message === 'All favorite books have been removed.') {
                return true; // Trả về true nếu xóa thành công
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default favoriteApi;