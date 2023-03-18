import React from "react";
import styles from "../styles/Cart.module.css";
import Pic from "./Pic";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { useRef } from "react";
import { removeFromBasket } from "../reducers/basket";

function Cart(props) {
  // Contenu du panier //
  const basketValue = useSelector((state) => state.basket.value);

  // Mot produit //
  const word = basketValue.length === 1 ? "produit" : "produits";

  // supprimer un article

  const dispatch = useDispatch();

  const removeBasket = (index) => {
    dispatch(removeFromBasket(index));
  };

  return (
    <div className={styles.globalContainer} style={props.style} ref={props.ref}>
      {basketValue.length === 0 ? (
        <div className={styles.sumUpContainer}>
          <div className={styles.text}>
            Il n'y a (encore) rien dans votre panier
          </div>
          <div className={styles.symbolContainer} onClick={props.onClick}>
            <img className={styles.symbol} src={"assets/x-mark.png"} />
          </div>
        </div>
      ) : (
        [
          <div className={styles.sumUpContainer}>
            <div className={styles.text}>
              Votre panier - {`${basketValue.length}`} {word}
            </div>
            <div className={styles.symbolContainer} onClick={props.onClick}>
              <img className={styles.symbol} src={"assets/x-mark.png"} />
            </div>
          </div>,
          <div
            className={styles.productContainer}
            onClick={() => {
              console.log(basketValue);
            }}
          >
            {basketValue.map((data, i) => (
              <div className={styles.eachProductContainer}>
                <div className={styles.picContainer}>
                  <Pic
                    src={basketValue[i].photo}
                    width={basketValue[i].width}
                    height={basketValue[i].height}
                    alt={basketValue[i].nom}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.middleText}> {basketValue[i].nom}</div>
                  <div className={styles.tinyText}>
                    {`Quantité : ${basketValue[i].quantité}`}
                  </div>
                  <div className={styles.tinyText}>
                    {`Variété : ${basketValue[i].variété}`}
                  </div>
                  <div className={styles.tinyText}>
                    {`Taille : ${basketValue[i].taille}`}
                  </div>
                  <div
                    className={styles.symbolContainer}
                    onClick={() => {
                      removeBasket(i);
                      console.log(basketValue);
                    }}
                  >
                    <img className={styles.symbol} src={"assets/delete.png"} />
                    <div className={styles.tinyText}>Supprimer l'article</div>
                  </div>
                </div>
                <div
                  className={styles.text}
                >{`${basketValue[i].prix},00€`}</div>
              </div>
            ))}
            <div className={styles.text}>{`TOTAL : ${basketValue.reduce(
              (acc, item) => acc + item.prix,
              0
            )},00€`}</div>
          </div>,
        ]
      )}
    </div>
  );
}

export default Cart;
