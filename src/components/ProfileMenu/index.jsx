import Link from "next/link";
import { BiUserCircle, BiLogOut, BiLogIn } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { useToast } from "@chakra-ui/react";
import { logOut } from "../../store/slices/UserSlice";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const toast = useToast();

    const handleLogOut = () => {
        dispatch(logOut());
    };

    const handleLogInRedir = () => {
        router.push("/login");
    };

    return (
        <div className="absolute top-6 w-max text-base bg-white rounded shadow p-3 right-0 z-50">
            <ul>
                {user.isAuthenticated ? (
                    <li>
                        <Link href={`/profile/${user.user.id}`} passHref>
                            <a href="/" className="flex flex-row items-center">
                                <BiUserCircle />
                                <span className="ml-1">Profile</span>
                            </a>
                        </Link>
                    </li>
                ) : null}
                <li>
                    {user.isAuthenticated ? (
                        <button
                            onClick={() => {
                                handleLogOut();
                                toast({
                                    position: "bottom-left",
                                    title: "Logged out.",
                                    description: "You successfully logged out.",
                                    status: "success",
                                    duration: 4500,
                                    isClosable: true,
                                });
                            }}
                            type="button"
                            className="flex flex-row items-center"
                        >
                            <BiLogOut />
                            <span className="ml-1">Log Out</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleLogInRedir()}
                            type="button"
                            className="flex flex-row items-center"
                        >
                            <BiLogIn />
                            <span className="ml-1">Log In</span>
                        </button>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ProfileMenu;
