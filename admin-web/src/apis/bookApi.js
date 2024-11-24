const { request } = require('~/configs');

const bookApi = {
    async getAllBooks() {
        try {
            const books = await request.get('/book');

            return books;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async updateBook(bookId, data) {
        try {
            await request.patch(`/book/${bookId}`, {
                data,
            });
        } catch (error) {
            console.error(error);
        }
    },
};

export default bookApi;
