import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { add } from "../store/slices/UserSlice";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout"

export default function Home() {
    const dispatch = useDispatch();
    return (
        <Layout>
          
        </Layout>
    );
}
