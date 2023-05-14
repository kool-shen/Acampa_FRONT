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

  /////
  /*

  const hasLoaded = useSelector((state) => state.loading.value);

  const dispatch = useDispatch();

  const sendLoadingInfos = () => {
    dispatch(isLoading(true));
  };*/

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
        alt={"yo"}
        className={styles.picLoaded}
        onLoad={handleLoad}
        onClick={props.onClick}
        style={props.style}
      />
    </div>
  );
}

export default Pic;
