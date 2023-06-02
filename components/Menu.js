import React from "react";
import { useState, useEffect } from "react";
import menuStyles from "@/styles/subMenu.module.css";
import { useSelector } from "react-redux";
import Pic from "./Pic";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function Menu(props) {
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
  }, []);

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  /*const shopSubCategory = props.indexCategories;*/

  //// Texte sélectionné en bold ///

  const indexSubCat = useSelector((state) => state.indexSubCat.value);

  return (
    <div className={menuStyles.menu}>
      <Link
        href="/"
        style={removeLinkStyle}
        className={menuStyles.flowerContainer}
      >
        <Pic
          src={"/assets/Logo-fleur.png"}
          width={72}
          height={127}
          alt={"logo fleur"}
        />
      </Link>
      <div className={menuStyles.categoryContainer}>
        <div className={menuStyles.titleContainer}>
          <div
            onClick={() => GenerateCollectionPage(shopSubCategories[0].name)}
            style={removeLinkStyle}
            className={menuStyles.title}
          >
            Boutique
          </div>
        </div>

        {shopSubCategories ? (
          <div
            className={menuStyles.shopSubCategoryContainer}
            style={props.shopSubCatStyle}
          >
            {shopSubCategories.map((data, i) => (
              <div
                className={menuStyles.shopSubCategory}
                /*onClick={() => props.onClick(i)}*/
                onClick={() => {
                  GenerateCollectionPage(shopSubCategories[i].name);
                }}
                key={i}
                style={
                  router.query.collection === shopSubCategories[i].name
                    ? { fontFamily: "Authentic90" }
                    : { fontFamily: "Authentic60" }
                }
              >
                {shopSubCategories[i].name}
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
          <Link
            className={menuStyles.title}
            style={removeLinkStyle}
            href={"/acampa"}
          >
            À propos
          </Link>
        </div>
      </div>
      <div
        className={menuStyles.shopSubCategoryContainer}
        style={props.aboutSubCatStyle}
      >
        <Link
          href="/acampa"
          style={
            router.asPath === "/acampa"
              ? { ...removeLinkStyle, fontFamily: "Authentic90" }
              : { ...removeLinkStyle, fontFamily: "Authentic60" }
          }
          className={menuStyles.shopSubCategory}
        >
          Acampà
        </Link>

        <Link
          href="/actu"
          className={menuStyles.shopSubCategory}
          style={
            router.asPath === "/actu"
              ? { ...removeLinkStyle, fontFamily: "Authentic90" }
              : { ...removeLinkStyle, fontFamily: "Authentic60" }
          }
        >
          Actu
        </Link>

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
      <div className={menuStyles.cartContainer} onClick={props.clickCart}>
        <div className={menuStyles.tiret}>_</div>

        <Pic
          src={"/assets/panier.png"}
          width={20}
          height={20}
          alt={"votre panier"}
          style={{ cursor: "pointer" }}
        />
        {basketValue.length > 0 && [
          <div className={menuStyles.basketCircleContainer}>
            <div className={menuStyles.basketCircle}>{basketValue.length}</div>
          </div>,
        ]}
      </div>
    </div>
  );
}
