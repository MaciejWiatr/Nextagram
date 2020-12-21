import { ChakraProvider } from "@chakra-ui/react";
import { withReduxCookiePersist } from "next-redux-cookie-wrapper";
import { Provider } from "react-redux";
import makeStore from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps, store }) {
    return (
        <Provider store={store}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default withReduxCookiePersist(makeStore, {
    cookieConfig: {
        expiration: {
            default: 365 * 86400,
        },
    },
})(MyApp);
