import React from "react";
import styles from "../styles/Home.module.css";
import friseStylesfrom from "../styles/Frise2.module.css";
import { useState, useEffect, useRef } from "react";
import Pic from "./Pic";
import Link from "next/link";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Home() {
  /// ANIMATIONS ////
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const crossRef = useRef(null);
  const descriptionRef = useRef(null);
  const subCatRef = useRef(null);
  const aboutCategoryRef = useRef(null);

  const menuTimeline = gsap.timeline({
    defaults: { duration: 0.1, ease: "power2" },
  });

  // Anim sous catégories///

  const [menuState, setMenuState] = useState(false);
  const [subCat, setSubCat] = useState(false);
  const [aboutState, setAboutState] = useState(false);

  const displaySubCat = () => {
    setSubCat(!subCat);
  };

  const displayAbout = () => {
    setAboutState(!aboutState);
  };

  const aboutAnimation = () => {
    aboutState
      ? Array.from(aboutCategoryRef.current?.children).forEach((child) =>
          menuTimeline.to(child, { visibility: "visible", display: "block" })
        )
      : Array.from(aboutCategoryRef.current?.children).forEach((child) =>
          menuTimeline.to(child, { visibility: "hidden", display: "none" })
        );
  };

  const shopAnimation = () => {
    subCategories &&
      (subCat
        ? Array.from(subCatRef.current?.children).forEach((child) => {
            menuTimeline.to(child, {
              display: "block",
              visibility: "visible",
            });
          })
        : Array.from(subCatRef?.current?.children).forEach((child) =>
            menuTimeline.to(child, {
              visibility: "hidden",
              display: "none",
            })
          ));
  };

  /// Anim Menu ///

  const hideMenu = () => {
    setMenuState(false);
    setAboutState(false);
    setSubCat(false);
  };

  const displayMenu = () => {
    setMenuState(!menuState);
  };

  const menuAnimation = () => {
    menuState
      ? (menuTimeline
          .to(burgerRef.current, { visibility: "hidden", display: "none" })
          .to(crossRef.current, { visibility: "visible", display: "block" }),
        menuRef.current &&
          menuRef.current.children &&
          Array.from(menuRef.current.children).forEach((child) => {
            menuTimeline.to(child, { opacity: 1, visibility: "visible" });
          }))
      : menuTimeline
          .to(crossRef.current, { visibility: "hidden", display: "none" })
          .to(menuRef.current.children, { opacity: 0, visibility: "hidden" })
          .to(burgerRef.current, { visibility: "visible", display: "block" });
  };

  /// description qui disparit quand on clique sur une photo ///

  const [toggle, setToggle] = useState(false);

  const hide = () => {
    setToggle(true);
  };

  const display = () => {
    setToggle(false);
  };

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

  const [subCategories, setSubcategories] = useState();

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/shopSubcategories"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setSubcategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  ///

  const [isClicked, setIsClicked] = useState(false);

  ///

  useEffect(() => {
    loadImage();
    loadSubCategories();
    menuAnimation();
    shopAnimation();
    aboutAnimation();

    /// scroll horizontal ///

    //// animation GSAP ////
    toggle
      ? gsap.to(descriptionRef.current, {
          opacity: 0,
          duration: 0.8,
        })
      : gsap.to(descriptionRef.current, {
          opacity: 1,
          duration: 0.8,
        });
  }, [toggle, menuState, subCat, aboutState, isClicked]);

  /// Générer page product depuis click menu ///

  const router = useRouter();

  const GenerateCollectionPage = (collectionName) => {
    router.push(`/${collectionName}`);
  };

  /// Scroll horizontal ///

  const scrollContainerRef = useRef(null);

  function handleScroll(e) {
    !isClicked && e.preventDefault();

    const race = 35; // How many pixels to scroll
    const container = scrollContainerRef.current;

    if (e.deltaY > 0) {
      // Scroll right
      container.scrollLeft += race;
    } else {
      // Scroll left
      container.scrollLeft -= race;
    }
  }

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  //////////

  const repeatCount = 3;
  const sequenceLength = 4;

  /// EFFET FOCUS ONCLICK PHOTO ///

  const [hoveredInfos, setHoveredInfos] = useState({
    src: "",
    nom: "",
    description: "",
  });

  const clickPhoto = (data) => {
    setHoveredInfos({
      src: data.src,
      nom: data.metadata?.nom_du_produit,
      description: data.context?.alt,
      refShop: data.metadata?.ml4tdfywqkkgth7uun95,
    });
    hideMenu();
    setIsClicked(true);
    hide();
  };

  const crossClick = () => {
    setHoveredInfos({
      src: "",
      nom: "",
      description: "",
      refShop: "",
    });
    setIsClicked(false);
    display();
  };

  /*const isClicked = hoveredInfos.src !== "";*/
  /*const shopExists = isClicked && */

  const fadeOut = {
    opacity: "0",
    transition: "opacity 0.4s",
    visibility: "hidden",
  };

  const fadeIn = {
    opacity: "1",
    transition: "opacity 0.4s",
    visibility: "visible",
  };

  return (
    <div
      className={styles.mainContainer}
      ref={scrollContainerRef}
      onWheel={handleScroll}
    >
      <div className={styles.presentationContainer}>
        <div
          className={styles.hoveredDescriptionContainer}
          style={isClicked ? fadeIn : fadeOut}
        >
          <img
            src={"/assets/x-mark.png"}
            width={30}
            height={30}
            onClick={() => {
              crossClick();
            }}
            className={styles.cross}
          />
          <div className={styles.hoveredName}>
            {hoveredInfos.nom ? hoveredInfos.nom.toUpperCase() : ""}
          </div>
          <div
            className={styles.hoveredDescription}
            style={isClicked ? fadeIn : fadeOut}
          >
            {hoveredInfos.description ? hoveredInfos.description : ""}
          </div>
          {hoveredInfos.refShop && (
            <Link
              className={styles.linkShop}
              //style={removeLinkStyle}
              href={`${hoveredInfos.refShop}`}
            >
              VOIR DANS LA BOUTIQUE
            </Link>
          )}
        </div>
        <div
          className={styles.acampaContainer}
          //style={isClicked ? fadeOut : fadeIn && { transitionDelay: "0.2s" }}
          ref={descriptionRef}
        >
          <div className={styles.acampaBold}>
            Acampá*
            <div /> <div className={styles.acampaBold}></div>est un atelier
            floral
          </div>
          <div className={styles.acampaRegular}>basé à Marseille.</div>
          <div className={styles.acampaDescription}>
            * "Porter une chose du champ à la maison" dit l’étymologie
            provençale, une bien jolie manière de définir cette envie de fleurir
            vos "intérieurs" que ce soit dans vos doux salons d’hiver, vos
            tablées printanières ou simplement vos envies du coeur.
          </div>
        </div>
        <div
          className={styles.logoContainer}
          style={isClicked ? fadeOut : fadeIn}
        >
          <Pic
            className={styles.logo}
            width={542}
            height={956}
            src={"/assets/Logo-fleur.png"}
          />
        </div>
      </div>

      <div className={styles.menuContainer} /*style={displayMenu}*/>
        <div className={styles.menu}>
          <div
            className={styles.burgerContainer}
            onClick={() => {
              displayMenu();
            }}
            ref={burgerRef}
            /*style={burgerStyle}*/
          >
            <img
              width={37}
              height={37}
              src={"/assets/burgerMenu.png"}
              alt={"burger menu logo"}
            />
          </div>
          <img
            width={37}
            height={37}
            src={"/assets/cross.png"}
            alt={"cross"}
            onClick={() => {
              hideMenu();
            }}
            ref={crossRef}
          />
          <div className={styles.categoryContainer} ref={menuRef}>
            <div className={styles.titleContainer}>
              <div
                onClick={() => {
                  displaySubCat();
                }}
                style={removeLinkStyle}
                className={styles.title}
              >
                Boutique
              </div>
            </div>
            {subCategories ? (
              <div className={styles.shopSubCategoryContainer} ref={subCatRef}>
                {subCategories.map((data, i) => (
                  <div
                    className={styles.shopSubCategory}
                    style={{ display: "none" }}
                    onClick={() => {
                      GenerateCollectionPage(subCategories[i].name);
                    }}
                    key={i}
                  >
                    {subCategories[i].name}
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            <div className={styles.titleContainer}>
              <Link
                href="/prestations"
                style={removeLinkStyle}
                className={styles.title}
              >
                Prestations
              </Link>
            </div>
            <div className={styles.titleContainer}>
              <div
                className={styles.title}
                onClick={() => {
                  displayAbout();
                }}
              >
                À propos
              </div>
            </div>
            <div
              className={styles.shopSubCategoryContainer}
              ref={aboutCategoryRef}

              /* style={props.aboutSubCatStyle}*/
            >
              <Link
                href="/acampa"
                style={{
                  ...removeLinkStyle,
                  fontFamily:
                    router.asPath === "/acampa" ? "Authentic90" : "Authentic60",
                }}
                className={styles.shopSubCategory}
              >
                Acampà
              </Link>

              <Link
                href="/actu"
                className={styles.shopSubCategory}
                style={{
                  ...removeLinkStyle,
                  fontFamily:
                    router.asPath === "/actu" ? "Authentic90" : "Authentic60",
                }}
              >
                Actu
              </Link>

              <Link
                href="/mentions"
                className={styles.shopSubCategory}
                style={
                  router.asPath === "/mentions"
                    ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                    : { ...removeLinkStyle, fontFamily: "Authentic60" }
                }
              >
                Mentions légales
              </Link>

              <Link
                href="/contact"
                style={
                  router.asPath === "/contact"
                    ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                    : { ...removeLinkStyle, fontFamily: "Authentic60" }
                }
                className={styles.shopSubCategory}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {Array.from({ length: repeatCount }, (_, index) => {
        const startIndex = index * sequenceLength; // Calculer l'index de départ

        return (
          <div className={styles.photoContainer} key={index}>
            <div className={styles.scrollContainerTop2}>
              {fetchData
                .slice(startIndex, startIndex + 2)
                .map((data, dataIndex) => (
                  <div
                    className={styles[`pic${dataIndex + 1}Container`]}
                    key={dataIndex}
                  >
                    {fetchData.length > 0 && (
                      <Pic
                        src={data.src}
                        width={data.width}
                        height={data.height}
                        alt={data.collection}
                        onClick={() => clickPhoto(data)}
                        style={
                          data.src === hoveredInfos.src ||
                          hoveredInfos.src === ""
                            ? fadeIn
                            : fadeOut
                        }
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className={styles.scrollContainerBottom2}>
              <div className={styles.leftPicContainer2}>
                {fetchData
                  .slice(startIndex + 2, startIndex + 4)
                  .map((data, dataIndex) => (
                    <div
                      className={styles[`pic${dataIndex + 3}Container`]}
                      key={dataIndex}
                    >
                      {fetchData.length > 0 && (
                        <Pic
                          src={data.src}
                          width={data.width}
                          height={data.height}
                          alt={data.collection}
                          onClick={() => clickPhoto(data)}
                          style={
                            data.src === hoveredInfos.src ||
                            hoveredInfos.src === ""
                              ? fadeIn
                              : fadeOut
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
              <div className={styles.pic5Container}>
                {fetchData.length > 0 && (
                  <Pic
                    src={fetchData[startIndex + 4].src}
                    width={fetchData[startIndex + 4].width}
                    height={fetchData[startIndex + 4].height}
                    alt={fetchData[startIndex + 4].collection}
                    onClick={() => clickPhoto(fetchData[startIndex + 4])}
                    style={
                      fetchData[startIndex + 4].src === hoveredInfos.src ||
                      hoveredInfos.src === ""
                        ? fadeIn
                        : fadeOut
                    }
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
