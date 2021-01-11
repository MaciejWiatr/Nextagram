import { Input, Button } from "@chakra-ui/react";
import { useRef } from "react";

const CardCommentForm = ({ user, addComment }) => {
    const commentInputRef = useRef(null);

    return (
        <form
            className="p-2 flex"
            onSubmit={(e) => {
                e.preventDefault();
                addComment(commentInputRef.current.value);
                e.target.reset();
            }}
        >
            <Input
                ref={commentInputRef}
                name="comment input"
                placeholder="Write comment"
                border="none"
                mr="1"
                disabled={!user.isAuthenticated}
            />
            <Button
                name="button publish"
                onClick={() => {
                    addComment(commentInputRef.current.value);
                }}
                disabled={!user.isAuthenticated}
            >
                Publish
            </Button>
        </form>
    );
};

export default CardCommentForm;
