import { Text } from "@chakra-ui/react";

const CardDescription = ({ expanded, description, setExpanded, author }) => (
    <Text pl="2" pt="0" fontSize=".9rem">
        <b>{author.username}</b>{" "}
        {expanded ? description : description.substr(0, 100)}{" "}
        <button
            onClick={() => setExpanded((state) => !state)}
            className="text-gray-500"
            type="button"
        >
            Read {expanded ? "less" : "more"}
        </button>
    </Text>
);

export default CardDescription;
