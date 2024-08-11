import { combineReducers } from "redux";

import userReducer from "./slice/userSlice"; // Add userReducer
import getKegeberewuOrderReducer  from "./slice/kegeberewuOrderSlice";


const rootReducer = combineReducers({
  user: userReducer, // Add user reducer
  KegeberewuOrderList: getKegeberewuOrderReducer,
  
});

export default rootReducer;
