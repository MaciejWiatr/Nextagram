import { Box, Text, Divider } from "@chakra-ui/react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../../constants";
import CardImage from "../CardImage";
import CardHeader from "../CardHeader";
import CardCommentForm from "../CardCommentForm";
import CardDescription from "../CardDescription";
import CommentList from "../CommentList";
import useLikes from "../../hooks/useLikes";
import useComments from "../../hooks/useComments";

const Card = ({ initialPost, updateParentPostList }) => {
    const [
        {
            author,
            likes: initialLikes,
            description,
            image,
            is_liked: isInitiallyLiked,
            id,
            comments: initialComments,
        },
        setPost,
    ] = useState(initialPost);
    const [, isLiked, numberOfLikes, addLike, updateLikes] = useLikes(
        initialLikes,
        isInitiallyLiked,
        id,
    );
    const [expanded, setExpanded] = useState(false);
    const [comments, addComment] = useComments(initialComments, id);
    const user = useSelector((state) => state.user);
    const [showOptions, setShowOptions] = useState(false);

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

    const handleLike = async () => {
        await addLike();
    };

    useEffect(() => {
        updateLikes();
        updatePost();
    }, [initialPost]);

    return (
        <Box
            mt="10px"
            maxW="md"
            className="shadow-lg rounded overflow-hidden relative w-full bg-white"
        >
            <CardHeader
                setShowOptions={setShowOptions}
                author={author}
                user={user}
                showOptions={showOptions}
                handleDelete={handleDelete}
                id={id}
            />
            <CardImage handleLike={handleLike} image={image} />
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
                    {isLiked ? (
                        <FaHeart
                            fill="#c0392b"
                            className="animate__heartBeat"
                        />
                    ) : (
                        <BiHeart />
                    )}
                </button>
                <button name="comments button" type="button">
                    <BiMessageRounded />
                </button>
            </Box>
            <Text pl="2">
                {numberOfLikes} Like
                {numberOfLikes > 1 ? "s" : ""}
            </Text>
            <CardDescription
                expanded={expanded}
                description={description}
                setExpanded={setExpanded}
                author={author}
            />
            <Link href={`/post/${id}`}>
                <a href="/" className="pl-2 text-sm text-gray-500">
                    See all comments
                </a>
            </Link>
            <CommentList comments={comments} />
            <Divider />
            <CardCommentForm user={user} addComment={addComment} />
        </Box>
    );
};

export default Card;
