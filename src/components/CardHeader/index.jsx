import { Box, Button, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

function CardHeader({
    setShowOptions,
    user,
    author,
    showOptions,
    handleDelete,
    id,
}) {
    return (
        <Box h="50px" className="w-full flex">
            <div className="flex-grow">
                <Link href={`/profile/${author.id}`} passHref>
                    <a
                        className="flex flex-row justify-start items-center p-2"
                        href="/"
                    >
                        <Image
                            src={author.profile.photo}
                            width="30"
                            height="30"
                            className="rounded-full"
                            alt="user image"
                            quality="10"
                        />
                        <Text className="ml-2">{author.username}</Text>
                    </a>
                </Link>
            </div>
            {user.user.id === author.id ? (
                <div className="flex items-center p-2 relative">
                    <Button
                        borderRadius="30px"
                        w="40px"
                        p="0"
                        h="40px"
                        onClick={() => setShowOptions((state) => !state)}
                    >
                        <BsThreeDots />
                    </Button>
                    {showOptions ? (
                        <div className="absolute right-2 top-10 z-50 bg-white rounded shadow p-2 pl-3 pr-3">
                            <ul className="text-left font-normal">
                                <li>
                                    <button
                                        className="hover:text-gray-500"
                                        type="button"
                                        onClick={() => handleDelete()}
                                    >
                                        Delete
                                    </button>
                                </li>
                                <li>
                                    <Link href={`/post/${id}`} passHref>
                                        <a
                                            className="hover:text-gray-500"
                                            href="/"
                                        >
                                            Edit
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </Box>
    );
}

export default CardHeader;
