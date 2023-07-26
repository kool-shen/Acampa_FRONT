import React from "react";
import Head from "next/head";
import styles from "../styles/Failure.module.css";
import Pic2 from "@/components/Pic2";

export default function paymentFailed() {
  const backHome = () => {
    window.location.href = "http://localhost:3001/";
  };

  return (
    <>
      <Head>
        <title>Le paiement a échoué</title>
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
          <div className={styles.text} style={{ color: "black" }}>
            Désolé, votre paiement n'a pas pu aboutir... Vous n'avez pas été
            débité.
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
