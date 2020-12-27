import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiURL } from "../constants";
import Card from "../components/Card";

const { default: Layout } = require("../components/Layout");

const Search = () => {
    const [results, setResults] = useState({ posts: [], users: [] });
    const router = useRouter();
    const { q } = router.query;

    const handleSearch = async () => {
        const respPosts = await axios.get(`${apiURL}posts/?search=${q}`);
        const respUsers = await axios.get(
            `${apiURL}accounts/users/?search=${q}`
        );
        setResults(() => ({ posts: respPosts.data, users: respUsers.data }));
    };

    useEffect(() => {
        handleSearch();
    }, [q]);

    return (
        <Layout>
            <div className=" flex flex-row overflow-hidden w-full">
                <div className="w-1/4 overflow-hidden" />
                <div className="w-2/4 overflow-hidden flex flex-col items-center  p-2">
                    <h1 className="text-3xl">Search results for {`"${q}"`}</h1>
                    <div className="w-full text-left">
                        <h3 className="text-xl">Users</h3>
                    </div>
                    <ul className="flex flex-row flex-nowrap w-full">
                        {results.users.length > 0
                            ? results.users.map((user) => (
                                  <li key={user.id}>
                                      <Link
                                          href={`/profile/${user.id}`}
                                          passHref
                                      >
                                          <a
                                              href="/"
                                              className="w-24 h-32 flex flex-col justify-center items-center"
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
                            : "No users found"}
                    </ul>
                    <div className="w-full text-left">
                        <h3 className="text-xl">Posts</h3>
                    </div>
                    <div className="w-full flex justify-center flex-col items-center pl-2 pr-2 pb-3">
                        {results.posts.length > 0
                            ? results.posts.map((post) => (
                                  <Card key={post.id} initialPost={post} />
                              ))
                            : "No posts found"}
                    </div>
                </div>
                <div className="w-1/4 overflow-hidden" />
            </div>
        </Layout>
    );
};

export default Search;
