import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiURL } from "../constants";
import Layout from "../components/Layout";
import Card from "../components/Card";

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
        fetchLiked();
    }, []);

    return (
        <Layout>
            <div className="w-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                {likedPosts.length > 0
                    ? likedPosts.map((post) => (
                          <Card key={post.id} initialPost={post} />
                      ))
                    : "No posts found"}
            </div>
        </Layout>
    );
};

export default Liked;
