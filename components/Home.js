import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import Pic from "./Pic";
import Link from "next/link";

import { isLoading } from "../reducers/loading";
import { useSelector } from "react-redux";

export default function Home() {
  //// Animation GSAP ///

  const [menuState, setMenuState] = useState(null);
  const [logoState, setLogoState] = useState(null);
  const [bottomPicState, setBottomPicState] = useState(null);
  const [topPicState, setTopPicState] = useState(null);

  const timeline = gsap.timeline({
    defaults: { opacity: 1, duration: 1, ease: "power2" },
  });

  //// Load Image Next ///

  const hasLoaded = useSelector((state) => state.loading.value);

  //// Load Cloudinary ////

  const [fetchData, setFetchData] = useState([]);

  const loadImage = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/homepage"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setFetchData(resource);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    if (!menuState || !bottomPicState || !topPicState || !logoState) return;

    loadImage();
    console.log("yes");

    timeline
      .to(logoState, { y: 20, delay: 1 })
      .to(menuState.children[0], {})
      .to(menuState.children[1], {}, "-=0.9")
      .to(menuState.children[2], {}, "-=0.9")
      .to(menuState.children[3], {}, "-=0.9")
      .to(bottomPicState.children, {}, 1)
      .to(topPicState.children, {}, 1);
  }, [menuState, bottomPicState, topPicState, logoState]);

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  //////////

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer} ref={setLogoState}>
        <img className={styles.logo} src={"/assets/Logo-fleur.png"}></img>
      </div>

      <div className={styles.scrollContainerTop} ref={setTopPicState}>
        <div className={styles.picContainerTop}>
          {fetchData.length > 0 && (
            <Pic
              src={fetchData[0].src}
              width={fetchData[0].width}
              height={fetchData[0].height}
              alt={fetchData[0].collection}
            />
          )}
        </div>
        <div className={styles.picContainerTop}>
          {fetchData.length > 0 && (
            <Pic
              src={fetchData[1].src}
              width={fetchData[1].width}
              height={fetchData[1].height}
              alt={fetchData[1].collection}
            />
          )}
        </div>
      </div>
      <div className={styles.scrollContainerBottom} ref={setBottomPicState}>
        <div className={styles.picContainerBottom}>
          {fetchData.length > 0 && (
            <Pic
              src={fetchData[2].src}
              width={fetchData[2].width}
              height={fetchData[2].height}
              alt={fetchData[2].collection}
            />
          )}
        </div>

        <div className={styles.picContainerBottom}>
          {fetchData.length > 0 && (
            <Pic
              src={fetchData[3].src}
              width={fetchData[3].width}
              height={fetchData[3].height}
              alt={fetchData[3].collection}
            />
          )}
        </div>
        <div className={styles.picContainerBottom}>
          {fetchData.length > 0 && (
            <Pic
              src={fetchData[4].src}
              width={fetchData[4].width}
              height={fetchData[4].height}
              alt={fetchData[4].collection}
            />
          )}
        </div>
      </div>

      <div className={styles.menu} ref={setMenuState}>
        <div className={styles.titleContainer}>
          <div className={styles.titleBold}>Acampa</div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>À propos</div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Prestations</div>
        </div>
        <div className={styles.titleContainer}>
          <Link href="/shop" style={removeLinkStyle} className={styles.title}>
            Boutique
          </Link>
        </div>
      </div>
    </div>
  );
}
