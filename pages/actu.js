import React from "react";
import styles from "@/styles/Actu.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";
import Link from "next/link";
import Pic from "@/components/Pic";

export default function actu() {
  /// Charger le content ///

  const loadDescription = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/texteActu"
      );
      const content = await response.json();

      setDescriptionUp(content);
    } catch (error) {
      console.error(error);
    }
  };

  const loadproducts = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/produitsActu"
      );
      const content = await response.json();

      setProducts(content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDescription();
    loadproducts();
  }, []);

  /// produits partie inférieure ///

  const [products, setProducts] = useState();

  /// texte partie supérieure //

  const [descriptionUp, setDescriptionUp] = useState();

  let phrase = descriptionUp && descriptionUp[0].name.toUpperCase();

  const milieu = phrase?.lastIndexOf(" ", Math.floor(phrase.length / 2));
  const premierePartie = phrase?.substr(0, milieu);
  const secondePartie = phrase?.substr(milieu + 1);

  /// Config Panier ///

  const [cartClicked, setCartClicked] = useState(false);

  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div className={styles.mainContainer}>
      <Cart
        style={displayCart}
        isClicked={messageClicked}
        onClick={() => {
          setCartClicked(false);
          setMessageClicked(false);
          messageIsFalse();
        }}
      />
      <div className={styles.leftContainer}>
        <Menu
          clickCart={() => {
            setCartClicked(true);
          }}
          shopSubCatStyle={{ display: "none" }}
        />
      </div>
      <div className={styles.rightContainer}>
        {descriptionUp && (
          <div className={styles.infoContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.text}>{premierePartie}</div>
              <div className={styles.text2}>{secondePartie}</div>
            </div>
            <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
              {descriptionUp[0].context.alt}
            </div>
          </div>
        )}
        <div className={styles.newsContainer}>
          {products &&
            products.map((data, i) => (
              <Link
                href={(() => {
                  if (!products[i].ref && !products[i].link) {
                    return "";
                  } else if (products[i].link) {
                    return products[i].link;
                  } else {
                    return products[i].ref;
                  }
                })()}
                style={removeLinkStyle}
                className={styles.productContainer}
                target={products[i]?.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <div className={styles.productInfoContainer}>
                  <div className={styles.text}>{products[i].ligne1}</div>
                  <div className={styles.text}>{products[i].ligne2}</div>
                </div>
                <div className={styles.picContainer}>
                  <Pic
                    src={products[i].src}
                    width={products[i].width}
                    height={products[i].height}
                    alt={products[i].name}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
