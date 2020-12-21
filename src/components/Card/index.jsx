import { Box, Text, Divider, Input, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { BiHeart, BiMessageRounded } from "react-icons/bi";

const Card = ({ user, likes, desc }) => {
    user = "Maciej";
    likes = 10;
    desc =
        "e the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not onl";
    return (
        <Box mt="10px" maxW="md" className="shadow-lg rounded overflow-hidden">
            <Box
                h="50px"
                className="flex flex-row justify-start items-center p-2"
            >
                <Image
                    src="/user.png"
                    width="30"
                    height="30"
                    className="rounded-full"
                ></Image>
                <Text className="ml-2">{user}</Text>
            </Box>
            <img src="/sample_image.jpg"></img>
            <Box mt="2" pl="2" className="flex text-3xl">
                <button className="mr-2">
                    <BiHeart />
                </button>
                <button>
                    <BiMessageRounded />
                </button>
            </Box>
            <Text pl="2">{likes} Likes</Text>
            <Text p="2" pt="0" fontSize=".9rem">
                <b>{user}</b> {desc.substr(0, 100)}{" "}
                <Link href="/">
                    <a className="text-gray-200">Read more</a>
                </Link>
            </Text>
            <Divider />
            <Flex p="2">
                <Input placeholder="Write comment" border="none" mr="1"></Input>
                <Button>Publish</Button>
            </Flex>
        </Box>
    );
};

export default Card;
