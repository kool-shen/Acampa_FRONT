import React from "react";
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

  const displayShopCat = () => {
    setShopState(!shopState);
  };

  const displaySubCat = () => {
    setAboutState(!aboutState);
    console.log(aboutState);
  };

  const shopAnimation = () => {
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
  };

  const aboutAnimation = () => {
    aboutState
      ? Array.from(aboutCategoryRef.current?.children).forEach((child) =>
          subCatTimeline.to(child, { visibility: "visible", display: "block" })
        )
      : Array.from(aboutCategoryRef.current?.children).forEach((child) =>
          subCatTimeline.to(child, { visibility: "hidden", display: "none" })
        );
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
        "https://acampa-back.vercel.app/cloudinary/shopSubCategories"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setShopSubcategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadShopSubCategories();
    aboutAnimation();
    shopAnimation();
  }, [aboutState, shopState]);

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div className={menuStyles.menu}>
      <Link
        href="/"
        style={removeLinkStyle}
        className={menuStyles.flowerContainer}
      >
        <Image
          src={"/assets/Logo-fleur.png"}
          width={50}
          height={100}
          alt={"logo fleur"}
          className={menuStyles.flower}
        />
      </Link>
      <div className={menuStyles.categoryContainer}>
        <div className={menuStyles.titleContainer}>
          <div
            /*  onClick={() => GenerateCollectionPage(shopSubCategories[0].name)} */
            style={removeLinkStyle}
            className={menuStyles.title}
            onClick={() => {
              displayShopCat();
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
            width={50}
            height={50}
            alt={"votre panier"}
            style={{ cursor: "pointer" }}
          />
        </div>
        {basketValue.length > 0 && [
          <div className={menuStyles.basketCircleContainer}>
            <div className={menuStyles.basketCircle}>{basketValue.length}</div>
          </div>,
        ]}
      </div>
    </div>
  );
}
