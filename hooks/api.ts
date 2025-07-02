
import axios from 'axios';

const api = axios.create({
    baseURL: "https://fooddeliverybackend-pvb6.onrender.com/api/auth",
})
export default api