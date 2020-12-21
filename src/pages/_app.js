import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import { useStore } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    const store = useStore((state) => state);
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
