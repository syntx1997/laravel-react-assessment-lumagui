import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from "./types";

export const setAlert =
  (msg, type, timeout = 3000) =>
  (dispatch) => {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };

export const removeAlerts = () => ({ type: REMOVE_ALL_ALERTS });
