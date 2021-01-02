import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPosts } from "../store/slices/PostSlice";

export default function Home() {
    const posts = useSelector((state) => state.posts.postList);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchPosts(user));
    }, [user.token]);

    return (
        <Layout>
            <div className="w-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                {posts
                    ? posts.map((post) => (
                          <Card key={post.id} initialPost={post} />
                      ))
                    : null}
            </div>
        </Layout>
    );
}
