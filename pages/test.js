import Head from "next/head";
import styles from "../styles/Pic.module.css";
import Image from "next/image";

function test() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.simple}>
          <Image
            fill
            src={
              "https://res.cloudinary.com/djnnxlvp3/image/upload/q_auto/v1/Homepage/photos%20home/Atelier_saison_hqx6iu.jpg"
            }
            style={{ objectFit: "contain" }}
            sizes="(min-width: 768px) 10vw, 5vw"
            onClick={(e) => {
              console.log(e.target.width);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default test;
