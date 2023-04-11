import React from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "../reducers/loading";

function Pic(props) {
  /////

  const [stillLoading, setstillLoading] = useState(false);

  const handleLoad = () => {};

  /////
  /*

  const hasLoaded = useSelector((state) => state.loading.value);

  const dispatch = useDispatch();

  const sendLoadingInfos = () => {
    dispatch(isLoading(true));
  };*/

  return (
    <Image
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.collection}
      className={styles.picLoaded}
      onLoadingComplete={handleLoad}
      onClick={props.onClick}
      style={props.style}
    />
  );
}

export default Pic;
