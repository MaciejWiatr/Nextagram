import { combineReducers } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice";
import userReducer from "./UserSlice";

const reducerList = {
    user: userReducer,
    posts: PostSlice,
};

const rootReducer = combineReducers(reducerList);

export default rootReducer;
export { reducerList };
