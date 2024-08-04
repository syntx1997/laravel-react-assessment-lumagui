import { SET_ERROR, REMOVE_ERROR } from "./types";

export const setErrors = (errors) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: errors,
  });
};

export const removeErrors = () => ({ type: REMOVE_ERROR });
