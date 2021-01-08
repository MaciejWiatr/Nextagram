/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Input,
    Switch,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiUpload } from "react-icons/bi";
import axios from "axios";
import { apiURL } from "../../constants";
import { fetchUser } from "../../store/slices/UserSlice";
import Validator from "../../validator";

const ProfileSummary = ({
    profile,
    isUser,
    isFollowed,
    handleFollow,
    fetchProfile,
}) => {
    const user = useSelector((state) => state.user);
    const usernameInputRef = useRef(null);
    const pictureInputRef = useRef(null);
    const [editing, setEditing] = useState(false);
    const profileImgRef = useRef(null);
    const imageFormRef = useRef(null);
    const [profileImage, setProfileImage] = useState(profile.profile.photo);
    const [usernameState, setUsernameState] = useState(profile.username);
    const [descriptionState, setDescriptionState] = useState(
        profile.profile.description || "",
    );
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const loadFile = (event) => {
        setProfileImage(URL.createObjectURL(event.target.files[0]));
        profileImgRef.current.onload = () => {
            URL.revokeObjectURL(profileImgRef.current.src); // free memory
        };
    };

    const handleProfileUpdate = async () => {
        if (!user.isAuthenticated) {
            return;
        }
        const data = {
            username: usernameState,
            description: descriptionState,
        };

        const { valid, err } = Validator.validate("profile", data);

        if (!valid) {
            setError(err);
            return;
        }

        setError("");
        await axios.patch(
            `${apiURL}accounts/users/${user.user.id}/`,
            {
                username: usernameInputRef.current.value.replaceAll(" ", "_"),
            },
            {
                headers: { Authorization: `Token ${user.token}` },
            },
        );
        const formData = new FormData(imageFormRef.current);
        formData.append("description", descriptionState);
        await axios({
            method: "PATCH",
            url: `${apiURL}accounts/profiles/${user.user.id}/`,
            data: formData,
            headers: {
                Authorization: `Token ${user.token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        fetchProfile();
        dispatch(fetchUser(user.user.id));
    };

    return (
        <div className="w-full flex flex-col justify-center mt-5">
            <div className="w-full">
                {error ? (
                    <Alert className="w-full rounded mb-2" status="error">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                ) : null}
            </div>
            <div className="w-full md:h-36 max-w-2xl flex flex-col md:flex-row ">
                <div className="w-full md:w-1/3 h-full relative flex justify-center items-center p-5 md:p-0 min-w-20 ">
                    <div className="min-w-20 h-24 w-24 md:h-36 md:w-36 min-w-img-lg relative rounded-full overflow-hidden">
                        {editing ? (
                            <img
                                src={profileImage}
                                alt="profile_pic"
                                ref={profileImgRef}
                                className="object-cover h-full w-full"
                            />
                        ) : (
                            <Image
                                src={profileImage}
                                alt="profile_pic"
                                layout="fill"
                                objectFit="cover"
                                quality="60"
                                className="object-cover h-full"
                            />
                        )}
                        {editing ? (
                            <div className="absolute top-0 left-0 w-full h-full">
                                <form ref={imageFormRef}>
                                    <label
                                        className="w-full h-full absolute text-center flex flex-col justify-center items-center text-3xl bg-green-300 bg-opacity-50 text-white cursor-pointer
                                     transition hover:bg-green-600 hover:bg-opacity-50
                                    "
                                    >
                                        <BiUpload />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={loadFile}
                                            name="photo"
                                            ref={pictureInputRef}
                                        />
                                    </label>
                                </form>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="w-full md:w-2/3 p-5">
                    <div className="text-3xl mb-2 flex items-center">
                        {editing ? (
                            <div className="flex">
                                <Input
                                    placeholder={profile.username}
                                    mr="1"
                                    value={usernameState}
                                    onChange={(e) =>
                                        setUsernameState(e.target.value)
                                    }
                                    ref={usernameInputRef}
                                />
                            </div>
                        ) : (
                            <h1>{profile.username}</h1>
                        )}{" "}
                        {isUser ? (
                            <div className="ml-auto flex flex-row items-end">
                                {editing ? (
                                    <Button
                                        onClick={() => handleProfileUpdate()}
                                        className="mr-2"
                                    >
                                        Save
                                    </Button>
                                ) : null}

                                <Switch
                                    id="email-alerts"
                                    onChange={(e) => {
                                        setEditing((s) => !s);
                                        setError("");
                                        setProfileImage(profile.profile.photo);
                                    }}
                                />
                                <p className="text-lg ml-1 mb-0.5">Edit</p>
                            </div>
                        ) : (
                            <Button
                                className="ml-2"
                                colorScheme={isFollowed ? "red" : "blue"}
                                onClick={() => handleFollow()}
                            >
                                {isFollowed ? "Unfollow" : "Follow"}
                            </Button>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <p>
                            <b>{profile.posts.length}</b> Posts
                        </p>
                        <p>
                            <b>{profile.profile.followed_by.length}</b>{" "}
                            Followers
                        </p>
                        <p>
                            <b>{profile.profile.follows.length}</b> Follows
                        </p>
                    </div>
                    <p>
                        {!editing ? (
                            profile.profile.description
                        ) : (
                            <Input
                                placeholder="description"
                                value={descriptionState}
                                onChange={(e) =>
                                    setDescriptionState(e.target.value)
                                }
                            />
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSummary;
