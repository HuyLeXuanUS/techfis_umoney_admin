import axios from "axios";

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;
const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials);

const instance = axios.create({
    baseURL: 'http://103.157.218.115:8817',
    // headers: {
    //     Authorization: `Basic ${encodedCredentials}`,
    // },
});

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (err) {
        return Promise.reject(err);
    }
);
export default instance;
