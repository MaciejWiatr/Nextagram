import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { apiURL } from "../constants";
import Card from "../components/Card";

const { default: Layout } = require("../components/Layout");

const Search = () => {
    const [results, setResults] = useState({ posts: [], users: [] });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { q } = router.query;

    const handleSearch = async () => {
        setLoading(true);
        const searchPosts = await axios.get(`${apiURL}posts/?search=${q}`);
        const searchUsers = await axios.get(
            `${apiURL}accounts/users/?search=${q}`
        );
        const [respPosts, respUsers] = await Promise.all([
            searchPosts,
            searchUsers,
        ]);

        setResults(() => ({ posts: respPosts.data, users: respUsers.data }));
        setLoading(false);
    };

    useEffect(() => {
        handleSearch();
    }, [q]);

    return (
        <Layout>
            <div className=" flex flex-row overflow-hidden justify-center w-full">
                <div className="w-full p-3 md:w-3/4 max-w-5xl overflow-hidden flex flex-col items-center">
                    <h1 className="text-3xl mt-2 text-center font-bold">
                        Search results for{" "}
                        <span className="font-normal">{`"${q}"`}</span>
                    </h1>
                    <div className="w-full text-left mt-2 mb-2">
                        <h3 className="text-xl">Users</h3>
                    </div>
                    <ul className="flex flex-row flex-nowrap w-full h-full pt-2 bg-white rounded shadow overflow-x-scroll">
                        {results.users.length > 0 ? (
                            results.users.map((user) => (
                                <li key={user.id}>
                                    <Link href={`/profile/${user.id}`} passHref>
                                        <a
                                            href="/"
                                            className="w-24 h-32 flex flex-col justify-center items-center overflow-hidden"
                                        >
                                            <div className="w-20 h-20 overflow-hidden relative rounded-full">
                                                <Image
                                                    src={user.profile.photo}
                                                    layout="fill"
                                                />
                                            </div>
                                            {user.username}
                                        </a>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <div className="w-full text-center">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <div>
                                        <p>: (</p>
                                        <p>No users have been found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                    <div className="w-full text-left mt-2 mb-2">
                        <h3 className="text-xl">Posts</h3>
                    </div>
                    <div className="w-full flex justify-around flex-row flex-wrap items-evenly p-3 bg-white rounded shadow">
                        {results.posts.length > 0 && !loading ? (
                            results.posts.map((post) => (
                                <Card key={post.id} initialPost={post} />
                            ))
                        ) : (
                            <div className="w-full text-center">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <div>
                                        <p>: (</p>
                                        <p>No posts have been found</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
