import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Button, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { apiURL } from "../../constants";

const NewPostForm = ({ updatePosts, fetchProfile }) => {
    const user = useSelector((state) => state.user);
    const formRef = useRef(null);
    const [postImage, setPostImage] = useState("");
    const postImagePreview = useRef(null);

    const uploadForm = async (formData) => {
        try {
            await axios({
                method: "post",
                url: `${apiURL}posts/`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token ${user.token}`,
                },
            });
            updatePosts();
            fetchProfile();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        uploadForm(formData);
        e.target.reset();
    };

    const loadFile = (event) => {
        setPostImage(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <Box className="w-full p-3 rounded bg-white shadow mt-2 mb-2">
            <h2 className="text-xl">Add new post</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <FormLabel>Image</FormLabel>
                <label className="w-full h-10 flex justify-center items-center bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
                    <AiOutlinePlusCircle />
                    <Input
                        type="file"
                        className="p-1 hidden"
                        name="image"
                        onChange={loadFile}
                    />
                </label>
                {postImage !== "" ? (
                    <img
                        ref={postImagePreview}
                        src={postImage}
                        alt="preview"
                        className="rounded-b"
                    />
                ) : null}

                <FormLabel>Description</FormLabel>
                <Textarea name="description" />
                <Button type="submit">Upload</Button>
            </form>
        </Box>
    );
};

export default NewPostForm;
