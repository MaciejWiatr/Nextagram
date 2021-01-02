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
import { loginUser } from "../store/slices/UserSlice";
import Layout from "../components/Layout";

const Login = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);
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
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        try {
            await dispatch(loginUser(username, password));
            router.push("/");
            toast({
                position: "bottom-left",
                title: "Logged in.",
                description: "You successfully logged in.",
                status: "success",
                duration: 4500,
                isClosable: true,
            });
        } catch (err) {
            setError("Login has failed");
        }
    };

    return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center items-center p-3">
                <Box className="flex flex-col justify-center items-center text-3xl h-auto rounded shadow p-10">
                    <Text className="mb-2 w-full text-left font-semibold">
                        Nextagram
                    </Text>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Input
                            placeholder="Username"
                            ref={usernameInputRef}
                            className="mb-2"
                        />
                        <Input
                            placeholder="Password"
                            ref={passwordInputRef}
                            className="mb-2"
                        />
                        <Button
                            colorScheme="blue"
                            type="submit"
                            className="w-full"
                        >
                            Log In
                        </Button>
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
