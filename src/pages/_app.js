import { ChakraProvider } from "@chakra-ui/react";
import { withReduxCookiePersist } from "next-redux-cookie-wrapper";
import Head from "next/head";
import { Provider } from "react-redux";
import makeStore from "../store";
import "../styles/globals.css";

if (typeof window === "undefined") {
    const ServerCookies = require("cookies");
    console.log(ServerCookies);
}

function MyApp({ Component, pageProps, store }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Nextagram - A instagram clone</title>
                <meta
                    name="description"
                    content="Nextagram is a instagram inspired platform for sharing your experiences via images!"
                />
            </Head>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </Provider>
    );
}

export default withReduxCookiePersist(makeStore, {
    persistConfig: {
        whitelist: ["user"],
    },
    cookieConfig: {
        expiration: {
            default: 365 * 86400,
        },
    },
})(MyApp);
