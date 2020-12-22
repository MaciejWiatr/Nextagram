import Layout from "../components/Layout";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/UserSlice";
import { useRouter } from "next/dist/client/router";

const Login = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const usernameInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        try {
            dispatch(loginUser(username, password));
            router.push("/");
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Layout>
            <div className="w-full h-full  flex flex-col justify-center items-center">
                <Box className="flex flex-col justify-center items-center text-3xl h-auto rounded shadow p-10">
                    <Text className="mb-2">Log In</Text>
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder="Username"
                            ref={usernameInputRef}
                            className="mb-2"
                        ></Input>
                        <Input
                            placeholder="Password"
                            ref={passwordInputRef}
                            className="mb-2"
                        ></Input>
                        <Button
                            colorScheme="blue"
                            type="submit"
                            className="w-full"
                        >
                            Log In
                        </Button>
                    </form>
                    {error ? (
                        <Box className="bg-red-300 p-2 rounded text-sm">
                            {error}
                        </Box>
                    ) : null}
                </Box>
            </div>
        </Layout>
    );
};

export default Login;
