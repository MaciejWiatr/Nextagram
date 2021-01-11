import { Box } from "@chakra-ui/react";
import Image from "next/image";

const CardImage = ({ handleLike, image }) => {
    return (
        <Box
            className="relative h-64 cursor-pointer"
            onDoubleClick={() => handleLike()}
        >
            <Image
                src={image}
                alt="post image"
                layout="fill"
                objectFit="cover"
                quality="60"
            />
        </Box>
    );
};

export default CardImage;
