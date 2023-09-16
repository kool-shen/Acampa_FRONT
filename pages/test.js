import Head from "next/head";
import styles from "../styles/Pic.module.css";
import Image from "next/image";

function test() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Image
          fill
          src={
            "https://res.cloudinary.com/djnnxlvp3/image/upload/q_auto/v1/Homepage/photos%20home/Atelier_saison_hqx6iu.jpg"
          }
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 50vw, 30vw"
          onClick={(e) => {
            console.log(e.target.width);
          }}
        />
      </div>
    </div>
  );
}

export default test;
