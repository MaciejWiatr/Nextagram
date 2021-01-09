import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../constants";

const useComments = (initialComments, postId) => {
    const user = useSelector((state) => state.user);
    const [comments, setComments] = useState(initialComments);

    const fetchComments = async () => {
        const resp = await axios.get(`${apiURL}posts/${postId}/comments`);
        setComments(resp.data);
    };

    const addComment = async (message) => {
        const data = {
            message,
            post: postId,
        };
        const resp = await axios.post(`${apiURL}comments/`, data, {
            headers: {
                Authorization: `Token ${user.token}`,
            },
        });
        const { data: respData } = resp;
        setComments((coms) => [...coms, respData]);
    };

    const deleteComment = async (id) => {
        await axios.delete(`${apiURL}comments/${id}/`, {
            headers: {
                Authorization: `Token ${user.token}`,
            },
        });
        fetchComments();
    };

    return [comments, addComment, deleteComment];
};

export default useComments;
