import React from "react";
import styles from "../styles/Message.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { updateProductMot, updateProductSignature } from "@/reducers/basket";

export default function Message(props) {
  // changer l'état clicked du message //

  const messageIsTrue = () => {
    dispatch(clickMessage(true));
  };

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  //// Valider le message et la signature et l'ajouter aux infos du produit ////

  const dispatch = useDispatch();

  const validateMessage = () => {
    dispatch(
      updateProductMot({ productindex: props.productindex, mot: message })
    );
    dispatch(
      updateProductSignature({
        productindex: props.productindex,
        signature: signature,
      }),
      messageIsFalse()
    );
  };

  // contenu du produit //
  const basketValue = useSelector((state) => state.basket.value);

  // État clicked du message //
  const messageIsClicked = useSelector((state) => state.message.value);

  /// gérer le contenu du message et de la signature ///
  const [message, setMessage] = useState(props.productindex);
  const [signature, setSignature] = useState("");

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  useEffect(() => {
    calculateScreen();
  }, []);

  /// animation du message ///

  const displayMessage = messageIsClicked
    ? {
        transform: mobileScreen ? "translateX(0)" : "translateX(-50vw)",
        transition: "transform 1s",
      }
    : {
        transform: mobileScreen ? "translateX(101vw)" : "translateX(50vw)",
        transition: "transform 1s",
      };

  return (
    <div>
      {basketValue.length > 0 && (
        <div
          className={styles.messageContainer}
          style={displayMessage}
          productindex={props.productindex}
          productmessage={props.productmessage}
        >
          <div className={styles.messageTypeContainer}>
            <div className={styles.text}>Tapez ici votre petit mot :</div>
          </div>
          <div className={styles.textareaContainer}>
            <textarea
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className={styles.text}>Signé :</div>
            <textarea
              className={styles.signatureInput}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
          <div
            className={styles.text}
            onClick={validateMessage}
            style={{ alignSelf: "flex-end" }}
          >
            Valider
          </div>
        </div>
      )}
    </div>
  );
}
