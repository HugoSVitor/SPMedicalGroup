import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.5.66:5000/api' 
});

export default api;