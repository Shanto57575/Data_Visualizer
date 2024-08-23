import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://data-visualizer-backend.vercel.app/api',
});

export default instance;
