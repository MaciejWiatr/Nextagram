import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer, { reducerList } from "./slices";

const makeStore = (context) => {
    const initialState = {};

    Object.keys(reducerList).forEach((key) => {
        if (context) {
            // If initial context does exist ( context doesnt exist if no persisted data is stored )
            if (context[key] !== undefined) {
                // Dont provide unmodified state to configureStore
                initialState[`${key}`] = context[key]; // Append modified / preloaded state to initial state
            }
        }
    });

    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });
};

export default makeStore;
export const wrapper = createWrapper(makeStore);
