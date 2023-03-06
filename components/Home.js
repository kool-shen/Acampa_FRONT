import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Home() {
  //// Animation GSAP ///

  //const [greensock, Setgreensock] = useState(false);
  //const animate = () => Setgreensock(!greensock);

  const [complete, setComplete] = useState(false);

  const picRef = useRef(null);

  const onePicRef = useRef(null);

  gsap.registerEffect({
    name: "firstGreen",
    effect: (target, config) => {
      return gsap.to(target, {
        duration: config.duration,
        opacity: 1,
        ease: "expo",
        stagger: 0.5,
        y: 50,
        onComplete: () => {
          console.log("yes");
          gsap.set(onePicRef.current, { opacity: 0 });
        },
      });
    },
  });

  gsap.registerEffect({
    name: "secondGreen",
    effect: (target, config) => {
      return gsap.from(target, {
        opacity: 0,
        duration: 3,
      });
    },
  });

  //////////

  const [menuState, setMenuState] = useState(null);
  const [logoState, setLogoState] = useState(null);
  const [bottomPicState, setBottomPicState] = useState(null);
  const [topPicState, setTopPicState] = useState(null);

  const timeline = gsap.timeline({
    defaults: { opacity: 1, duration: 1, ease: "power2" },
  });

  useLayoutEffect(() => {
    if (!menuState) return;

    timeline
      .to(logoState, { y: 20, delay: 1 })
      .to(menuState.children[0], {})
      .to(menuState.children[1], {}, "-=0.9")
      .to(menuState.children[2], {}, "-=0.9")
      .to(menuState.children[3], {}, "-=0.9")
      .to(bottomPicState.children, {}, 1)
      .to(topPicState.children, {}, 1);
  }, [menuState, bottomPicState, topPicState, logoState]);

  //////////

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer} ref={setLogoState}>
        <img className={styles.logo} src={"/assets/Logo-fleur.png"}></img>
      </div>
      <div>
        <div className={styles.scrollContainerTop} ref={setTopPicState}>
          <div className={styles.picContainerTop}>
            <img className={styles.pic} src={"/photos/003.jpg"} />
          </div>
          <div className={styles.picContainerTop}>
            <img className={styles.pic} src={"/photos/007.jpg"} />
          </div>
        </div>
        <div className={styles.scrollContainerBottom} ref={setBottomPicState}>
          <div className={styles.picContainerBottom}>
            <img className={styles.pic} src={"/photos/005.jpg"} />
          </div>

          <div className={styles.picContainerBottom}>
            <img className={styles.pic} src={"/photos/004.jpg"} />
          </div>
          <div className={styles.picContainerBottom}>
            <img className={styles.pic} src={"/photos/002.jpg"} />
          </div>
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
          <div className={styles.title}>Shop</div>
        </div>
      </div>
    </div>
  );
}
