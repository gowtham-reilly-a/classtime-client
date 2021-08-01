import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import googleAuthReducer from "./googleAuthReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: googleAuthReducer,
  form: formReducer,
  streams: streamReducer,
});
