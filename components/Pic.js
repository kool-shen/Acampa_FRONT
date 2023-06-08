import React from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../reducers/loading";

function Pic(props) {
  /////

  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
  };

  return (
    <div className={styles.picContainer}>
      <Image
        blurDataURL={"/assets/Logo-fleur.png"}
        src={props.src}
        width={props.width}
        height={100}
        alt={"yo"}
        className={styles.picLoaded}
        onLoad={handleLoad}
        onClick={props.onClick}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    </div>
  );
}

export default Pic;
