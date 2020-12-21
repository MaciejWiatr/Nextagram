import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
