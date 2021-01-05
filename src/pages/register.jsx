import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import axios from "axios";
import Layout from "../components/Layout";
import { apiURL } from "../constants";

const Login = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const registerFormRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });

        try {
            await axios.post(`${apiURL}accounts/users/`, {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            toast({
                position: "bottom-left",
                title: "Registered",
                description:
                    "You have successfully registered. Now you can log in!",
                status: "success",
                duration: 4500,
                isClosable: true,
            });
            router.push("/login");
        } catch (err) {
            setError("Registration has failed");
        }
    };

    return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center items-center p-3">
                <Box className="flex flex-col justify-center items-center text-3xl h-auto rounded shadow p-10">
                    <Text className="mb-2 w-full text-left font-semibold">
                        Nextagram
                    </Text>
                    <form
                        ref={registerFormRef}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Input
                            placeholder="Username"
                            className="mb-2"
                            ref={usernameRef}
                        />
                        <Input
                            placeholder="Email"
                            className="mb-2"
                            ref={emailRef}
                        />
                        <Input
                            placeholder="Password"
                            className="mb-2"
                            ref={passwordRef}
                        />
                        <div className="flex justify-between items-center">
                            <Button
                                colorScheme="blue"
                                type="submit"
                                className="w-full"
                            >
                                Register
                            </Button>
                            <Link href="/login" passHref>
                                <a href="/" className="text-base text-blue-600">
                                    Login
                                </a>
                            </Link>
                        </div>
                    </form>
                    {error ? (
                        <Alert status="error" className="rounded mt-2 text-lg">
                            <AlertIcon />
                            {error}
                        </Alert>
                    ) : null}
                </Box>
            </div>
        </Layout>
    );
};

export default Login;
