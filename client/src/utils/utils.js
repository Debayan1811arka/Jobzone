import axios from 'axios'
export const axiosClient = axios.create({
    baseURL:'https://jobzone.onrender.com/api/v1',
})
