import React, { useState } from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";

function Picture(props) {
  const [stillLoading, setstillLoading] = useState(true);

  const handleLoad = () => {
    setstillLoading(false);
    // console.log(props.src);
    if (props.onImageLoad && typeof props.onImageLoad === "function") {
      props.onImageLoad(); // Appel de la fonction de rappel pour signaler le chargement d'une image
    }
  };

  const isImage = props.src.endsWith(".jpg") || props.src.endsWith(".png");
  const isVideo = props.src.endsWith(".mov");

  if (isImage) {
    return (
      <Image
        fill={true}
        blurDataURL={"/assets/Logo-fleur.png"}
        src={props.src}
        // width={props.width}
        // height={props.height}
        sizes={`(max-width: ${props.width}) width: ${props.width} max-height:${props.height}) height: ${props.height}`}
        alt={props.src}
        className={styles.picLoaded}
        onLoadingComplete={handleLoad}
        onClick={props.onClick}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        loading="eager"
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
          className={styles.picLoaded}
          width={props.width}
          height={props.height}
          onClick={props.onClick}
          onLoadedMetadata={handleLoad}
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

export default Picture;
