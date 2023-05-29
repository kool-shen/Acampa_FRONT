import Shop from "@/components/Shop";
import Head from "next/head";

function shop() {
  return (
    <>
      <Head>
        <title>Acampa - la boutique</title>
        <meta name="description" content="IE=edge" />
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Shop />;
    </>
  );
}

export default shop;
