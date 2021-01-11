import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex w-full h-full flex-col justify-center items-center relative overflow-hidden">
            <h1 className="text-5xl">404</h1>
            <h3>Page not found</h3>
            <div className="mt-2">
                <Link href="/" passHref>
                    <a href="/">
                        <Button>Take me back!</Button>
                    </a>
                </Link>
            </div>
            <img
                src="https://media.giphy.com/media/VIQfHC9jAZbt6ojTdo/giphy.gif"
                alt="lost gif"
                height="200"
                width="200"
                className="rounded absolute -bottom-2"
            />
        </div>
    );
}

export async function getStaticProps() {
    return {
        props: {},
    };
}
