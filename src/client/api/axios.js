import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:3000/api" || "http://191.96.31.90:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
