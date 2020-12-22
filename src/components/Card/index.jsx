import { Box, Text, Divider, Input, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../../constants";
import { useState } from "react";
import { fetchPosts } from "../../store/slices/PostSlice";

const Card = ({ author, likes, desc, img, isLiked, postId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const handleLike = async () => {
        const userLike = likes.filter(({ author }) => {
            return author.id === user.user.id;
        });
        if (!isLiked) {
            await axios.post(
                apiURL + `likes/`,
                { post: postId },
                {
                    headers: {
                        Authorization: `Token ${user.token}`,
                    },
                }
            );
            dispatch(fetchPosts(user));
        } else {
            const userLikeId = userLike[0].id;
            await axios.delete(apiURL + `likes/${userLikeId}/`, {
                headers: {
                    Authorization: `Token ${user.token}`,
                },
            });
            dispatch(fetchPosts(user));
        }
    };

    return (
        <Box
            mt="10px"
            w="md"
            maxW="md"
            className="shadow-lg rounded overflow-hidden relative"
        >
            <Box
                h="50px"
                className="flex flex-row justify-start items-center p-2"
            >
                <Image
                    src={author.profile.photo}
                    width="30"
                    height="30"
                    className="rounded-full"
                    alt="user image"
                ></Image>
                <Text className="ml-2">{author.username}</Text>
            </Box>
            <Box className="relative h-64">
                <Image
                    src={img}
                    alt="post image"
                    layout="fill"
                    objectFit="cover"
                ></Image>
            </Box>
            <Box mt="2" pl="2" className="flex text-3xl">
                <button
                    name="heart button"
                    className="mr-2"
                    onClick={() => {
                        handleLike();
                    }}
                >
                    {isLiked ? <FaHeart fill="#c0392b" /> : <BiHeart />}
                </button>
                <button name="comments button">
                    <BiMessageRounded />
                </button>
            </Box>
            <Text pl="2">
                {likes.length} Like{likes.length > 1 ? "s" : ""}
            </Text>
            <Text p="2" pt="0" fontSize=".9rem">
                <b>{author.username}</b> {desc.substr(0, 100)}{" "}
                <Link href="/">
                    <a className="text-gray-200">Read more</a>
                </Link>
            </Text>
            <Divider />
            <Flex p="2">
                <Input
                    name="comment input"
                    placeholder="Write comment"
                    border="none"
                    mr="1"
                ></Input>
                <Button name="button publish">Publish</Button>
            </Flex>
        </Box>
    );
};

export default Card;
