import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (email, password) => {
    return axios.post(API_URL, {
        email,
        password
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
    return axios.delete(API_URL+"sign_out");
}

export default {
    register,
    login,
    logout
}