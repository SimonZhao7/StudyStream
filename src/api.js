import axios from 'axios';

const AXIOS = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
})

export default AXIOS