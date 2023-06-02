import React from "react";
import styles from "../styles/Pic2.module.css";
import Image from "next/image";

import { useState } from "react";

function Pic2(props) {
  return (
    <Image
      blurDataURL={"/assets/Logo-fleur.png"}
      src={props.src}
      width={props.width}
      height={props.height}
      alt={"yo"}
      className={styles.picLoaded}
      onLoad={handleLoad}
      onClick={props.onClick}
      style={props.style}
    />
  );
}

export default Pic2;
