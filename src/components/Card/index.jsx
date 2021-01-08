import { Box, Text, Divider, Input, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { apiURL } from "../../constants";

const Card = ({ initialPost, updateParentPostList }) => {
    const [
        {
            author,
            likes: initialLikes,
            description,
            image,
            is_liked: isInitiallyLiked,
            id,
            comments,
        },
        setPost,
    ] = useState(initialPost);
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);
    const [expanded, setExpanded] = useState(false);
    const [localComments, setLocalComments] = useState(comments);
    const user = useSelector((state) => state.user);
    const commentInputRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);

    const updateLikes = async () => {
        let resp;
        if (user.isAuthenticated) {
            resp = await axios.get(`${apiURL}posts/${id}/likes`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
        } else {
            resp = await axios.get(`${apiURL}posts/${id}/likes`);
        }
        const { likes: likesResp, is_liked: isLikedResp } = resp.data;
        setLikes(likesResp);
        setIsLiked(isLikedResp);
    };

    const updatePost = async () => {
        let resp;
        if (user.token) {
            resp = await axios.get(`${apiURL}posts/${id}/`, {
                headers: { Authorization: `Token ${user.token}` },
            });
        } else {
            resp = await axios.get(`${apiURL}posts/${id}/`);
        }
        setPost(() => resp.data);
    };

    const handleLike = async () => {
        const userLike = likes.filter(
            ({ author: likeAuthor }) => likeAuthor.id === user.user.id,
        );
        if (!isLiked) {
            await axios.post(
                `${apiURL}likes/`,
                { post: id },
                {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                },
            );
        } else {
            const userLikeId = userLike[0].id;
            await axios.delete(`${apiURL}likes/${userLikeId}/`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
        }
        updateLikes();
    };

    useEffect(() => {
        updateLikes();
        updatePost();
    }, []);

    const addComment = async () => {
        const data = {
            message: commentInputRef.current.value,
            post: id,
        };
        const resp = await axios.post(`${apiURL}comments/`, data, {
            headers: {
                Authorization: `Token ${user.token}`,
            },
        });
        const { data: respData } = resp;
        setLocalComments((coms) => [...coms, respData]);
        commentInputRef.current.value = "";
    };

    const handleDelete = async () => {
        if (!user.token) {
            return;
        }
        if (user.user.id !== author.id) {
            return;
        }
        await axios.delete(`${apiURL}posts/${id}/`, {
            headers: {
                Authorization: `Token ${user.token}`,
            },
        });
        updateParentPostList();
    };

    return (
        <Box
            mt="10px"
            maxW="md"
            className="shadow-lg rounded overflow-hidden relative w-full bg-white"
        >
            <Box h="50px" className="w-full flex">
                <div className="flex-grow">
                    <Link href={`/profile/${author.id}`} passHref>
                        <a
                            className="flex flex-row justify-start items-center p-2"
                            href="/"
                        >
                            <Image
                                src={author.profile.photo}
                                width="30"
                                height="30"
                                className="rounded-full"
                                alt="user image"
                                quality="10"
                            />
                            <Text className="ml-2">{author.username}</Text>
                        </a>
                    </Link>
                </div>
                {user.user.id === author.id ? (
                    <div className="flex items-center p-2 relative">
                        <Button
                            borderRadius="30px"
                            w="40px"
                            p="0"
                            h="40px"
                            onClick={() => setShowOptions((state) => !state)}
                        >
                            <BsThreeDots />
                        </Button>
                        {showOptions ? (
                            <div className="absolute right-2 top-10 z-50 bg-white rounded shadow p-2 pl-3 pr-3">
                                <ul className="text-left font-normal">
                                    <li>
                                        <button
                                            className="hover:text-gray-500"
                                            type="button"
                                            onClick={() => handleDelete()}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                    <li>
                                        <Link href={`/post/${id}`} passHref>
                                            <a
                                                className="hover:text-gray-500"
                                                href="/"
                                            >
                                                Edit
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </Box>
            <Box
                className="relative h-64 cursor-pointer"
                onDoubleClick={() => handleLike()}
            >
                <Image
                    src={image}
                    alt="post image"
                    layout="fill"
                    objectFit="cover"
                    quality="60"
                />
            </Box>
            <Box mt="2" pl="2" className="flex text-3xl">
                <button
                    name="heart button"
                    className="mr-2"
                    onClick={() => {
                        handleLike();
                    }}
                    disabled={!user.isAuthenticated}
                    type="button"
                >
                    {isLiked ? <FaHeart fill="#c0392b" /> : <BiHeart />}
                </button>
                <button name="comments button" type="button">
                    <BiMessageRounded />
                </button>
            </Box>
            <Text pl="2">
                {likes.length} Like
                {likes.length > 1 ? "s" : ""}
            </Text>
            <Text pl="2" pt="0" fontSize=".9rem">
                <b>{author.username}</b>{" "}
                {expanded ? description : description.substr(0, 100)}{" "}
                <button
                    onClick={() => setExpanded((state) => !state)}
                    className="text-gray-500"
                    type="button"
                >
                    Read {expanded ? "less" : "more"}
                </button>
            </Text>
            <Link href={`/post/${id}`}>
                <a href="/" className="pl-2 text-sm text-gray-500">
                    See all comments
                </a>
            </Link>
            <ul className="pl-2 mb-2 text-sm">
                {localComments
                    ? localComments
                          .slice(0, 3)
                          .map(
                              ({
                                  author: commentAuthor,
                                  message,
                                  id: commentId,
                              }) => (
                                  <li key={commentId}>
                                      <b>{commentAuthor.username}</b> {message}
                                  </li>
                              ),
                          )
                    : null}
            </ul>
            <Divider />
            <form
                className="p-2 flex"
                onSubmit={(e) => {
                    e.preventDefault();
                    addComment();
                }}
            >
                <Input
                    ref={commentInputRef}
                    name="comment input"
                    placeholder="Write comment"
                    border="none"
                    mr="1"
                    disabled={!user.isAuthenticated}
                />
                <Button
                    name="button publish"
                    onClick={() => {
                        addComment();
                    }}
                    disabled={!user.isAuthenticated}
                >
                    Publish
                </Button>
            </form>
        </Box>
    );
};

export default Card;
