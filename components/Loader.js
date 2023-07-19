import React from "react";
import styles from "../styles/Home.module.css";

export default function Loader(props) {
  return (
    <div className={styles.loaderContainer} style={props.style}>
      <div className={styles.acampaBold}>CHARGEMENT</div>
    </div>
  );
}
