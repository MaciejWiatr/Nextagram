import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { add } from "../store/slices/UserSlice";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function Home() {
    const dispatch = useDispatch();
    return (
        <Layout>
            <div className="w-full flex justify-center">
                <Card></Card>
            </div>
        </Layout>
    );
}
