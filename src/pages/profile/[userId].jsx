import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { fetchUser } from "../../store/slices/UserSlice";
import Card from "../../components/Card";
import { apiURL } from "../../constants";
import Layout from "../../components/Layout";
import ProfileSummary from "../../components/ProfileSummary";

const Profile = ({ initialProfile, posts }) => {
    const router = useRouter();
    const [profile, setProfile] = useState(initialProfile);
    const user = useSelector((state) => state.user);
    const isUser = user.user.id === profile.id;
    const [isFollowed, setFollowed] = useState(
        user.isAuthenticated
            ? user.user.profile.follows.includes(profile.id)
            : false
    );
    const { userId } = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(user.user.id));
    }, [isFollowed]);

    const fetchProfile = async () => {
        const resp = await axios.get(`${apiURL}accounts/users/${userId}`);
        setProfile((prof) => ({ ...prof, ...resp.data }));
    };

    const handleFollow = async () => {
        if (isFollowed) {
            const followsWithoutProfile = user.user.profile.follows.filter(
                (follow) => follow !== profile.id
            );
            await axios.patch(
                `${apiURL}accounts/profiles/${user.user.profile.profile_id}/`,
                {
                    follows: followsWithoutProfile,
                },
                {
                    headers: { Authorization: `Token ${user.token}` },
                }
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
                }
            );
            setFollowed(() => true);
            fetchProfile();
        }
    };

    return (
        <Layout>
            <ProfileSummary
                isUser={isUser}
                isFollowed={isFollowed}
                handleFollow={handleFollow}
                profile={profile}
            />
            {isUser ? (
                <div className="flex justify-center">
                    <Button colorScheme="green">Add post</Button>
                </div>
            ) : null}
            <div className="w-full flex justify-center flex-col items-center pl-2 pr-2">
                {posts
                    ? posts.map((post) => (
                          <Card key={post.id} initialPost={post} />
                      ))
                    : "No Posts found"}
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { userId } = context.query;

    const profileResp = await axios.get(`${apiURL}accounts/users/${userId}`);
    const profile = profileResp.data;
    const postsResp = await axios.get(
        `${apiURL}posts/?author__id=${profile.id}`
    );

    const posts = postsResp.data;

    return {
        props: {
            key: userId,
            initialProfile: profile,
            posts,
        },
    };
}

export default Profile;
