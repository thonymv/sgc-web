import axios from 'axios';

const API_URL = process.env.API_URL || 'http://47.253.59.148:8000';

export default axios.create({ baseURL: API_URL, responseType: 'json', withCredentials: true });