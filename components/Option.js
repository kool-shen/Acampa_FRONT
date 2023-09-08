import React from "react";
import styles from "@/styles/Option.module.css";
import Pic2 from "./Pic2";

export default function Option(props) {
  return (
    <>
      {props.category ? (
        <div className={styles.propriétésContainer}>
          <div className={styles.choiceContainer}>
            <value className={styles.productDescription}>{props.name}</value>
          </div>
          <div className={styles.choiceContainer}>
            <div className={styles.logoContainer}>
              <Pic2
                src={"/assets/left.png"}
                width={100}
                height={100}
                alt={"choix précédent"}
                onClick={props.previous}
              />
            </div>
            <div className={styles.valueContainer}>
              <div className={styles.productDescription}>
                {`${props.category[props.index]}${
                  props.description ? `${props.description}` : ""
                }`
                  .replace(/_/g, " ")
                  .toUpperCase()}
              </div>
            </div>
            <div className={styles.logoContainer}>
              <Pic2
                src={"/assets/right.png"}
                width={100}
                height={100}
                alt={"choix suivant"}
                onClick={props.next}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
