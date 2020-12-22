import { createSlice } from "@reduxjs/toolkit";
import { backendURL, loginUrl } from "../../../constants";
import axios from "axios";

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
        },
        logOut(state) {
            state = {
                isAuthenticated: false,
                token: "",
                user: {},
            };
        },
    },
});

export const { setUser, setToken } = userSlice.actions;

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const resp = await axios.post(loginUrl, {
            username,
            password,
        });
        dispatch(setUser({ user: resp.data.user }));
        dispatch(setToken({ token: resp.data.token }));
    } catch (err) {
        console.log(err);
    }
};

export default userSlice.reducer;
