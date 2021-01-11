import Link from "next/link";
import { BiUserCircle, BiLogOut, BiLogIn } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { logOut } from "../../store/slices/UserSlice";

const NavbarMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const toast = useToast();

    const handleLogOut = () => {
        dispatch(logOut());
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

                {user.isAuthenticated ? (
                    <li>
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
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href="/login" passHref>
                                <a
                                    className="flex flex-row items-center"
                                    href="/"
                                >
                                    <BiLogIn />
                                    <span className="ml-1">Log In</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/register" passHref>
                                <a
                                    className="flex flex-row items-center"
                                    href="/"
                                >
                                    <AiOutlineUserAdd />
                                    <span className="ml-1">Register</span>
                                </a>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default NavbarMenu;
