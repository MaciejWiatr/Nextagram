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
        try {
            const resp = await axios.get(apiURL + "posts/");
            dispatch(setPosts(resp.data));
        } catch (err) {
            console.log("Not authenticated request has failed");
        }
    } else {
        try {
            const resp = await axios.get(apiURL + "feed/", {
                headers: { Authorization: `Token ${user.token}` },
            });
            dispatch(setPosts(resp.data));
        } catch (err) {
            console.log("Authenticated request has failed");
        }
    }
};

export default postsSlice.reducer;
