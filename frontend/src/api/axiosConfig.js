import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://data-visualizer-backend.vercel.app/api',
    // baseURL: 'http://localhost:5000/api',
});

export default instance;
