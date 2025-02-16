import axios from "axios";
import store from "../../redux/store";
import { LOGOUT } from "../../redux/actions/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
