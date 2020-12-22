import { createSlice } from "@reduxjs/toolkit";
import { apiURL } from "../../../constants";
import axios from "axios";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        postList: [],
    },
    reducers: {
        setPosts(state, action) {
            state.postList = action.payload;
        },
        addPosts(state, action) {
            state.posts = [...state.posts, ...action.payload];
        },
    },
});

export const { setPosts } = postsSlice.actions;

export const fetchPosts = (user) => async (dispatch) => {
    if (!user.isAuthenticated) {
        console.log("Not authed");
        const resp = await axios.get(apiURL + "posts/");
        dispatch(setPosts(resp.data));
    } else {
        console.log("Authed");
        const resp = await axios.get(apiURL + "feed/", {
            headers: { Authorization: `Token ${user.token}` },
        });
        dispatch(setPosts(resp.data));
    }
};

export default postsSlice.reducer;
