import React, { useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import Pic from "./Pic";
import Pic2 from "./Pic2";
import { useDispatch, useSelector } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Message from "./Message";
import { clickDelivery } from "@/reducers/delivery";
import { removeFromBasket, addToBasket } from "../reducers/basket";
import Delivery from "./Delivery";
import { loadStripe } from "@stripe/stripe-js";

function Cart(props) {
  // Contenu du panier //
  const basketValue = useSelector((state) => state.basket.value);

  // État clicked du message //
  const messageIsClicked = useSelector((state) => state.message.value);

  // État clicked de la livraison //
  const deliveryIsClicked = useSelector((state) => state.delivery.value);

  const clientAddress = useSelector((state) => state.clientData.value);

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  useEffect(() => {
    calculateScreen();
  }, []);

  // changer l'état clicked du message //

  const messageIsTrue = () => {
    dispatch(clickMessage(true));
  };

  // Mot produit //
  const word = basketValue.length === 1 ? "produit" : "produits";

  // supprimer un article

  const dispatch = useDispatch();

  const removeBasket = (index) => {
    dispatch(removeFromBasket(index));
  };

  // Rediriger l'utilisateur vers la page de paiement Stripe

  const publicKey =
    "pk_test_51Mp9BBJwtoKdOJ2AILLlVmmrDWumDU6uvht1nqYQFKCgFEyO7NBm7SEacSMuf32f1XV75jdiAjsvZmWSs705lM8c00ktKwtOt8";
  const stripePromise = loadStripe(publicKey);

  const checkout = async () => {
    if (!basketValue) {
      return;
    }

    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:3000/stripe//create-checkout-session",
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

  const displayDelivery = deliveryIsClicked
    ? {
        transform: mobileScreen ? "translate(5vw, 30vh)" : "translateX(-50vw)",
        transition: "transform 1s",
        // zindex: "399",
      }
    : {
        display: "none",
      };

  ///Calcul du prix final

  const deliveryPrice =
    clientAddress.area === "Sud" ? 10 : clientAddress.area === "Nord" ? 15 : 0;

  const totalPrice =
    basketValue.reduce((acc, item) => acc + item.prix, 0) + deliveryPrice;

  /// confirmation de l'adresse

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmationChange = (value) => {
    setIsConfirmed(value);
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.globalContainer}
        style={props.style}
        isClicked={props.isClicked}
        ref={props.ref}
      >
        {mobileScreen && deliveryIsClicked ? (
          <div className={styles.halo2}>
            <div className={styles.halo}>
              <Delivery
                style={displayDelivery}
                onConfirmationChange={handleConfirmationChange}
                isConfirmed={isConfirmed}
              />
            </div>
          </div>
        ) : (
          <Delivery
            style={displayDelivery}
            onConfirmationChange={handleConfirmationChange}
            isConfirmed={isConfirmed}
          />
        )}

        {mobileScreen && (
          <div className={styles.mobileMessageContainer}>
            <Message
              productindex={productIndex}
              productmessage={productMessage}
            />
          </div>
        )}

        {!mobileScreen && (
          <Message
            productindex={productIndex}
            productmessage={productMessage}
          />
        )}

        {basketValue.length === 0 ? (
          <div className={styles.sumUpContainer}>
            <div className={styles.text}>
              Il n'y a (encore) rien dans votre panier
            </div>
            <div className={styles.crossContainer} onClick={props.onClick}>
              <Pic2
                src={"/assets/cross.png"}
                width={100}
                height={100}
                alt={"cross"}
              />
            </div>
          </div>
        ) : (
          [
            <div className={styles.sumUpContainer}>
              <div className={styles.text}>
                Votre panier - {`${basketValue.length}`} {word}
              </div>

              <div
                className={styles.crossContainer}
                onClick={() => {
                  props.onClick();
                  unclickDelivery();
                }}
              >
                <Pic2
                  src={"/assets/cross.png"}
                  width={100}
                  height={100}
                  alt={"cross"}
                />
              </div>
            </div>,
            <div className={styles.totalPayContainer}>
              <div className={styles.deliveryContainer}>
                <div className={styles.switchContainer}>
                  <div
                    className={styles.tinyText}
                    style={{ paddingLeft: "1vw" }}
                  >
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
                  <div
                    className={styles.tinyText}
                    style={{ paddingLeft: "1vw" }}
                  >
                    Livraison
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
              <div className={styles.bottomRightContainer}>
                <div
                  className={styles.confirmationContainer}
                  style={{
                    visibility: !isConfirmed && "hidden",
                  }}
                >
                  <div
                    className={styles.confirmText}
                    style={{ color: "black" }}
                  >
                    Adresse ajoutée !
                  </div>

                  <div
                    className={styles.confirmText}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsConfirmed(false);
                      deliveryTrue();
                    }}
                  >
                    Modifier
                  </div>
                </div>
                <div
                  className={styles.text}
                  onClick={() => {
                    console.log(basketValue);
                    checkout();
                  }}
                >
                  Passer au paiement
                </div>
              </div>
            </div>,
            <div className={styles.productContainer} onClick={() => {}}>
              {basketValue.map((data, i) => (
                <div className={styles.eachProductContainer}>
                  <div className={styles.productInfoContainer}>
                    <div className={styles.picContainer}>
                      <Pic
                        style={{ cursor: "auto" }}
                        src={basketValue[i].photo}
                        width={basketValue[i].width}
                        height={basketValue[i].height}
                        alt={basketValue[i].nom}
                      />
                    </div>

                    <div className={styles.productInfo}>
                      <div className={styles.tinyText}>
                        {" "}
                        {basketValue[i].nom.toUpperCase()}
                      </div>
                      <div className={styles.tinyText}>
                        {`Quantité : ${basketValue[i].quantité}`}
                      </div>
                      {basketValue[i].variété && (
                        <div className={styles.tinyText}>
                          {`Variété : ${basketValue[i].variété}`}
                        </div>
                      )}

                      {basketValue[i].taille && (
                        <div className={styles.tinyText}>
                          {`Taille : ${basketValue[i].taille.toUpperCase()}`}
                        </div>
                      )}
                      {basketValue[i].couleur && (
                        <div className={styles.tinyText}>
                          {`Couleur : ${basketValue[i].couleur.toUpperCase()}`}
                        </div>
                      )}
                      {basketValue[i].vin && (
                        <div className={styles.tinyText}>
                          {`Vin choisi : ${basketValue[i].vin.toUpperCase()}`}
                        </div>
                      )}
                      {basketValue[i].durée && (
                        <div className={styles.tinyText}>
                          {`Durée de l'abonnement : ${basketValue[i].durée} mois`}
                        </div>
                      )}
                      {basketValue[0].dateDébut.includes(undefined) ? (
                        <div className={styles.tinyText}>
                          {`Date : ${basketValue[i].dateDébut}`}
                        </div>
                      ) : (
                        ""
                      )}
                      {basketValue[i].mot === " " ? (
                        <div
                          className={styles.symbolContainer}
                          onClick={() => {
                            messageIsTrue();
                            setProductMessage(basketValue[i].mot);
                            setProductIndex(i);
                            console.log(messageIsClicked);
                          }}
                        >
                          <div className={styles.iconContainer}>
                            <img
                              className={styles.symbol}
                              src={"/assets/message.png"}
                            />
                          </div>
                          <div
                            className={styles.tinyText}
                            style={{
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
                            className={styles.confirmText}
                            style={{ color: "grey", cursor: "pointer" }}
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
                        <div className={styles.iconContainer}>
                          <img
                            className={styles.symbol}
                            src={"/assets/delete.png"}
                          />
                        </div>
                        <div
                          className={styles.tinyText}
                          style={{ cursor: "pointer" }}
                        >
                          Supprimer l'article
                        </div>
                      </div>
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
    </div>
  );
}

export default Cart;
