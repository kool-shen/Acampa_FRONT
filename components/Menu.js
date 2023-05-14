import React from "react";
import menuStyles from "@/styles/subMenu.module.css";
import { useSelector } from "react-redux";
import Pic from "./Pic";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Menu(props) {
  // Contenu du panier //
  const basketValue = useSelector((state) => state.basket.value);

  const dispatch = useDispatch();

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  const shopSubCategory = props.indexCategories;

  ////

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

      <div className={menuStyles.titleContainer}>
        <Link
          href="/shop"
          style={removeLinkStyle}
          className={menuStyles.title}
          indexCategories={props.indexCategories}
        >
          Boutique
        </Link>
      </div>

      {shopSubCategory ? (
        <div className={menuStyles.shopSubCategoryContainer}>
          {shopSubCategory.map((data, i) => (
            <div
              className={menuStyles.shopSubCategory}
              onClick={() => props.onClick(i)}
              key={i}
              style={
                indexSubCat === i
                  ? { fontFamily: "Authentic90" }
                  : { fontFamily: "Authentic60" }
              }
            >
              {shopSubCategory[i].name}
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
        <div className={menuStyles.title}>À propos</div>
      </div>

      <div className={menuStyles.cartContainer} onClick={props.clickCart}>
        <div className={menuStyles.tiret}>_</div>
        <Pic
          src={"/assets/panier.png"}
          width={20}
          height={20}
          alt={"votre panier"}
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
