import Link from "next/link";
import { FiHome, FiHeart, FiCompass } from "react-icons/fi";
import Image from "next/image";
import { Input } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <nav className="h-16 flex flex-row justify-center items-center p-3 text-2xl shadow-md">
            <div className="md:w-1/2 flex flex-row justify-between items-center w-full">
                <Link href="/">
                    <a>Nextagram</a>
                </Link>

                <div className="flex justify-center items-center w-24 md:w-auto">
                    <Input placeholder="Search" size="sm"></Input>
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
                    <li className="flex justify-center items-center ml-2">
                        <Link href="/">
                            <a className="flex justify-center items-center min-w-img">
                                <Image
                                    className="rounded-full"
                                    src="/user.png"
                                    width={20}
                                    height={20}
                                ></Image>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
