import Link from "next/link";
import { FiHome, FiHeart, FiCompass } from "react-icons/fi";
import Image from "next/image";
import { Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import NavbarMenu from "../NavbarMenu";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const [menuOpen, setMenuOpen] = useState(false);
    const searchInputRef = useRef(null);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        const val = searchInputRef.current.value;
        router.push(`/search/?q=${val}`);
    };

    return (
        <nav className="h-14 flex flex-row justify-center items-center p-3 text-2xl shadow-md mb-2 w-full">
            <div className="md:w-1/2 flex flex-row justify-between items-center w-full">
                <Link href="/">
                    <a href="/">Nextagram</a>
                </Link>
                <div className="flex justify-center items-center ml-1 mr-1 w-18 md:w-auto">
                    <form onSubmit={(e) => handleSearch(e)}>
                        <Input
                            name="search input"
                            borderRadius="5px"
                            placeholder="Search"
                            size="sm"
                            ref={searchInputRef}
                        />
                    </form>
                </div>
                <ul className="flex flex-row">
                    <li className="flex justify-center items-center">
                        <Link href="/">
                            <a href="/">
                                <FiHome />
                            </a>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center ml-2">
                        <Link href="/">
                            <a href="/">
                                <FiCompass />
                            </a>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center ml-2">
                        <Link href="/liked" passHref>
                            <a href="/">
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
                            type="button"
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
                            />
                        </button>
                        {menuOpen ? <NavbarMenu /> : null}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
