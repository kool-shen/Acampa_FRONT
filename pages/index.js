import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Home from "@/components/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Head>
        <title>Acampa Studio</title>
        <meta name="description" content="Acampa Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Home />
    </>
  );
}
