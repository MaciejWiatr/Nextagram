import Card from "../Card";

function PostList({ posts, updateParentPostList }) {
    return (
        <div className="w-full flex justify-center flex-col items-center pl-2 pr-2">
            {posts
                ? posts.map((post) => (
                      <Card
                          key={post.id}
                          initialPost={post}
                          updateParentPostList={updateParentPostList}
                      />
                  ))
                : "No Posts found"}
        </div>
    );
}

export default PostList;
