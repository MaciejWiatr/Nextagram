import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const makeStore = (initialState, options) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};

export default makeStore;
