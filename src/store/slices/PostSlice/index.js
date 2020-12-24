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
            state.postList = [...state.posts, ...action.payload];
        },
        updatePost(state, action) {
            const { postId, updatedPost } = action.payload;
            const postIndex = state.postList.findIndex(
                (post) => post.id === postId
            );
            state.postList[postIndex] = {
                ...state.postList[postIndex],
                ...updatedPost,
            };
        },
    },
});

export const { setPosts, updatePost } = postsSlice.actions;

export const fetchPosts = () => async (dispatch, getState) => {
    const { user } = getState();
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

export const fetchUpdatedPost = (postId) => async (dispatch, getState) => {
    const { user } = getState();
    const resp = await axios.get(apiURL + `posts/${postId}`, {
        headers: { Authorization: `Token ${user.token}` },
    });
    dispatch(updatePost({ postId, updatedPost: resp.data }));
};

export default postsSlice.reducer;
