import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import Pic from "./Pic";
import { useDispatch, useSelector } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Message from "./Message";
import { clickDelivery } from "@/reducers/delivery";

import { removeFromBasket, addToBasket } from "../reducers/basket";
import Delivery from "./Delivery";

function Cart(props) {
  // Contenu du panier //
  const basketValue = useSelector((state) => state.basket.value);

  // État clicked du message //
  const messageIsClicked = useSelector((state) => state.message.value);

  // État clicked de la livraison //
  const deliveryIsClicked = useSelector((state) => state.delivery.value);

  // changer l'état clicked du message //

  const messageIsTrue = () => {
    dispatch(clickMessage(true));
  };

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  const reverseMessage = () => {
    dispatch(clickMessage(!messageIsClicked));
  };

  // Mot produit //
  const word = basketValue.length === 1 ? "produit" : "produits";

  // supprimer un article

  const dispatch = useDispatch();

  const removeBasket = (index) => {
    dispatch(removeFromBasket(index));
  };

  // Rediriger l'utilisateur vers la page de paiement Stripe

  const checkout = async () => {
    if (!basketValue) {
      return;
    }

    const response = await fetch(
      "http://localhost:3000/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basketValue),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  /// Usestate pour exporter l'index du produit pour le message ///

  const [productIndex, setProductIndex] = useState();
  const [productMessage, setProductMessage] = useState();
  /* basketValue[productIndex].mot*/

  /// Livraison / click & collect ///

  const [collectChecked, setCollectChecked] = useState(true);

  const deliveryTrue = () => {
    dispatch(clickDelivery(true));
  };

  const unclickDelivery = () => {
    dispatch(clickDelivery(false));
  };

  const handleCollectCheck = () => {
    if (!collectChecked) {
      setCollectChecked(true);
      unclickDelivery();
    } else {
      setCollectChecked(false);
      deliveryTrue();
    }
  };

  const handleDeliveryCheck = () => {
    if (!deliveryIsClicked) {
      deliveryTrue();
      setCollectChecked(false);
    } else {
      unclickDelivery();
      setCollectChecked(true);
    }
  };

  const deliveryPrice = deliveryIsClicked ? 8 : 0;

  const displayDelivery = deliveryIsClicked
    ? { transform: "translateX(-50vw)", transition: "transform 1s" }
    : {
        transform: "translateX(-50vw)",
        transition: "transform 1s",
        display: "none",
      };

  const totalPrice =
    basketValue.reduce((acc, item) => acc + item.prix, 0) + deliveryPrice;

  return (
    <div
      className={styles.globalContainer}
      style={props.style}
      isClicked={props.isClicked}
      ref={props.ref}
    >
      <Delivery style={displayDelivery} />
      <Message productindex={productIndex} productmessage={productMessage} />

      {basketValue.length === 0 ? (
        <div className={styles.sumUpContainer}>
          <div className={styles.text}>
            Il n'y a (encore) rien dans votre panier
          </div>
          <div className={styles.symbolContainer} onClick={props.onClick}>
            <img className={styles.cross} src={"assets/x-mark.png"} />
          </div>
        </div>
      ) : (
        [
          <div className={styles.sumUpContainer}>
            <div className={styles.text}>
              Votre panier - {`${basketValue.length}`} {word}
            </div>

            <div className={styles.symbolContainer} onClick={props.onClick}>
              <img className={styles.cross} src={"assets/x-mark.png"} />
            </div>
          </div>,
          <div className={styles.totalPayContainer}>
            <div className={styles.deliveryContainer}>
              <div className={styles.switchContainer}>
                <div className={styles.tinyText} style={{ paddingLeft: "1vw" }}>
                  Click & collect
                </div>
                <div className={styles.toggleContainer}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={collectChecked}
                      onChange={handleCollectCheck}
                    />

                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
              <div className={styles.switchContainer}>
                <div className={styles.tinyText} style={{ paddingLeft: "1vw" }}>
                  Livraison (+8€)
                </div>
                <div className={styles.toggleContainer}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={deliveryIsClicked}
                      onChange={handleDeliveryCheck}
                    />

                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.text}>{`TOTAL : ${totalPrice},00€`}</div>
            </div>
            <div className={styles.text}>Passer au paiement</div>
          </div>,
          <div className={styles.productContainer} onClick={() => {}}>
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
                  {basketValue[i].mot === " " ? (
                    <div
                      className={styles.symbolContainer}
                      style={{ height: "25px" }}
                      onClick={() => {
                        messageIsTrue();
                        setProductMessage(basketValue[i].mot);
                        setProductIndex(i);
                      }}
                    >
                      <img
                        className={styles.symbol}
                        style={{ paddingLeft: "4px" }}
                        src={"assets/message.png"}
                      />
                      <div
                        className={styles.tinyText}
                        style={{
                          paddingLeft: "3px",
                          fontFamily: "Authentic130",
                        }}
                      >
                        Ajouter un petit mot
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={styles.tinyText}
                        style={{ fontFamily: "Authentic130" }}
                      >
                        Votre petit mot a été ajouté !
                      </div>
                      <div
                        className={styles.tinyText}
                        style={{ color: "grey" }}
                        onClick={() => {
                          messageIsTrue();
                          console.log(messageIsClicked);
                          setProductIndex(i);
                        }}
                      >
                        Modifier
                      </div>
                    </div>
                  )}

                  <div
                    className={styles.symbolContainer}
                    onClick={() => {
                      removeBasket(i);
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
          </div>,
        ]
      )}
    </div>
  );
}

export default Cart;
