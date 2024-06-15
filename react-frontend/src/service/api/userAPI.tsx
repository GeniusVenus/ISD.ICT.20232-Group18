import axios from "axios";
import { setToken } from "../redux/auth/authSlice";
import store from "../redux/store";
import { toast } from "react-toastify";
const BASE_URL = "http://localhost:8080/api";
const user = axios.create();

user.defaults.baseURL = BASE_URL;

user.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
user.defaults.timeout = 5000;

const refreshToken = async () => {
  return "new_access_token";
};

user.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    toast.error("You need to sign in to do that action", { autoClose: 1500 });
    setTimeout(() => (window.location.href = "/login"), 2000);
  }
  return config;
});
user.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        user.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        store.dispatch(setToken(newToken));
        return user(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshToken);
      }
    }
    return Promise.reject(error);
  }
);

export default user;
