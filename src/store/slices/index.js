import { combineReducers } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice";
import userReducer from "./UserSlice";

const rootReducer = combineReducers({
    user: userReducer,
    posts: PostSlice,
});

export default rootReducer;
