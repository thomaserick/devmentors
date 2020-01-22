import axios from axios;
const api = axios.create({
    baseUrl:"http://172.17.1.34:8080"
})

export default api;

