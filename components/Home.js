import React from "react";
import styles from "../styles/Home.module.css";
import friseStylesfrom from "../styles/Frise2.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Pic from "./Pic";
import Menu from "./Menu";
import Cart from "./Cart";
import Link from "next/link";
import { gsap } from "gsap";
import { clickMessage } from "@/reducers/message";

import { useRouter } from "next/router";

export default function Home() {
  /// ANIMATIONS ////
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const crossRef = useRef(null);
  const descriptionRef = useRef(null);
  const subCatRef = useRef(null);
  const aboutCategoryRef = useRef(null);
  const scrollRef = useRef(null);

  const menuTimeline = gsap.timeline({
    defaults: { duration: 0.05, ease: "power2" },
  });

  // Anim sous catégories///

  const [menuState, setMenuState] = useState(false);
  const [subCat, setSubCat] = useState(false);
  const [aboutState, setAboutState] = useState(false);
  const [shopClicked, setShopClicked] = useState(false);
  const [aboutClicked, setAboutClicked] = useState(false);

  const displaySubCat = () => {
    setSubCat(true);
  };

  const hideSubCat = () => {
    setSubCat(false);
  };

  const displayAbout = () => {
    setAboutState(true);
  };

  const hideAbout = () => {
    setAboutState(false);
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

  /// Anim scroll au mount de la Home + scroll horizontal ///

  /// Scroll horizontal ///

  const scrollContainerRef = useRef(null);

  function handleScroll(e) {
    e.preventDefault();

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

  /// Version Web ///

  /// Mobile ///

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  ///

  const isWeb = !mobileScreen && mobileScreen !== undefined;
  const isMobile = mobileScreen && mobileScreen !== undefined;

  const webScrollAnimation = () => {
    isWeb
      ? gsap.to(scrollContainerRef.current, {
          x: "-=200",
          repeat: 1,
          yoyo: true,
          delay: 2,
          duration: 1,
        })
      : console.log("yo");
  };

  /// Version mobile ///

  const mobileScrollAnimation = () => {
    scrollRef.current && isMobile
      ? gsap.to(scrollRef.current, {
          y: "-=200",
          repeat: 1,
          yoyo: true,
          delay: 2,
          duration: 1,
        })
      : "";
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
  const [texte, setTexte] = useState();

  const loadPresentation = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/presentation"
        // "http://localhost:3000/cloudinary/presentation"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setTexte(resource[0].context.alt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [fetchData, setFetchData] = useState([]);

  const loadImage = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/homepage"
        // "http://localhost:3000/cloudinary/homepage"
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
        // "http://localhost:3000/cloudinary/shopSubcategories"
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

  // Config Panier

  const [cartClicked, setCartClicked] = useState(false);
  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  useEffect(() => {
    loadImage();
    loadPresentation();
    loadSubCategories();
    mobileScrollAnimation();
    webScrollAnimation();
    calculateScreen();

    !mobileScreen && (menuAnimation(), aboutAnimation(), shopAnimation());

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
  }, [
    toggle,
    menuState,
    subCat,
    aboutState,
    isClicked,
    scrollRef.current,
    scrollContainerRef.current,
  ]);

  /// Générer page product depuis click menu ///

  const router = useRouter();

  const GenerateCollectionPage = (collectionName) => {
    router.push(`/${collectionName}`);
  };

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  //////////

  const repeatCount = 3;
  const sequenceLength = mobileScreen ? 5 : 4;

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
    console.log(hoveredInfos);
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

  const fadeOut = {
    opacity: "0",
    transition: "opacity 0.4s, transform 0.4s",
    visibility: "hidden",
  };

  const fadeIn = {
    opacity: "1",
    transition: "opacity 0.4s, transform 0.4s",
    visibility: "visible",
  };

  const mainStyle = {
    display: mobileScreen !== undefined ? "flex" : "none",
  };

  return !mobileScreen ? (
    <div
      className={styles.mainContainer}
      ref={scrollContainerRef}
      onWheel={mobileScreen ? undefined : handleScroll}
      onClick={() => {
        isClicked && crossClick();
        webScrollAnimation();
      }}
      style={mainStyle}
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
            <div className={styles.linkShopContainer}>
              <Link
                className={styles.linkShop}
                //style={removeLinkStyle}
                href={`${hoveredInfos.refShop}`}
              >
                VOIR DANS LA BOUTIQUE
              </Link>
            </div>
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
          {texte && <div className={styles.acampaDescription}>{texte}</div>}
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
              width={35}
              height={33}
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
                  setShopClicked(!shopClicked);
                  shopClicked ? hideSubCat() : displaySubCat();
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
                    className={styles.subcatContainer}
                    style={{ display: "none" }}
                  >
                    <div
                      className={styles.shopSubCategory}
                      onClick={() => {
                        GenerateCollectionPage(subCategories[i].name);
                      }}
                      key={i}
                    >
                      {subCategories[i].name}
                    </div>
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
                  setAboutClicked(!aboutClicked);
                  aboutClicked ? hideAbout() : displayAbout();
                }}
              >
                À propos
              </div>
            </div>

            <div
              className={styles.shopSubCategoryContainer}
              ref={aboutCategoryRef}
              // onMouseEnter={() => {
              //   displayAbout();
              // }}
              // onMouseLeave={() => {
              //   hideAbout();
              // }}

              /* style={props.aboutSubCatStyle}*/
            >
              <div className={styles.subcatContainer}>
                <Link
                  href="/acampa"
                  style={{
                    ...removeLinkStyle,
                    fontFamily:
                      router.asPath === "/acampa"
                        ? "Authentic90"
                        : "Authentic60",
                  }}
                  className={styles.shopSubCategory}
                >
                  Acampà
                </Link>
              </div>
              <div className={styles.subcatContainer}>
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
              </div>

              <div className={styles.subcatContainer}>
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
              </div>
              <div className={styles.subcatContainer}>
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
      </div>
      {Array.from({ length: repeatCount }, (_, index) => {
        const startIndex = index * (sequenceLength + 1); // Calculer l'index de départ

        return (
          <div className={styles.photoContainer} key={index}>
            <div className={styles.scrollContainerTop2}>
              {fetchData
                .slice(startIndex, startIndex + 2)
                .map((data, dataIndex) => (
                  <div className={styles.cadre}>
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
                          onClick={() => {
                            clickPhoto(data);
                            console.log(texte);
                          }}
                          style={
                            data.src === hoveredInfos.src ||
                            hoveredInfos.src === ""
                              ? fadeIn
                              : fadeOut
                          }
                        />
                      )}
                    </div>
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
                      // style={{ border: "1px solid green" }}
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
  ) : (
    <div
      className={styles.mobileMainContainer}
      onClick={() => {
        isClicked && crossClick();
      }}
      ref={scrollRef}
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
            <div className={styles.linkShopContainer}>
              <Link
                className={styles.linkShop}
                //style={removeLinkStyle}
                href={`${hoveredInfos.refShop}`}
              >
                VOIR DANS LA BOUTIQUE
              </Link>
            </div>
          )}
        </div>
        <div className={styles.textContainer}>
          <Cart
            style={displayCart}
            isClicked={messageClicked}
            onClick={() => {
              setCartClicked(false);
              setMessageClicked(false);
              messageIsFalse();
            }}
          />
          <Menu
            clickCart={() => {
              setCartClicked(true);
            }}
            display={"block"}
            about={true}
            flowerStyle={"hidden"}
          />
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
          {texte && <div className={styles.acampaDescription}>{texte}</div>}
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
      {Array.from({ length: repeatCount }, (_, index) => {
        const startIndex = index * (sequenceLength + 1); // Calculer l'index de départ

        return (
          <div className={styles.mobilePhotoContainer} key={index}>
            <div className={styles.mobileScrollContainer1}>
              {fetchData
                .slice(startIndex, startIndex + 2)
                .map((data, dataIndex) => (
                  <div className={styles.cadre}>
                    <div className={styles.mobilePic1} key={dataIndex}>
                      {fetchData.length > 0 && (
                        <Pic
                          src={data.src}
                          width={data.width}
                          height={data.height}
                          alt={data.collection}
                          onClick={() => {
                            clickPhoto(data);
                            console.log(texte);
                          }}
                          style={
                            data.src === hoveredInfos.src ||
                            hoveredInfos.src === ""
                              ? fadeIn
                              : fadeOut
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.mobileScrollContainer2}>
              <div className={styles.mobilePic2}>
                {fetchData.length > 0 && (
                  <Pic
                    src={fetchData[startIndex + 2].src}
                    width={fetchData[startIndex + 2].width}
                    height={fetchData[startIndex + 2].height}
                    alt={fetchData[startIndex + 2].collection}
                    onClick={() => clickPhoto(fetchData[startIndex + 2])}
                    style={
                      fetchData[startIndex + 2].src === hoveredInfos.src ||
                      hoveredInfos.src === ""
                        ? fadeIn
                        : fadeOut
                    }
                  />
                )}
              </div>
            </div>
            <div className={styles.mobileScrollContainer1}>
              {fetchData
                .slice(startIndex + 3, startIndex + 5)
                .map((data, dataIndex) => (
                  <>
                    <div className={styles.cadre}>
                      <div
                        className={styles[`mobilePic${dataIndex + 3}`]}
                        key={dataIndex}
                      >
                        {fetchData.length > 0 && (
                          <Pic
                            src={data.src}
                            width={data.width}
                            height={data.height}
                            alt={data.collection}
                            onClick={() => {
                              clickPhoto(data);
                              console.log(texte);
                            }}
                            style={
                              data.src === hoveredInfos.src ||
                              hoveredInfos.src === ""
                                ? fadeIn
                                : fadeOut
                            }
                          />
                        )}
                      </div>
                    </div>
                  </>
                ))}
            </div>
            <div className={styles.mobileScrollContainer2}>
              <div className={styles.mobilePic6}>
                {fetchData.length > 0 && (
                  <Pic
                    src={fetchData[startIndex + 5].src}
                    width={fetchData[startIndex + 5].width}
                    height={fetchData[startIndex + 5].height}
                    alt={fetchData[startIndex + 5].collection}
                    onClick={() => clickPhoto(fetchData[startIndex + 5])}
                    style={
                      fetchData[startIndex + 5].src === hoveredInfos.src ||
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
