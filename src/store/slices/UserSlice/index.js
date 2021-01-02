/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL, loginUrl, apiURL } from "../../../constants";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        token: "",
        user: {},
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            state.user.profile.photo = backendURL + state.user.profile.photo;
            state.isAuthenticated = true;
        },
        setToken(state, action) {
            state.token = action.payload.token;
            document.cookie = `token=${state.token}`;
        },
        updateUser(state, action) {
            state.user = {
                ...state.user,
                ...action.payload.user,
            };
        },
        logOut(state) {
            state.isAuthenticated = false;
            state.token = "";
            state.user = {};
        },
    },
});

export const { setUser, setToken, logOut, updateUser } = userSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
    const resp = await axios.post(loginUrl, {
        username,
        password,
    });
    dispatch(setUser({ user: resp.data.user }));
    dispatch(setToken({ token: resp.data.token }));
};

export const fetchUser = (userId) => async (dispatch) => {
    const resp = await axios.get(`${apiURL}accounts/users/${userId}`);
    dispatch(updateUser({ user: resp.data }));
};

export default userSlice.reducer;
