import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/auth/";

const register = (email, password) => {
    return axios.post(API_URL, {
        email,
        password
    }).then(response => {
        if(response.headers["access-token"]) {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    })
}

const login = (email, password) => {
    return axios
    .post(API_URL+"sign_in", {
        email,
        password
    }).then(response => {
        if(response.headers["access-token"]) {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    })
}

const logout = () => {
    localStorage.removeItem("user");
    //return axios.delete(API_URL+"sign_out", { headers: authHeader() });
}

export default {
    register,
    login,
    logout
}