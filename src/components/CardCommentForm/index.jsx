import { Input, Button } from "@chakra-ui/react";

const CardCommentForm = ({ user, addComment, commentInputRef }) => {
    return (
        <form
            className="p-2 flex"
            onSubmit={(e) => {
                e.preventDefault();
                addComment();
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
                    addComment();
                }}
                disabled={!user.isAuthenticated}
            >
                Publish
            </Button>
        </form>
    );
};

export default CardCommentForm;
