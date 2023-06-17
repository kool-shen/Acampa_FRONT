import React from "react";
import styles from "../styles/Pic2.module.css";
import Image from "next/image";

import { useState } from "react";

function Pic2(props) {
  /////

  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
  };

  return (
    <Image
      blurDataURL={"/assets/Logo-fleur.png"}
      src={props.src}
      width={props.width}
      height={100}
      alt={"yo"}
      className={`${styles.pic} ${!stillLoading && styles.picLoaded}`}
      onLoad={handleLoad}
      onClick={props.onClick}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
}

export default Pic2;
