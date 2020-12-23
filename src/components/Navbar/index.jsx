import Link from "next/link";
import { FiHome, FiHeart, FiCompass, FiSearch } from "react-icons/fi";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ProfileMenu } from "../ProfileMenu";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="h-14 flex flex-row justify-center items-center p-3 text-2xl shadow-md mb-2 w-full">
            <div className="md:w-1/2 flex flex-row justify-between items-center w-full">
                <Link href="/">
                    <a>Nextagram</a>
                </Link>

                <div className="flex justify-center items-center ml-1 mr-1 w-18 md:w-auto">
                    <Input
                        name="search input"
                        borderRadius="5px"
                        placeholder="Search"
                        size="sm"
                    ></Input>
                </div>

                <ul className="flex flex-row">
                    <li className="flex justify-center items-center">
                        <Link href="/">
                            <a>
                                <FiHome />
                            </a>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center ml-2">
                        <Link href="/">
                            <a>
                                <FiCompass />
                            </a>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center ml-2">
                        <Link href="/">
                            <a>
                                <FiHeart />
                            </a>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center ml-2 relative">
                        <button
                            className="flex justify-center items-center min-w-img"
                            onClick={() => {
                                setMenuOpen((state) => !state);
                            }}
                        >
                            <Image
                                className="rounded-full"
                                src={
                                    user.isAuthenticated
                                        ? `${user.user.profile.photo}`
                                        : "/user.png"
                                }
                                width={20}
                                height={20}
                                alt="user image"
                            ></Image>
                        </button>
                        {menuOpen ? <ProfileMenu /> : null}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
