import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiURL } from "../constants";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Router from "next/router";

const Liked = () => {
    const user = useSelector((state) => state.user);
    const [likedPosts, setLikedPosts] = useState([]);
    const fetchLiked = async () => {
        const resp = await axios.get(`${apiURL}liked`, {
            headers: { Authorization: `Token ${user.token}` },
        });
        setLikedPosts(() => resp.data);
    };

    useEffect(() => {
        if (!user.isAuthenticated) {
            Router.push("/login/");
            return;
        }
        fetchLiked();
    }, []);

    return (
        <Layout>
            <div className="w-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                {likedPosts.length > 0 ? (
                    <PostList posts={likedPosts} />
                ) : (
                    "No posts found"
                )}
            </div>
        </Layout>
    );
};

export default Liked;
