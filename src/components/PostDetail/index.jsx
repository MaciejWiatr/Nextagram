import {
    Box,
    Text,
    Divider,
    Input,
    Button,
    CloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { apiURL } from "../../constants";
import useLikes from "../../hooks/useLikes";
import useUser from "../../hooks/useUser";
import useComments from "../../hooks/useComments";

const PostDetail = ({ initialPost }) => {
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
    const [comments, addComment, deleteComment] = useComments(
        initialComments,
        id,
    );
    const [user, isAuthenticated, token] = useUser();
    const commentInputRef = useRef(null);
    const [editing, setEditing] = useState(false);
    const [isAuthor, setIsAuthor] = useState(user.id === author.id);
    const [descriptionValue, setDescriptionValue] = useState(description);

    const updatePost = async () => {
        let resp;
        if (token) {
            resp = await axios.get(`${apiURL}posts/${id}`, {
                headers: { Authorization: `Token ${token}` },
            });
        } else {
            resp = await axios.get(`${apiURL}posts/${id}`);
        }
        setPost(() => resp.data);
    };

    const onCommentSubmit = (e) => {
        e.preventDefault();
        addComment(commentInputRef.current.value);
    };

    const handleEdit = async () => {
        await axios.patch(
            `${apiURL}posts/${id}/`,
            {
                description: descriptionValue,
            },
            {
                headers: { Authorization: `Token ${token}` },
            },
        );
        await updatePost();
        setEditing(false);
    };

    useEffect(() => {
        updatePost();
        updateLikes();
    }, []);

    useEffect(() => {
        setIsAuthor(user.id === author.id);
    }, [isAuthenticated]);

    return (
        <Box className="shadow-lg rounded md:overflow-hidden relative w-full md:w-3/4 max-w-5xl bg-white flex flex-col items-stretch md:flex-row md:justify-center  md:h-2/3 border">
            <PostDetailImage
                handleLike={addLike}
                image={image}
                className="flex-grow"
            />
            <Box className="flex flex-col border-l w-full md:max-w-sm md:w-2/3">
                <Box className="w-full p-2 flex justify-between items-center">
                    <Link href={`/profile/${author.id}`}>
                        <a
                            className="flex flex-row justify-between items-center p-2"
                            href="/"
                        >
                            <div className="flex items-center">
                                <Image
                                    src={author.profile.photo}
                                    width="30"
                                    height="30"
                                    className="rounded-full"
                                    alt="user image"
                                />
                                <Text className="ml-2">{author.username}</Text>
                            </div>
                        </a>
                    </Link>
                    {isAuthor ? (
                        <div>
                            {editing ? (
                                <Button onClick={() => handleEdit()}>
                                    Save
                                </Button>
                            ) : (
                                <Button onClick={() => setEditing((s) => !s)}>
                                    Edit
                                </Button>
                            )}
                        </div>
                    ) : null}
                </Box>
                <Divider />
                <Text
                    as="div"
                    pl="2"
                    pr="2"
                    fontSize=".9rem"
                    className="pt-2 pb-2"
                >
                    <b>{author.username} </b>
                    <p>
                        {editing && isAuthor ? (
                            <Input
                                value={descriptionValue}
                                onChange={(e) =>
                                    setDescriptionValue(e.target.value)
                                }
                            />
                        ) : (
                            description
                        )}
                    </p>
                </Text>
                <Divider />
                <b className="text-sm p-2 pb-1">Comments:</b>
                <ul className="p-2 pt-0 text-sm flex-grow overflow-y-scroll">
                    {comments
                        ? comments.map(
                              ({
                                  author: commentAuthor,
                                  message,
                                  id: commentId,
                              }) => (
                                  <li
                                      key={commentId}
                                      className="w-full relative flex justify-between items-center"
                                  >
                                      <div className="">
                                          <Link
                                              href={`/profile/${commentAuthor.id}`}
                                              passHref
                                          >
                                              <a
                                                  href="/"
                                                  className="font-bold hover:text-gray-600"
                                              >
                                                  {commentAuthor.username}
                                              </a>
                                          </Link>{" "}
                                          {message}
                                      </div>
                                      {commentAuthor.id === user.id ? (
                                          <CloseButton
                                              size="xs"
                                              onClick={() =>
                                                  deleteComment(commentId)
                                              }
                                          />
                                      ) : null}
                                  </li>
                              ),
                          )
                        : null}
                </ul>
                <Divider />
                <Box mt="2" pl="2" className="flex text-3xl">
                    <button
                        name="heart button"
                        className="mr-2"
                        onClick={() => addLike()}
                        disabled={!isAuthenticated}
                        type="button"
                    >
                        {isLiked ? <FaHeart fill="#c0392b" /> : <BiHeart />}
                    </button>
                    <button name="comments button" type="button">
                        <BiMessageRounded />
                    </button>
                </Box>
                <Text pl="2" pb="1">
                    {numberOfLikes} Like
                    {numberOfLikes > 1 ? "s" : ""}
                </Text>
                <Divider />
                <form className="flex p-2" onSubmit={onCommentSubmit}>
                    <Input
                        ref={commentInputRef}
                        name="comment input"
                        placeholder="Write comment"
                        border="none"
                        mr="1"
                        disabled={!isAuthenticated}
                    />
                    <Button
                        name="button publish"
                        onClick={() => {
                            addComment(commentInputRef.current.value);
                        }}
                        disabled={!isAuthenticated}
                    >
                        Publish
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default PostDetail;

function PostDetailImage({ handleLike, image }) {
    return (
        <div className="flex flex-col md:h-full border-b md:border-none w-full h-56">
            <Box
                className="relative h-full cursor-pointer"
                onDoubleClick={() => handleLike()}
            >
                <Image
                    src={image}
                    alt="post image"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                />
            </Box>
        </div>
    );
}
