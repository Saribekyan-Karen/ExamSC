import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/',
    params:{
        _limit:5,
        _start:10,
    }
})

export default axiosInstance