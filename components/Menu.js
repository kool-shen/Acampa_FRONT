import React, { cache } from "react";
import { useState, useEffect, useRef } from "react";
import menuStyles from "@/styles/subMenu.module.css";
import { useSelector } from "react-redux";
import Pic from "./Pic";
import Pic2 from "./Pic2";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import Image from "next/image";

export default function Menu(props) {
  ///Animation subcategories ///

  const subCatTimeline = gsap.timeline({
    defaults: { duration: 0.07, ease: "power3" },
  });

  const shopCategoryRef = useRef(null);
  const aboutCategoryRef = useRef(null);

  const [shopState, setShopState] = useState(false);
  const [aboutState, setAboutState] = useState(props.about);

  // const displayShopCat = () => {
  //   setShopState(!shopState);
  // };

  const displayShopCat = () => {
    setShopState(!shopState);

    shopAnimation();
  };

  const displaySubCat = () => {
    setAboutState(!aboutState);
    aboutAnimation();
  };

  const shopAnimation = () => {
    if (shopCategoryRef.current) {
      shopSubCategories &&
        (shopState
          ? Array.from(shopCategoryRef.current?.children).forEach((child) => {
              subCatTimeline.to(child, {
                display: "block",
                visibility: "visible",
              });
            })
          : Array.from(shopCategoryRef?.current?.children).forEach((child) =>
              subCatTimeline.to(child, {
                visibility: "hidden",
                display: "none",
              })
            ));
    }
  };
  const aboutAnimation = () => {
    if (aboutCategoryRef.current) {
      aboutState
        ? Array.from(aboutCategoryRef.current?.children).forEach((child) => {
            subCatTimeline.to(child, {
              visibility: "visible",
              display: "block",
            });
          })
        : Array.from(aboutCategoryRef.current?.children).forEach((child) => {
            subCatTimeline.to(child, {
              visibility: "hidden",
              display: "none",
            });
          });
    }
  };

  /// Générer page product ///

  const router = useRouter();

  const GenerateCollectionPage = (collectionName) => {
    router.push(`/${collectionName}`);
  };

  // Contenu du panier //
  const basketValue = useSelector((state) => state.basket.value);

  // Sous catégories //

  const [shopSubCategories, setShopSubcategories] = useState();

  const loadShopSubCategories = async () => {
    try {
      const response = await fetch(
        // "http://localhost:3000/cloudinary/shopSubCategories"
        "https://acampa-back.vercel.app/cloudinary/shopSubCategories"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setShopSubcategories(indexlist);
        // Cache the API data
        localStorage.setItem("menuData", JSON.stringify(indexlist));
        console.log("backend");
      }
    } catch (error) {
      console.error(error);
    }
  };

  ///mobile

  const windowSize = useRef({ width: 0, height: 0 });

  const [hideMenu, setHideMenu] = useState();

  const [isMobile, setIsMobile] = useState();

  let menuPosition;

  if (hideMenu) {
    menuPosition = {
      transform: "translateX(-500px)",
      transition: "transform 1s",
    };
  } else if (hideMenu === undefined) {
    menuPosition = {
      display: "none",
    };
  } else if (!hideMenu) {
    menuPosition = {
      transition: "transform 1s",
    };
  }

  const burgerPosition = !hideMenu
    ? { transform: "translateX(-150px)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  ///

  useEffect(() => {
    const menuData = localStorage.getItem("menuData");

    if (menuData !== null) {
      setShopSubcategories(JSON.parse(menuData));
      console.log("cache");
    } else {
      loadShopSubCategories();
    }

    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setHideMenu(true);
      } else {
        setHideMenu(false);
      }
    };

    // Vérification de la taille initiale de la fenêtre
    windowSize.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    if (windowSize.current.width <= 425) {
      setHideMenu(true);
      setIsMobile(true);
    } else {
      setHideMenu(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return !isMobile ? (
    <>
      <Image
        src={"/assets/burgerMenu.png"}
        width={100}
        height={100}
        alt={"menu"}
        className={menuStyles.burger}
        style={burgerPosition}
        onClick={() => {
          setHideMenu(!hideMenu);
        }}
      />
      <div
        className={menuStyles.menu}
        style={{ ...removeLinkStyle, ...menuPosition }}
      >
        <Link href="/" className={menuStyles.flowerContainer}>
          <Image
            src={"/assets/Logo-fleur.png"}
            width={50}
            height={100}
            alt={"logo fleur"}
            className={menuStyles.flower}
          />
        </Link>
        <div
          className={menuStyles.flowerContainer}
          style={{ display: !isMobile ? "none" : "" }}
          onClick={() => {
            setHideMenu(true);
          }}
        >
          <Image
            src={"/assets/cross.png"}
            width={50}
            height={100}
            alt={"logo fleur"}
            className={menuStyles.flower}
          />
        </div>

        <div className={menuStyles.categoryContainer}>
          <div className={menuStyles.titleContainer}>
            <div
              /*  onClick={() => GenerateCollectionPage(shopSubCategories[0].name)} */
              style={removeLinkStyle}
              className={menuStyles.title}
              onClick={() => {
                displayShopCat();
                console.log(isMobile);
              }}
            >
              Boutique
            </div>
          </div>

          {shopSubCategories ? (
            <div
              className={menuStyles.shopSubCategoryContainer}
              style={props.shopSubCatStyle}
              ref={shopCategoryRef}
            >
              {shopSubCategories.map((data, i) => (
                <div
                  className={menuStyles.subcatContainer}
                  style={{ display: props.display }}
                >
                  <div
                    className={menuStyles.shopSubCategory}
                    /*onClick={() => props.onClick(i)}*/
                    onClick={() => {
                      GenerateCollectionPage(shopSubCategories[i].name);
                    }}
                    key={i}
                    style={{
                      fontFamily:
                        router.query.collection === shopSubCategories[i].name
                          ? "Authentic90"
                          : "Authentic60",
                    }}
                  >
                    {shopSubCategories[i].name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          <div className={menuStyles.titleContainer}>
            <Link
              href="/prestations"
              style={removeLinkStyle}
              className={menuStyles.title}
            >
              Prestations
            </Link>
          </div>
          <div className={menuStyles.titleContainer}>
            <div
              className={menuStyles.title}
              style={removeLinkStyle}
              /* href={"/acampa"}*/
              onClick={() => {
                displaySubCat();
              }}
            >
              À propos
            </div>
          </div>
        </div>
        <div
          className={menuStyles.shopSubCategoryContainer}
          ref={aboutCategoryRef}

          /* style={props.aboutSubCatStyle}*/
        >
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/acampa"
              style={{
                ...removeLinkStyle,
                fontFamily:
                  router.asPath === "/acampa" ? "Authentic90" : "Authentic60",
              }}
              className={menuStyles.shopSubCategory}
            >
              Acampà
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/actu"
              className={menuStyles.shopSubCategory}
              style={{
                ...removeLinkStyle,
                fontFamily:
                  router.asPath === "/actu" ? "Authentic90" : "Authentic60",
              }}
            >
              Actu
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/mentions"
              className={menuStyles.shopSubCategory}
              style={
                router.asPath === "/mentions"
                  ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                  : { ...removeLinkStyle, fontFamily: "Authentic60" }
              }
            >
              Mentions légales
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/contact"
              style={
                router.asPath === "/contact"
                  ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                  : { ...removeLinkStyle, fontFamily: "Authentic60" }
              }
              className={menuStyles.shopSubCategory}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className={menuStyles.cartContainer} onClick={props.clickCart}>
          <div className={menuStyles.tiret}>_</div>
          <div className={menuStyles.panierContainer}>
            <Pic2
              src={"/assets/panier.png"}
              width={100}
              height={100}
              alt={"votre panier"}
              style={{ cursor: "pointer" }}
            />
          </div>
          {basketValue.length > 0 && [
            <div className={menuStyles.basketCircleContainer}>
              <div className={menuStyles.basketCircle}>
                {basketValue.length}
              </div>
            </div>,
          ]}
        </div>
      </div>
    </>
  ) : (
    // VERSION MOBILE ///

    <div className={menuStyles.mobileMenuContainer}>
      <div className={menuStyles.mobileListContainer} style={menuPosition}>
        <div
          className={menuStyles.mobileCrossContainer}
          onClick={() => {
            setHideMenu(!hideMenu);
          }}
        >
          <Pic2
            src={"/assets/cross.png"}
            width={100}
            height={100}
            alt={"logo fleur"}
            className={menuStyles.flower}
          />
        </div>
        <div className={menuStyles.categoryContainer}>
          <div className={menuStyles.titleContainer}>
            <div
              /*  onClick={() => GenerateCollectionPage(shopSubCategories[0].name)} */
              style={removeLinkStyle}
              className={menuStyles.title}
              onClick={() => {
                displayShopCat();
                console.log(isMobile);
              }}
            >
              Boutique
            </div>
          </div>

          {shopSubCategories ? (
            <div
              className={menuStyles.shopSubCategoryContainer}
              style={props.shopSubCatStyle}
              ref={shopCategoryRef}
            >
              {shopSubCategories.map((data, i) => (
                <div
                  className={menuStyles.subcatContainer}
                  style={{ display: props.display }}
                >
                  <div
                    className={menuStyles.shopSubCategory}
                    /*onClick={() => props.onClick(i)}*/
                    onClick={() => {
                      GenerateCollectionPage(shopSubCategories[i].name);
                      setHideMenu(!hideMenu);
                      console.log("yes");
                    }}
                    key={i}
                    style={{
                      fontFamily:
                        router.query.collection === shopSubCategories[i].name
                          ? "Authentic90"
                          : "Authentic60",
                    }}
                  >
                    {shopSubCategories[i].name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}

          <div className={menuStyles.titleContainer}>
            <Link
              href="/prestations"
              style={removeLinkStyle}
              className={menuStyles.title}
            >
              Prestations
            </Link>
          </div>
          <div className={menuStyles.titleContainer}>
            <div
              className={menuStyles.title}
              style={removeLinkStyle}
              /* href={"/acampa"}*/
              onClick={() => {
                displaySubCat();
              }}
            >
              À propos
            </div>
          </div>
        </div>
        <div
          className={menuStyles.shopSubCategoryContainer}
          ref={aboutCategoryRef}

          /* style={props.aboutSubCatStyle}*/
        >
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/acampa"
              style={{
                ...removeLinkStyle,
                fontFamily:
                  router.asPath === "/acampa" ? "Authentic90" : "Authentic60",
              }}
              className={menuStyles.shopSubCategory}
            >
              Acampà
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/actu"
              className={menuStyles.shopSubCategory}
              style={{
                ...removeLinkStyle,
                fontFamily:
                  router.asPath === "/actu" ? "Authentic90" : "Authentic60",
              }}
            >
              Actu
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/mentions"
              className={menuStyles.shopSubCategory}
              style={
                router.asPath === "/mentions"
                  ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                  : { ...removeLinkStyle, fontFamily: "Authentic60" }
              }
            >
              Mentions légales
            </Link>
          </div>
          <div className={menuStyles.subcatContainer}>
            <Link
              href="/contact"
              style={
                router.asPath === "/contact"
                  ? { ...removeLinkStyle, fontFamily: "Authentic90" }
                  : { ...removeLinkStyle, fontFamily: "Authentic60" }
              }
              className={menuStyles.shopSubCategory}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className={menuStyles.mobileburgerContainer}>
        <Pic2
          src={"/assets/burgerMenu.png"}
          width={100}
          height={100}
          alt={"menu"}
          onClick={() => {
            setHideMenu(!hideMenu);
          }}
        />
      </div>
      <Link href="/" className={menuStyles.mobileFlowerContainer}>
        <Pic
          src={"/assets/Logo-fleur.png"}
          width={50}
          height={100}
          alt={"logo fleur"}
          className={menuStyles.flower}
          style={{ visibility: props.flowerStyle }}
        />
      </Link>
      <div>
        <div className={menuStyles.mobileIconContainer}>
          <div className={menuStyles.mobilePanier} onClick={props.clickCart}>
            <Pic2
              src={"/assets/panier.png"}
              width={100}
              height={100}
              alt={"votre panier"}
            />
            {basketValue.length > 0 && [
              <div className={menuStyles.basketCircleContainer}>
                <div className={menuStyles.basketCircle}>
                  {basketValue.length}
                </div>
              </div>,
            ]}
          </div>
          <Link
            className={menuStyles.mobileInsta}
            href="https://www.instagram.com/acampastudio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Pic2
              src={"/assets/insta.png"}
              width={100}
              height={100}
              alt={"lien Acampa Instagram"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
