import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/api/',
});
const imageUrl = 'http://localhost:5000/images';

request.interceptors.response.use(
    (response) => response.data,
    (error) => console.log(error),
);

export { imageUrl };
export default request;
