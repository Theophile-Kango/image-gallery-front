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
    .post(API_URL+"signin", {
        email,
        password
    }).then(response => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
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