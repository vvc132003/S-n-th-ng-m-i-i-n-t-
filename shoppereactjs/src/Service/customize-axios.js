import axios from 'axios'
const instance = axios.create({
    baseURL: "https://localhost:7033",
});

export default instance;