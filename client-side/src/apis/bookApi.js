import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Make sure this is the correct base URL

const bookApi = {
    getBookByName: async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${name}`);
            return response.data; // Return the data
        } catch (error) {
            console.error('Error fetching book by name:', error);
            throw error; // Re-throw error for handling elsewhere
        }
    },
    getBookByAuthor: async (author) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/author/${author}`);
            return response.data; // Return the data
        } catch (error) {
            console.error('Error fetching books by author:', error);
            throw error; // Re-throw error for handling elsewhere
        }
    },

    getGenreOfBook: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/book/${id}/genre`); // Adjusted endpoint // Log the fetched data
            return response.data; // Return the genre data
        } catch (error) {
            console.error('Error fetching genres of book:', error);
            throw error; // Re-throw error for handling elsewhere
        }
    },
};

export default bookApi;
