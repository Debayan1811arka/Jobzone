import axios from 'axios'
export const axiosClient = axios.create({
    //baseURL:'http://localhost:1234/api/v1',
    baseURL: 'https://jobzone.onrender.com/api/v1'
})