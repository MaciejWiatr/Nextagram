import axios from "axios";
import { useState } from "react";
import Layout from "../../components/Layout";
import PostDetail from "../../components/PostDetail";
import { apiURL } from "../../constants";

const PostDetailPage = ({ initialPost }) => {
    const [post] = useState(initialPost);
    return (
        <Layout>
            <div className="flex w-full h-full justify-center items-center p-2">
                <PostDetail initialPost={post} />
            </div>
        </Layout>
    );
};

export default PostDetailPage;

export const getServerSideProps = async ({ params }) => {
    const { postId } = params;

    const postResp = await axios.get(`${apiURL}posts/${postId}`);

    return {
        props: {
            initialPost: postResp.data,
        },
    };
};
