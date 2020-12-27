import { ChakraProvider } from "@chakra-ui/react";
import { withReduxCookiePersist } from "next-redux-cookie-wrapper";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import makeStore from "../store";
import "../styles/globals.css";
import "../styles/tailwind.css";
import "../styles/vendor/progressBar.css";
import { loadProgressBar } from "axios-progress-bar";

if (typeof window === "undefined") {
    const ServerCookies = require("cookies");
    ServerCookies.prototype;
}

function MyApp({ Component, pageProps, store }) {
    useEffect(() => {
        loadProgressBar();
    }, []);

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
