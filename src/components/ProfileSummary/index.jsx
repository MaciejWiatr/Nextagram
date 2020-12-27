import Image from "next/image";
import { BiPencil } from "react-icons/bi";
import { Button } from "@chakra-ui/react";

export function ProfileSummary({ profile, isUser, isFollowed, handleFollow }) {
    return (
        <div className="w-full flex justify-center p-2 mt-5">
            <div className="w-full md:w-7/12 md:h-36 max-w-2xl  flex flex-col md:flex-row ">
                <div className="w-full md:w-1/3 h-full relative flex justify-center items-center p-5 md:p-0 min-w-20 ">
                    <div className="min-w-20 h-24 w-24 md:h-36 md:w-36 relative rounded-full overflow-hidden">
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={profile.profile.photo}
                        ></Image>
                    </div>
                </div>
                <div className="w-full md:w-2/3 p-5">
                    <div className="text-3xl mb-2 flex items-center">
                        <h1>{profile.username}</h1>{" "}
                        {isUser ? (
                            <button>
                                <span className="text-2xl">
                                    <BiPencil />
                                </span>
                            </button>
                        ) : (
                                <Button
                                    className="ml-2"
                                    colorScheme={isFollowed ? "red" : "blue"}
                                    onClick={() => handleFollow()}
                                >
                                    {isFollowed ? "Unfollow" : "Follow"}
                                </Button>
                            )}
                    </div>
                    <div className="flex justify-between">
                        <p>
                            <b>{profile.posts.length}</b> Posts
                        </p>
                        <p>
                            <b>{profile.profile.followed_by.length}</b>{" "}
                            Followers
                        </p>
                        <p>
                            <b>{profile.profile.follows.length}</b> Follows
                        </p>
                    </div>
                    <p>{profile.profile.description}</p>
                </div>
            </div>
        </div>
    );
}