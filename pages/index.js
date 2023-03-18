import Head from "next/head";
import Home from "@/components/Home";

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
