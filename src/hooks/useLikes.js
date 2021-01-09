/* eslint-disable no-console */
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../constants";

const useLikes = (initialLikes, initialIsLiked, postId) => {
    const user = useSelector((state) => state.user);
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [numberOfLikes, setNumberOfLikes] = useState(initialLikes.length);

    const updateLikes = async () => {
        let resp;
        if (user.isAuthenticated) {
            resp = await axios.get(`${apiURL}posts/${postId}/likes`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
        } else {
            resp = await axios.get(`${apiURL}posts/${postId}/likes`);
        }
        const { likes: likesResp, is_liked: isLikedResp } = resp.data;
        setLikes(() => likesResp);
        if (isLiked !== isLikedResp) {
            setIsLiked(() => isLikedResp);
        }
        if (likesResp.length !== numberOfLikes) {
            setNumberOfLikes(() => likesResp.length);
        }
    };

    const addLike = async () => {
        let userLike;
        try {
            userLike = likes.filter(
                ({ author: likeAuthor }) => likeAuthor.id === user.user.id,
            );
        } catch {
            Promise.reject();
            return;
        }
        if (!userLike[0] && isLiked) {
            Promise.reject();
            return;
        }
        try {
            if (!isLiked) {
                setIsLiked(true);
                setNumberOfLikes(numberOfLikes + 1);
                await axios.post(
                    `${apiURL}likes/`,
                    { post: postId },
                    {
                        headers: {
                            Authorization: `Token ${user.token}`,
                        },
                    },
                );
            } else {
                const userLikeId = userLike[0].id;
                setIsLiked(false);
                setNumberOfLikes(numberOfLikes - 1);
                await axios.delete(`${apiURL}likes/${userLikeId}/`, {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                });
            }
            await updateLikes();
        } catch {
            console.log("Like request has failed");
        }
    };

    return [likes, isLiked, numberOfLikes, addLike, updateLikes, setLikes];
};

export default useLikes;
