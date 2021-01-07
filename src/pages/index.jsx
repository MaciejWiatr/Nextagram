import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Spinner } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { fetchPosts } from "../store/slices/PostSlice";

export default function Home() {
    const posts = useSelector((state) => state.posts.postList);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const [inputVal, setInputVal] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        router.push(`/search/?q=${inputVal}`);
    };

    const updatePosts = async () => {
        setLoading(true);
        await dispatch(fetchPosts(user));
        setLoading(false);
    };

    useEffect(async () => {
        await updatePosts();
    }, [user.token]);

    return (
        <Layout>
            <div className="w-full min-h-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                {loading ? <Spinner /> : null}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            initialPost={post}
                            updateParentPostList={updatePosts}
                        />
                    ))
                ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                        {user.user.profile.follows.length > 0 ? (
                            <p>No posts found</p>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-1/2">
                                <form className="flex text-xl">
                                    <Input
                                        placeholder="Search"
                                        value={inputVal}
                                        onChange={(e) =>
                                            setInputVal(e.target.value)
                                        }
                                    />
                                    <Button
                                        className="ml-1"
                                        type="button"
                                        onClick={() => handleSearch()}
                                    >
                                        <BiSearchAlt />
                                    </Button>
                                </form>
                                <br />
                                <div className="text-gray-500">
                                    This page is blank because you are not
                                    following anyone. First try searching for
                                    your friends using the search input above
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
