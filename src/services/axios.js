import axios from "axios";
import { API_PATH } from "./apiRoutes";

const API_BASE_PATH = "http://46.202.135.161:8080";

const getBaseUrl = () => {
  let baseUrl = API_BASE_PATH;
  return baseUrl;
};

const instance = axios.create({
  baseURL: getBaseUrl(),
});

const notLoginCall = (config) => {
  return config.url !== API_PATH.LOGIN;
};

instance.interceptors.request.use(
  (request) => {
    // console.log(request)
    if (!request.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
  { runWhen: notLoginCall }
);

instance.interceptors.response.use(
  (response) => {
    if (
      response?.config?.url === API_PATH.LOGIN ||
      response?.config?.url === API_PATH.GOOGLE_LOGIN ||
      response?.config?.url === API_PATH.FACEBOOK_LOGIN
    ) {
      let token = response?.data?.token;
      let user = response?.data?.user;
      localStorage.setItem("token", JSON.stringify({ token, user }));
    }
    // console.log(response)
    return response;
  },
  (error) => {
    console.log(error);
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.detail === "Invalid token."
    ) {
      localStorage.removeItem("token");
      window.location.href = "." + "/login";
    }
    // error.response.status === 403 && error.response.data.detail === "CSRF Failed: CSRF token missing or incorrect."
    return Promise.reject(error);
  }
);

export default instance;
