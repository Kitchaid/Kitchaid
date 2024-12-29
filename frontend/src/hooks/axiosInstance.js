import axios from 'axios'
import jwt_decode from "jwt-decode";

export const axiosClient = axios.create({
    // baseURL: "https://kitchaid.herokuapp.com",
    baseURL: process.env.REACT_APP_BE,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
export const axiosImageClient = axios.create({
    baseURL: process.env.REACT_APP_BE,
    // baseURL: "https://kitchaid.herokuapp.com",

    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Access_token');
        if (token) {
            const decoded = jwt_decode(token);
            const userId = decoded.id;
            const kommun = decoded.kommun;
            const section = decoded.section;
            const username = decoded.username;
            const group = decoded.group;
            const belongTo_id = decoded.belongTo_id;
            const isAdmin = decoded.isAdmin;
            const part = decoded.part;
            const isProducer = decoded.isProducer;
            config.headers.Authorization = `Bearer ${token}`;
            config.params = {
                userId: userId,
                kommun: kommun,
                belongTo_id: belongTo_id,
                section: section,
                username: username,
                group:group,
                part:part,
                isAdmin:isAdmin,
                isProducer:isProducer,
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
axiosImageClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Access_token');
        if (token) {
            const decoded = jwt_decode(token);
            const userId = decoded.id;
            const kommun = decoded.kommun;
            const section = decoded.section;
            const username = decoded.username;
            const belongTo_id = decoded.belongTo_id;
            config.headers.Authorization = `Bearer ${token}`;
            config.params = {
                userId: userId,
                kommun: kommun,
                belongTo_id: belongTo_id,
                section: section,
                username: username
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

