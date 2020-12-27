import Layout from "../../components/Layout";
import { apiURL } from "../../constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "../../store/slices/UserSlice";
import { useRouter } from "next/dist/client/router";
import { ProfileSummary } from "../../components/ProfileSummary";

const Profile = ({ initialProfile, posts }) => {
    const router = useRouter();
    const [profile, setProfile] = useState(initialProfile);
    const user = useSelector((state) => state.user);
    const isUser = user.user.id === profile.id;
    const [isFollowed, setFollowed] = useState(
        user.isAuthenticated
            ? user.user.profile.follows.includes(profile.id)
            : null
    );
    const { userId } = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(user.user.id));
    }, [isFollowed]);

    useEffect(() => {
        // Refetch the active profile if user redirect to another profile page
        fetchProfile();
    }, [userId]);

    const handleFollow = () => {
        if (isFollowed) {
            const followsWithoutProfile = user.user.profile.follows.filter(
                (follow) => follow !== profile.id
            );
            axios.patch(
                apiURL + `accounts/profiles/${user.user.profile.profile_id}/`,
                {
                    follows: followsWithoutProfile,
                },
                {
                    headers: { Authorization: `Token ${user.token}` },
                }
            );
            setFollowed((state) => false);
            fetchProfile();
        } else {
            axios.patch(
                apiURL + `accounts/profiles/${user.user.profile.profile_id}/`,
                {
                    follows: [...user.user.profile.follows, profile.id],
                },
                {
                    headers: { Authorization: `Token ${user.token}` },
                }
            );
            setFollowed((state) => true);
            fetchProfile();
        }
    };

    const fetchProfile = async () => {
        const resp = await axios.get(apiURL + `accounts/users/${userId}`);
        setProfile((prof) => ({ ...prof, ...resp.data }));
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
                          <Card
                              key={post.id}
                              author={post.author}
                              likes={post.likes}
                              desc={post.description}
                              img={post.image}
                              isLiked={post.is_liked}
                              postId={post.id}
                              comments={post.comments}
                          />
                      ))
                    : "No Posts found"}
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { userId } = context.query;

    const profileResp = await axios.get(apiURL + `accounts/users/${userId}`);
    const postsResp = await axios.get(
        apiURL + `posts/?author__id=${profile.id}`
    );

    const profile = profileResp.data;
    const posts = postsResp.data;

    return {
        props: {
            initialProfile: profile,
            posts,
        },
    };
}

export default Profile;
