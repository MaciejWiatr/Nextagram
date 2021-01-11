/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from "next/image";
import React, { useState } from "react";
import { BiHeart, BiMessageRounded } from "react-icons/bi";
import Modal from "react-modal";
import Card from "../Card";
import styles from "./index.module.scss";

Modal.setAppElement("#modal");

const PostGrid = ({ posts, updateParentPostList }) => (
        <div className={`w-full post__grid mt-2 mb-2 ${styles.post__grid}`}>
            {posts
                ? posts.map((post) => (
                      <PostGridElement
                          key={post.id}
                          post={post}
                          updateParentPostList={updateParentPostList}
                      />
                  ))
                : "This user has no posts"}
        </div>
    );

const PostGridElement = ({ post, updateParentPostList }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    function closeModal() {
        setIsOpen(false);
        updateParentPostList();
    }

    return (
        <>
            <div
                className={`relative rounded ${styles.post__grid__element}`}
                onClick={openModal}
            >
                <div className="absolute z-10 w-full h-full flex justify-center items-center">
                    <p
                        className={`flex items-center text-white text-2xl ${styles.post__grid__element__stats}`}
                    >
                        {post.likes_amount} <BiHeart /> {post.comments.length}{" "}
                        <BiMessageRounded />
                    </p>
                </div>
                <Image
                    src={post.image}
                    layout="fill"
                    quality="20"
                    objectFit="cover"
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Post Modal"
                style={{
                    overlay: {
                        zIndex: 999999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(0,0,0,0.5)",
                        padding: 0,
                    },
                    content: {
                        zIndex: 99999999,
                        border: "none",
                        padding: "0 !important",
                        inset: "initial",
                        display: "flex",
                        width: "80%",
                        maxWidth: "400px",
                        background: "none",
                        justifyContent: "center",
                    },
                }}
            >
                <div className="w-full">
                    <Card
                        initialPost={post}
                        updateParentPostList={updateParentPostList}
                    />
                </div>
            </Modal>
        </>
    );
};

export default PostGrid;
