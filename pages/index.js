import Head from "next/head";
import Home from "@/components/Home";
import Prestations from "@/components/Prestations";

export default function Index() {
  return (
    <>
      <Head>
        <title>Acampa Studio</title>
        <meta name="description" content="IE=edge" />
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Home />
    </>
  );
}
