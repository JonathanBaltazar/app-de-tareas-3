import axios from "./axios.js";

export let registerUser = (data) => {
    return axios.post(`/register`, data);
};
export let loginUser = (data) => {
    return axios.post(`/login`, data);
};
export let verifyToken = () => {
    return axios.get(`/verify-token`);
};
