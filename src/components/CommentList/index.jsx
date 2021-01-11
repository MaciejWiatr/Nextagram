const CommentList = ({ comments }) => (
    <ul className="pl-2 mb-2 text-sm">
        {comments
            ? comments
                  .slice(0, 3)
                  .map(({ author: commentAuthor, message, id: commentId }) => (
                      <li key={commentId}>
                          <b>{commentAuthor.username}</b> {message}
                      </li>
                  ))
            : null}
    </ul>
);

export default CommentList;
