import axios from 'axios'
const instance = axios.create({
    baseURL: "http://192.168.0.125:7033",
});

export default instance;