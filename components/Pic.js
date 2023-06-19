import React, { useState } from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";
import "lazysizes";

function Pic(props) {
  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
  };

  const isImage = props.src.endsWith(".jpg") || props.src.endsWith(".png");
  const isVideo = props.src.endsWith(".mov");

  if (isImage) {
    return (
      <div
        className={`${styles.picContainer} ${
          !stillLoading && styles.picContainerLoaded
        }`}
      >
        <Image
          blurDataURL={"/assets/Logo-fleur.png"}
          src={props.src}
          width={props.width}
          height={props.height}
          alt={"yo"}
          className={`${styles.picLoaded} lazyload`}
          onLoad={handleLoad}
          onClick={props.onClick}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        />
      </div>
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
          onClick={props.onClick}
          alt={"video Acampà"}
          style={props.style}
          autoPlay
          loop
          muted
        />
      </div>
    );
  }

  // Gérez d'autres types de médias ici si nécessaire

  return null; // Retourne null si le type de média n'est pas pris en charge
}

export default Pic;
