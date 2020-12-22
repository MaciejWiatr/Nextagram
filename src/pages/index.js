import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/slices/UserSlice";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { loginUser } from "../store/slices/UserSlice";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <Layout>
            <div className="w-full flex justify-center">
                <Card></Card>
            </div>
        </Layout>
    );
}
