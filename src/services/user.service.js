import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const getGalleries = () => {
  return axios.get(API_URL + "image_galleries", { headers: authHeader() });
};

const resetPassword = (password, password_confirmation) => {
  return axios
    .put(
      API_URL + "auth/password",
      {
        password,
        password_confirmation,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      if (response.headers["access-token"]) {
        localStorage.setItem("user", JSON.stringify(response));
      }
      return response;
    });
};

const createImageGallery = (title, description, image) => {
  return axios.post(
    API_URL + "image_galleries",
    {
      title,
      description,
      image,
    },
    { headers: authHeader() }
  );
};

export default {
  getGalleries,
  resetPassword,
  createImageGallery,
};
