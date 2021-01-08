import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { BsFillGridFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import PostList from "../../components/PostList";
import { fetchUser, updateUser } from "../../store/slices/UserSlice";
import { apiURL } from "../../constants";
import Layout from "../../components/Layout";
import ProfileSummary from "../../components/ProfileSummary";
import PostGrid from "../../components/PostGrid";

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

const Profile = ({ initialProfile, posts: initialPosts }) => {
    const router = useRouter();
    const [profile, setProfile] = useState(initialProfile);
    const user = useSelector((state) => state.user);
    const isUser = user.user.id === profile.id;
    const [isFollowed, setFollowed] = useState(
        user.isAuthenticated
            ? user.user.profile.follows.includes(profile.id)
            : false,
    );
    const [posts, setPosts] = useState(initialPosts);
    const { userId } = router.query;
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.user.isAuthenticated) {
            return;
        }
        dispatch(fetchUser(user.user.id));
    }, [isFollowed]);

    const fetchProfile = async () => {
        const resp = await axios.get(`${apiURL}accounts/users/${userId}`);
        setProfile((prof) => ({ ...prof, ...resp.data }));
    };

    const updatePosts = async () => {
        const postsResp = await axios.get(
            `${apiURL}posts/?author__id=${profile.id}`,
            {
                headers: { Authorization: `Token ${user.token}` },
            },
        );
        setPosts(() => postsResp.data);
    };

    const handleFollow = async () => {
        if (isFollowed) {
            const followsWithoutProfile = user.user.profile.follows.filter(
                (follow) => follow !== profile.id,
            );
            await axios.patch(
                `${apiURL}accounts/profiles/${user.user.profile.profile_id}/`,
                {
                    follows: followsWithoutProfile,
                },
                {
                    headers: { Authorization: `Token ${user.token}` },
                },
            );
            setFollowed(() => false);
            fetchProfile();
        } else {
            await axios.patch(
                `${apiURL}accounts/profiles/${user.user.profile.profile_id}/`,
                {
                    follows: [...user.user.profile.follows, profile.id],
                },
                {
                    headers: { Authorization: `Token ${user.token}` },
                },
            );
            setFollowed(() => true);
            fetchProfile();
        }
        dispatch(fetchUser(user.user.id));
    };

    return (
        <Layout>
            <div className="flex flex-row overflow-hidden w-full">
                <div className="md:w-1/5 overflow-hidden" />
                <div className="w-full md:w-3/5 overflow-hidden flex justify-center">
                    <div className="flex w-full max-w-3xl flex-col items-center p-2">
                        <ProfileSummary
                            isUser={isUser}
                            isFollowed={isFollowed}
                            handleFollow={handleFollow}
                            profile={profile}
                            fetchProfile={fetchProfile}
                        />

                        {isUser ? (
                            <>
                                <div className="flex justify-center flex-col">
                                    <Button
                                        colorScheme="white"
                                        textColor="black"
                                        className="shadow-md"
                                        onClick={() =>
                                            setShowForm((state) => !state)
                                        }
                                    >
                                        {showForm ? `Close` : `New Post`}
                                    </Button>
                                </div>
                                {showForm ? (
                                    <NewPostForm
                                        updatePosts={updatePosts}
                                        fetchProfile={fetchProfile}
                                    />
                                ) : null}
                            </>
                        ) : null}
                        <Tabs
                            isFitted
                            variant="enclosed"
                            className="w-full mt-5"
                        >
                            <TabList mb="1em">
                                <Tab>
                                    <BsFillGridFill />
                                </Tab>
                                <Tab>
                                    <FaList />
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <PostGrid
                                        posts={posts}
                                        updateParentPostList={updatePosts}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <PostList
                                        posts={posts}
                                        updateParentPostList={updatePosts}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
                <div className="md:w-1/5 overflow-hidden" />
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    context.res.setHeader("Cache-Control", "s-maxage=20");
    const { userId } = context.query;

    console.time("SSR Profile Fetch");
    const urls = [
        `${apiURL}accounts/users/${userId}`,
        `${apiURL}posts/?author__id=${userId}`,
    ];
    const [profileResp, postsResp] = await Promise.all(
        urls.map((url) => fetch(url)),
    ).then((resp) => Promise.all(resp.map((r) => r.json())));

    console.timeEnd("SSR Profile Fetch");
    const profile = profileResp;
    const posts = postsResp;

    if (profile.detail === "Not found.") {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            key: userId,
            initialProfile: profile,
            posts,
        },
    };
}

export default Profile;
