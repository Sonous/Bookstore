import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

request.interceptors.response.use(
    (response) => response.data,
    (error) => console.log(error),
);

export default request;
