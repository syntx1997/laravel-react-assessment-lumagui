import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import errorReducer from "./error";

export default combineReducers({
  authReducer,
  alertReducer,
  errorReducer,
});
