import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://datavisualizerbackend-61ayfrfq6-shanto57575s-projects.vercel.app/api',
});

export default instance;
