import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}auth/`;
console.log(process.env.REACT_APP_API)

const register = (email, password) => {
  return axios
    .post(API_URL, {
      email,
      password,
    })
    .then((response) => {
      if (response.headers["access-token"]) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "sign_in", {
      email,
      password,
    })
    .then((response) => {
      if (response.headers["access-token"]) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
