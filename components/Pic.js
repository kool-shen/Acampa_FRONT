import React, { useState } from "react";
import styles from "../styles/Pic.module.css";
import Image from "next/image";

function Pic(props) {
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
          className={styles.picLoaded}
          onLoadingComplete={handleLoad}
          onClick={props.onClick}
          style={props.style}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          loading="lazy"
          sizes="(max-width: 1000px) 100vw, 1000px"
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

export default Pic;
