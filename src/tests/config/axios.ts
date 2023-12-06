// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const request = axios;

export default request;
