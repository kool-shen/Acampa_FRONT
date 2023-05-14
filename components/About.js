import React, { useRef } from "react";
import styles from "../styles/About.module.css";

export default function About() {
  const scrollContainerRef = useRef(null);

  return (
    <div ref={scrollContainerRef} className={styles.mainContainer}>
      <div className={styles.firstContainer}></div>
      <div className={styles.secondContainer}></div>
    </div>
  );
}
