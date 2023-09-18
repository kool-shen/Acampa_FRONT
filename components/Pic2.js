import React from "react";
import styles from "../styles/Pic2.module.css";
import Image from "next/image";

import { useState } from "react";

const Pic2 = (props) => {
  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
  };

  const isImage = props.src.endsWith(".jpg") || props.src.endsWith(".png");
  const isVideo = props.src.endsWith(".mov");

  if (isImage) {
    return (
      <Image
        blurDataURL={"/assets/Logo-fleur.png"}
        src={props.src}
        width={props.width}
        height={100}
        alt={props.alt}
        className={`${styles.pic} ${!stillLoading && styles.picLoaded}`}
        onLoad={handleLoad}
        onClick={props.onClick}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        sizes={`(min-width: 768px) ${props.firstSize}, ${props.secondSize} `}
      />
    );
  }

  if (isVideo) {
    return (
      <div
        className={`${styles.videoContainer} ${
          !stillLoading && styles.picContainerLoaded
        }`}
      >
        <video
          src={props.src}
          className={`${styles.picLoaded} lazyload`}
          width={props.width}
          height={props.height}
          autoPlay
          loop
          muted
        />
      </div>
    );
  }

  return null;
};

export default Pic2;
