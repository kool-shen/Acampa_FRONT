import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Pic from "./Pic";
import Picture from "./Picture";
import Image from "next/image";
import Menu from "./Menu";
import Link from "next/link";
import { gsap } from "gsap";
import { clickMessage } from "@/reducers/message";
import { useRouter } from "next/router";
import Panier from "./Panier";
import Loader from "./Loader";

export default function Home() {
  /// ANIMATIONS ////
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const crossRef = useRef(null);
  const descriptionRef = useRef(null);
  const subCatRef = useRef(null);
  const aboutCategoryRef = useRef(null);
  const scrollRef = useRef(null);
  const photoRefs = useRef([]);
  const loaderRef = useRef(null);

  const menuTimeline = gsap.timeline({
    defaults: { duration: 0.05, ease: "power2" },
  });

  /// first visit ///

  const [firstVisit, setFirstVisit] = useState();

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
    const race = 15; // How many pixels to scroll
    const container = scrollContainerRef.current;

    if (e.deltaY > 0) {
      // Scroll right
      container.scrollLeft += race;
    } else {
      // Scroll left
      container.scrollLeft -= race;
    }
  }

  /// Mobile ///

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  ///

  ////////// Gérer les photos //////
  const repeatCount = 5;
  const sequenceLength = mobileScreen ? 5 : 4;

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleAllImagesLoaded = () => {
    if (loadedImagesCount === (sequenceLength + 1) * repeatCount) {
      setAllImagesLoaded(true);
    }
  };

  /// Loader ///

  const [loading, setLoading] = useState(true);

  const zIndexloader = () => {
    !loading &&
      setTimeout(() => {
        loaderRef.current.style.zIndex = "-1";
      }, 500);
  };

  ////// Animation scroll au mount ///

  const [animationPlayed, setAnimationPlayed] = useState(false);

  const isWeb = !mobileScreen && mobileScreen !== undefined;
  const isMobile = mobileScreen && mobileScreen !== undefined;

  const webScrollAnimation = () => {
    scrollContainerRef.current &&
      isWeb &&
      firstVisit &&
      gsap.to(scrollContainerRef.current, {
        x: "-=200",
        repeat: 1,
        yoyo: true,
        delay: 2,
        duration: 0.6,
        onComplete: () => {
          setAnimationPlayed(true);
        },
      });
  };

  /// Version mobile ///

  const mobileScrollAnimation = () => {
    scrollRef.current && isMobile && firstVisit
      ? gsap.to(scrollRef.current, {
          y: "-=200",
          repeat: 1,
          yoyo: true,
          delay: 1,
          duration: 0.6,
          onComplete: () => {
            setAnimationPlayed(true);
          },
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
  const [fetchData, setFetchData] = useState([]);
  const [subCategories, setSubcategories] = useState();

  const loadPresentation = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/presentation"
        // "http://localhost:3000/cloudinary/presentation"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setTexte(resource[0].context.alt);
        // Cache the API data
        localStorage.setItem("presentationData", JSON.stringify(resource));
        console.log("backend");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadImage = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/homepage"
        //"http://localhost:3000/cloudinary/homepage"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setFetchData(resource);
        // Cache the API data
        localStorage.setItem("homepageData", JSON.stringify(resource));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/shopSubcategories"
        // "http://localhost:3000/cloudinary/shopSubcategories"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setSubcategories(indexlist);
        // Cache the API data
        localStorage.setItem("subcategoriesData", JSON.stringify(indexlist));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearCache = () => {
    // Clear the cache every 30 minutes
    localStorage.removeItem("presentationData");
    localStorage.removeItem("homepageData");
    localStorage.removeItem("subcategoriesData");
    console.log("cache cleared");
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

  /// EFFET FOCUS ONCLICK PHOTO ///

  const [hoveredInfos, setHoveredInfos] = useState({
    src: "",
    nom: "",
    description: "",
    index: null,
  });

  const clickPhoto = (data, index) => {
    setHoveredInfos({
      src: data.src,
      nom: data.metadata?.nom_du_produit,
      description: data.context?.alt,
      refShop: data.metadata?.ml4tdfywqkkgth7uun95,
      index: index,
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

  const loaderFadout = {
    opacity: "0",
    transition: "opacity 0.4s, transform 0.4s",
    zIndex: -1,
  };

  const loaderFadeIn = {
    opacity: "1",
    transition: "opacity 0.4s, transform 0.4s",
  };

  const mainStyle = {
    display: mobileScreen !== undefined ? "flex" : "none",
    pointerEvents: animationPlayed || !firstVisit ? "auto" : "none",
  };

  /// USEEFFECT LOAD API / CACHE ////

  useEffect(() => {
    // Check if the API data is cached
    const presentationData = localStorage.getItem("presentationData");
    const homepageData = localStorage.getItem("homepageData");
    const subcategoriesData = localStorage.getItem("subcategoriesData");

    if (
      presentationData !== null &&
      homepageData !== null &&
      subcategoriesData !== null
    ) {
      // Use the cached data
      setFirstVisit(false);
      setTexte(JSON.parse(presentationData)[0].context.alt);
      setFetchData(JSON.parse(homepageData));
      setSubcategories(JSON.parse(subcategoriesData));
      console.log("cache");
    } else {
      // Fetch the API data
      setFirstVisit(true);
      loadPresentation();
      loadImage();
      loadSubCategories();
    }

    loadPresentation();
    loadImage();
    loadSubCategories();

    console.log(animationPlayed);

    const interval = setInterval(clearCache, 1800000);

    return () => {
      clearInterval(interval);
      interval;
    };
  }, []);

  /////////////////

  const enoughImagesLoaded = loadedImagesCount > 6;

  useEffect(() => {
    handleAllImagesLoaded();

    zIndexloader();

    enoughImagesLoaded &&
      (isWeb
        ? (webScrollAnimation(), setLoading(false), console.log("loaded"))
        : mobileScrollAnimation());
    return () => {};
  }, [enoughImagesLoaded]);

  useEffect(() => {
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
  }, [toggle, menuState, subCat, aboutState, isClicked, loading]);

  const centerPhotoOnClick = (e) => {
    const ref = photoRefs.current[e];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const centerPhotoOnTop = (e) => {
    const ref = photoRefs.current[e];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "start", // Cela positionne l'élément en haut de la vue
      });
    }
  };

  const bottomPhotoOnClick = (e) => {
    const ref = photoRefs.current[e];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "end", // Cela positionne l'élément en haut de la vue
      });
    }
  };

  return !mobileScreen ? (
    <div
      className={styles.mainContainer}
      ref={scrollContainerRef}
      onWheel={mobileScreen ? undefined : handleScroll}
      onClick={() => {
        isClicked && crossClick();
      }}
      style={mainStyle}
    >
      {firstVisit && (
        <Loader ref={loaderRef} style={loading ? loaderFadeIn : loaderFadout} />
      )}

      <div className={styles.presentationContainer}>
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
            <div className={styles.scrollContainerTop}>
              {fetchData
                .slice(startIndex, startIndex + 2)
                .map((data, dataIndex) => (
                  <>
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
                            clickPhoto(data, dataIndex);
                          }}
                          style={
                            data.src === hoveredInfos.src ||
                            hoveredInfos.src === ""
                              ? fadeIn
                              : fadeOut
                          }
                          onImageLoad={() => {
                            handleImageLoad();
                          }}
                        />
                      )}
                      <div
                        className={styles.hoveredDescriptionContainer1}
                        style={
                          // fadeIn
                          isClicked && hoveredInfos.src === data.src
                            ? fadeIn
                            : fadeOut
                        }
                      >
                        <div className={styles.hoveredName}>
                          {hoveredInfos.nom
                            ? hoveredInfos.nom.toUpperCase()
                            : ""}
                        </div>
                        <div className={styles.hoveredDescription}>
                          {hoveredInfos.description
                            ? hoveredInfos.description
                            : ""}
                        </div>
                        {hoveredInfos.refShop && (
                          <div className={styles.linkShopContainer}>
                            <Link
                              className={styles.linkShop}
                              href={`${hoveredInfos.refShop}`}
                            >
                              VOIR DANS LA BOUTIQUE
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ))}
            </div>
            <div className={styles.scrollContainerBottom}>
              <div className={styles.leftPicContainer2}>
                {fetchData
                  .slice(startIndex + 2, startIndex + 4)
                  .map((data, dataIndex) => (
                    <>
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
                            onClick={() => {
                              clickPhoto(data);
                              console.log(hoveredInfos.src);
                            }}
                            style={
                              data.src === hoveredInfos.src ||
                              hoveredInfos.src === ""
                                ? fadeIn
                                : fadeOut
                            }
                            onImageLoad={() => {
                              handleImageLoad();
                            }}
                          />
                        )}
                      </div>
                      <div
                        className={styles.hoveredDescriptionContainer2}
                        style={
                          isClicked && hoveredInfos.src === data.src
                            ? fadeIn
                            : fadeOut
                        }
                      >
                        <div className={styles.hoveredName}>
                          {hoveredInfos.nom
                            ? hoveredInfos.nom.toUpperCase()
                            : ""}
                        </div>
                        <div className={styles.hoveredDescription}>
                          {hoveredInfos.description
                            ? hoveredInfos.description
                            : ""}
                        </div>
                        {hoveredInfos.refShop && (
                          <div className={styles.linkShopContainer}>
                            <Link
                              className={styles.linkShop}
                              href={`${hoveredInfos.refShop}`}
                            >
                              VOIR DANS LA BOUTIQUE
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
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
                    onImageLoad={() => {
                      handleImageLoad();
                    }}
                  />
                )}
                <div
                  className={styles.hoveredDescriptionContainer3}
                  style={
                    isClicked &&
                    hoveredInfos.src === fetchData[startIndex + 4].src
                      ? fadeIn
                      : fadeOut
                  }
                >
                  <div className={styles.hoveredName}>
                    {hoveredInfos.nom ? hoveredInfos.nom.toUpperCase() : ""}
                  </div>
                  <div className={styles.hoveredDescription}>
                    {hoveredInfos.description ? hoveredInfos.description : ""}
                  </div>
                  {hoveredInfos.refShop && (
                    <div className={styles.linkShopContainer}>
                      <Link
                        className={styles.linkShop}
                        href={`${hoveredInfos.refShop}`}
                      >
                        VOIR DANS LA BOUTIQUE
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    /// VERSION MOBILE ///
    <div
      className={styles.mobileMainContainer}
      onClick={() => {
        isClicked && crossClick();
      }}
      style={mainStyle}
      ref={scrollRef}
    >
      <div className={styles.presentationContainer}>
        <div className={styles.textContainer}>
          <Panier
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
          {texte && <p className={styles.acampaDescription}>{texte}</p>}
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
          fetchData.length > 0 && (
            <div className={styles.mobilePhotoContainer} key={index}>
              <div className={styles.mobileScrollContainer1}>
                {fetchData
                  .slice(startIndex, startIndex + 2)
                  .map((data, dataIndex) => (
                    <div className={styles.picContainer}>
                      <div
                        className={styles[`mobilePic${dataIndex + 1}`]}
                        key={dataIndex}
                        ref={(e) => (photoRefs.current[data.src] = e)}
                      >
                        {fetchData.length > 0 && (
                          <Pic
                            src={data.src}
                            width={data.width}
                            height={data.height}
                            alt={data.collection}
                            onClick={() => {
                              clickPhoto(data, dataIndex);
                              centerPhotoOnTop(data.src);
                            }}
                            style={
                              data.src === hoveredInfos.src ||
                              hoveredInfos.src === ""
                                ? fadeIn
                                : fadeOut
                            }
                            onImageLoad={() => {
                              handleImageLoad();
                            }}
                          />
                        )}
                      </div>
                      <div
                        className={
                          styles[`mobileHoveredContainer${dataIndex + 1}`]
                        }
                        style={
                          isClicked && hoveredInfos.src === data.src
                            ? fadeIn
                            : fadeOut
                        }
                      >
                        <div className={styles.hoveredName}>
                          {hoveredInfos.nom
                            ? hoveredInfos.nom.toUpperCase()
                            : ""}
                        </div>
                        <div className={styles.hoveredDescription}>
                          {hoveredInfos.description
                            ? hoveredInfos.description
                            : ""}
                        </div>
                        {hoveredInfos.refShop && (
                          <div className={styles.linkShopContainer}>
                            <Link
                              className={styles.linkShop}
                              href={`${hoveredInfos.refShop}`}
                            >
                              VOIR DANS LA BOUTIQUE
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.mobileScrollContainer2}>
                <div className={styles.picContainer}>
                  <div
                    className={styles.mobilePic3}
                    ref={(e) =>
                      (photoRefs.current[fetchData[startIndex + 2].src] = e)
                    }
                  >
                    {fetchData.length > 0 && (
                      <Pic
                        src={fetchData[startIndex + 2].src}
                        width={fetchData[startIndex + 2].width}
                        height={fetchData[startIndex + 2].height}
                        alt={fetchData[startIndex + 2].collection}
                        onClick={() => {
                          clickPhoto(fetchData[startIndex + 2]);
                          centerPhotoOnTop(fetchData[startIndex + 2].src);
                        }}
                        style={
                          fetchData[startIndex + 2].src === hoveredInfos.src ||
                          hoveredInfos.src === ""
                            ? fadeIn
                            : fadeOut
                        }
                        onImageLoad={() => {
                          handleImageLoad();
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={styles.mobileHoveredContainer3}
                    style={
                      isClicked &&
                      hoveredInfos.src === fetchData[startIndex + 2].src
                        ? fadeIn
                        : fadeOut
                    }
                  >
                    <div className={styles.hoveredName}>
                      {hoveredInfos.nom ? hoveredInfos.nom.toUpperCase() : ""}
                    </div>
                    <div className={styles.hoveredDescription}>
                      {hoveredInfos.description ? hoveredInfos.description : ""}
                    </div>
                    {hoveredInfos.refShop && (
                      <div className={styles.linkShopContainer}>
                        <Link
                          className={styles.linkShop}
                          href={`${hoveredInfos.refShop}`}
                        >
                          VOIR DANS LA BOUTIQUE
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.mobileScrollContainer3}>
                {fetchData
                  .slice(startIndex + 3, startIndex + 5)
                  .map((data, dataIndex) => (
                    <div className={styles.picContainer}>
                      <div
                        className={styles[`mobilePic${dataIndex + 4}`]}
                        key={dataIndex}
                        ref={(e) => (photoRefs.current[data.src] = e)}
                      >
                        {fetchData.length > 0 && (
                          <Pic
                            src={data.src}
                            width={data.width}
                            height={data.height}
                            alt={data.collection}
                            onClick={() => {
                              clickPhoto(data, dataIndex);
                              bottomPhotoOnClick(data.src);
                            }}
                            style={
                              data.src === hoveredInfos.src ||
                              hoveredInfos.src === ""
                                ? fadeIn
                                : fadeOut
                            }
                            onImageLoad={() => {
                              handleImageLoad();
                            }}
                          />
                        )}
                      </div>
                      <div
                        className={
                          styles[`mobileHoveredContainer${dataIndex + 4}`]
                        }
                        style={
                          isClicked && hoveredInfos.src === data.src
                            ? fadeIn
                            : fadeOut
                        }
                      >
                        <div className={styles.hoveredName}>
                          {hoveredInfos.nom
                            ? hoveredInfos.nom.toUpperCase()
                            : ""}
                        </div>
                        <div className={styles.hoveredDescription}>
                          {hoveredInfos.description
                            ? hoveredInfos.description
                            : ""}
                        </div>
                        {hoveredInfos.refShop && (
                          <div className={styles.linkShopContainer}>
                            <Link
                              className={styles.linkShop}
                              href={`${hoveredInfos.refShop}`}
                            >
                              VOIR DANS LA BOUTIQUE
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className={styles.mobileScrollContainer4}>
                <div className={styles.picContainer}>
                  <div
                    className={styles.mobilePic6}
                    ref={(e) =>
                      (photoRefs.current[fetchData[startIndex + 5].src] = e)
                    }
                  >
                    {fetchData.length > 0 && (
                      <Pic
                        src={fetchData[startIndex + 5].src}
                        width={fetchData[startIndex + 5].width}
                        height={fetchData[startIndex + 5].height}
                        alt={fetchData[startIndex + 5].collection}
                        onClick={() => {
                          clickPhoto(fetchData[startIndex + 5]);
                          fetchData[startIndex + 5];
                          bottomPhotoOnClick(fetchData[startIndex + 5].src);
                        }}
                        style={
                          fetchData[startIndex + 5].src === hoveredInfos.src ||
                          hoveredInfos.src === ""
                            ? fadeIn
                            : fadeOut
                        }
                        onImageLoad={() => {
                          handleImageLoad();
                        }}
                      />
                    )}
                  </div>
                  <div
                    className={styles.mobileHoveredContainer6}
                    style={
                      isClicked &&
                      hoveredInfos.src === fetchData[startIndex + 5].src
                        ? fadeIn
                        : fadeOut
                    }
                  >
                    <div className={styles.hoveredName}>
                      {hoveredInfos.nom ? hoveredInfos.nom.toUpperCase() : ""}
                    </div>
                    <div className={styles.hoveredDescription}>
                      {hoveredInfos.description ? hoveredInfos.description : ""}
                    </div>
                    {hoveredInfos.refShop && (
                      <div className={styles.linkShopContainer}>
                        <Link
                          className={styles.linkShop}
                          href={`${hoveredInfos.refShop}`}
                        >
                          VOIR DANS LA BOUTIQUE
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
