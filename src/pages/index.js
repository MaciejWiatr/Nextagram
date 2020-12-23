import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { apiURL } from "../constants";
import axios from "axios";
import { fetchPosts } from "../store/slices/PostSlice";

export default function Home() {
    const posts = useSelector((state) => state.posts.postList);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchPosts(user));
    }, [user]);

    return (
        <Layout>
            <div className="w-full flex justify-center flex-col items-center">
                {posts
                    ? posts.map((post) => (
                          <Card
                              key={post.id}
                              author={post.author}
                              likes={post.likes}
                              desc={post.description}
                              img={post.image}
                              isLiked={post.is_liked}
                              postId={post.id}
                              comments={post.comments}
                          />
                      ))
                    : null}
            </div>
        </Layout>
    );
}
