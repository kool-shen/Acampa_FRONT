import React from "react";
import Head from "next/head";
import styles from "../styles/Success.module.css";
import Pic2 from "@/components/Pic2";
import { useSelector } from "react-redux";

export default function paymentSuccess() {
  ///

  const basketValue = useSelector((state) => state.basket.value);

  const clientAddress = useSelector((state) => state.clientData.value);

  const backHome = () => {
    window.location.href = "http://localhost:3001/";
  };

  return (
    <>
      <Head>
        <title>Paiment Validé</title>
        <meta name="description" content="IE=edge" />
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.logoContainer}>
          <Pic2
            src={"/assets/logo-Fleur.png"}
            width={1351}
            height={2377}
            alt={"cross"}
          />
        </div>
        <div className={styles.textContainer}>
          <div
            className={styles.text}
            style={{ color: "black" }}
            onClick={() => {
              console.log(basketValue, clientAddress);
            }}
          >
            Merci pour votre commande, votre paiement a été validé ! Vous allez
            recevoir un mail de confirmation.
          </div>
          <div
            className={styles.button}
            onClick={() => {
              backHome();
            }}
          >
            <div className={styles.text}>Revenir sur le site d'Acampa</div>
          </div>
        </div>
      </div>
    </>
  );
}
