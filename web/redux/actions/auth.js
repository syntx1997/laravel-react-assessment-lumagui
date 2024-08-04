import api from "../../src/utils/api";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../../src/utils/setAuthToken";
import { setAlert, removeAlerts } from "./alert";
import { setErrors, removeErrors } from "./error";

// Load User Data
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get("/user/get");
    const result = res?.data?.result;

    dispatch({
      type: USER_LOADED,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Log In
export const login = (formData) => async (dispatch) => {
  dispatch(removeAlerts());
  dispatch(removeErrors());

  try {
    const res = await api.post("/auth/login", formData);
    const result = res?.data?.result;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: result?.data,
    });

    dispatch(loadUser());

    dispatch(setAlert(result?.message, "success"));
  } catch (err) {
    const response = err?.response.data;

    if (response?.errors) {
      dispatch(setErrors(response?.errors));
    } else {
      dispatch(setAlert(response?.result?.message, "error"));
    }
  }
};

// Sign Up User
export const signUp = (formData) => async (dispatch) => {
  try {
    const res = await api.post("auth/register", formData);
    const result = res?.data?.result;

    dispatch({
      type: REGISTER_SUCCESS,
      payload: result?.data,
    });

    dispatch(removeErrors());

    dispatch(setAlert(result?.message, "success", 60000));
  } catch (err) {
    const error = err.response.data;

    dispatch({
      type: REGISTER_FAIL,
    });

    if (error.data === null) {
      dispatch(setAlert(error.message, "error"));
    }

    if (error.data !== null) {
      dispatch(setErrors(error.data));
    }
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
