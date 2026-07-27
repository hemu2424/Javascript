import axios from "axios"

const api = axios.create({
    baseURL:"https://api.github.com",
    headers:{
        Accept:"application/vnd.github+json",
    }

})

export default api;
