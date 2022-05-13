import axios from 'axios'

const S_AXIOS = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

export default S_AXIOS