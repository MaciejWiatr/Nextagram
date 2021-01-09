import { BiSearchAlt } from "react-icons/bi";
import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import Router from "next/router";

const WelcomeMessage = () => {
    const [inputVal, setInputVal] = useState("");

    const handleSearch = () => {
        Router.push(`/search/?q=${inputVal}`);
    };
    return (
        <div className="flex flex-col items-center justify-center w-1/2">
            <form className="flex text-xl">
                <Input
                    placeholder="Search"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                />
                <Button
                    className="ml-1"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <BiSearchAlt />
                </Button>
            </form>
            <br />
            <div className="text-gray-500">
                This page is blank because you are not following anyone. First
                try searching for your friends using the search input above
            </div>
        </div>
    );
};

export default WelcomeMessage;
