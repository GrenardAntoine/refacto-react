import { domainsReducer } from "./domains/reducer";
import { combineReducers } from "redux";

export default combineReducers({
  domains: domainsReducer,
});
