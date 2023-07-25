import React from "react";
import styles from "../styles/LandinPage.module.css";
import Pic2 from "./Pic2";

function LandingPage(props) {
  return (
    <div className={styles.mainContainer} style={props.style}>
      <div className={styles.globalContainer}>
        <div className={styles.textContainer}>
          <div className={styles.crossContainer} onClick={props.onClickCross}>
            <Pic2
              src={"/assets/x-mark-white.png"}
              width={100}
              height={100}
              alt={"cross"}
            />
          </div>
          <div className={styles.text}>{props.message}</div>
          <div className={styles.button} onClick={props.onClickButton}>
            <div className={styles.text}>{props.button}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
