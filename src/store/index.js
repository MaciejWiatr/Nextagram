import rootReducer from "./slices/index";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { createWrapper, HYDRATE } from "next-redux-wrapper";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const makeStore = ({ isServer }) => {
    if (isServer) {
        //If it's on server side, create a store
        return configureStore({
            reducer: rootReducer,
        });
    } else {
        //If it's on client side, create a store which will persist
        // const storage = storage.default

        const persistConfig = {
            key: "root",
            version: 1,
            blacklist: [],
            storage,
        };

        const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

        const store = configureStore({
            reducer: persistedReducer,
            middleware: getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
        });

        store.__persistor = persistStore(store);

        return store;
    }
};

export const wrapper = createWrapper(makeStore);
