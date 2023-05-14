import React from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";
import { useState } from "react";

function Pic2(props) {
  /////

  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
  };

  return (
    <div
      className={`${styles.container} ${
        !stillLoading && styles.containerLoaded
      }`}
    >
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        alt={"Acampa"}
        className={styles.picLoaded}
        onLoad={handleLoad}
        onClick={props.onClick}
        style={props.style}
      />
    </div>
  );
}

export default Pic2;
