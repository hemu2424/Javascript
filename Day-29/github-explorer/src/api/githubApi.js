import api from "./axios";


export const getUser = (userName)=>{
    return api.get(`/users/${userName}`);
}
export const getRepo = (userName)=>{
    return api.get(`/users/${userName}/repos`);
}