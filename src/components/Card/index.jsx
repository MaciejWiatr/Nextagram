import { Box, Text, Divider, Input, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useRef } from "react";
import { apiURL } from "../../constants";

const Card = ({ initialPost }) => {
    const [
        { author, likes, description, image, is_liked: isLiked, id, comments },
        setPost,
    ] = useState(initialPost);
    const [expanded, setExpanded] = useState(false);
    const [localComments, setLocalComments] = useState(comments);
    const user = useSelector((state) => state.user);
    const commentInputRef = useRef(null);

    const updatePost = async () => {
        const resp = await axios.get(`${apiURL}posts/${id}`, {
            headers: { Authorization: `Token ${user.token}` },
        });
        setPost(() => resp.data);
    };

    const handleLike = async () => {
        const userLike = likes.filter(
            ({ author: likeAuthor }) => likeAuthor.id === user.user.id
        );
        if (!isLiked) {
            await axios.post(
                `${apiURL}likes/`,
                { post: id },
                {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                }
            );
            updatePost();
        } else {
            const userLikeId = userLike[0].id;
            await axios.delete(`${apiURL}likes/${userLikeId}/`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
            updatePost();
        }
    };

    const addComment = async () => {
        const resp = await axios.post(
            `${apiURL}comments/`,
            {
                message: commentInputRef.current.value,
                post: id,
            },
            {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            }
        );
        const { data } = resp;
        setLocalComments((coms) => [...coms, data]);
        commentInputRef.current.value = "";
    };

    return (
        <Box
            mt="10px"
            maxW="md"
            className="shadow-lg rounded overflow-hidden relative w-full bg-white"
        >
            <Box h="50px">
                <Link href={`/profile/${author.id}`}>
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
                        />
                        <Text className="ml-2">{author.username}</Text>
                    </a>
                </Link>
            </Box>
            <Box className="relative h-64">
                <Image
                    src={image}
                    alt="post image"
                    layout="fill"
                    objectFit="cover"
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
            <Link href="/">
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
                              )
                          )
                    : null}
            </ul>
            <Divider />
            <Flex p="2">
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
            </Flex>
        </Box>
    );
};

export default Card;
