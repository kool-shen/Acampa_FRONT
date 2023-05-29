import Prestations from "@/components/Prestations";
import Head from "next/head";

function prestations() {
  return (
    <>
      <Head>
        <title>Acampa - nos prestations</title>
        <meta name="description" content="IE=edge" />
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Prestations />
    </>
  );
}

export default prestations;
