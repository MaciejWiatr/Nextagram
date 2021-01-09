import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { fetchPosts } from "../store/slices/PostSlice";
import PostList from "../components/PostList";
import WelcomeMessage from "../components/WelcomeMessage";

export default function Home() {
    const posts = useSelector((state) => state.posts.postList);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const updatePosts = () => {
        setLoading(true);
        dispatch(fetchPosts(user));
        setLoading(false);
    };

    useEffect(() => {
        updatePosts();
    }, [user.token]);

    return (
        <Layout>
            <div className="w-full min-h-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                {loading ? <Spinner /> : null}
                {posts.length > 0 ? (
                    <PostList
                        posts={posts}
                        updateParentPostList={updatePosts}
                    />
                ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                        {!user.isAuthenticated ||
                        user.user.profile.follows.length > 0 ? (
                            <p>No posts found</p>
                        ) : (
                            <WelcomeMessage />
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
