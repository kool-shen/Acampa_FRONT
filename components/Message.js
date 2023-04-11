import React from "react";
import styles from "../styles/Message.module.css";
import { useState } from "react";
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
      updateProductMot({ productIndex: props.productIndex, mot: message })
    );
    dispatch(
      updateProductSignature({
        productIndex: props.productIndex,
        signature: signature,
      }),
      messageIsFalse()
    );
    console.log(basketValue);
  };

  // contenu du produit //
  const basketValue = useSelector((state) => state.basket.value);

  // État clicked du message //
  const messageIsClicked = useSelector((state) => state.message.value);

  /// gérer le contenu du message et de la signature ///
  const [message, setMessage] = useState(props.productIndex);
  const [signature, setSignature] = useState("");

  /// animation du message ///

  const displayMessage = messageIsClicked
    ? { transform: "translateX(-50vw)", transition: "transform 1s" }
    : { transform: "translate(-50vw, -50vh)", transition: "transform 1s" };

  return (
    <div>
      {basketValue.length > 0 && (
        <div
          className={styles.messageContainer}
          style={displayMessage}
          productIndex={props.productIndex}
          productMessage={props.productMessage}
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
