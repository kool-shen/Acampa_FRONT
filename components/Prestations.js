import React, { useState, useEffect } from "react";
import Pic from "./Pic";
import styles from "../styles/Prestations.module.css";
import Menu from "./Menu";
import Cart from "./Cart";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";

export default function Prestations() {
  /// Contenu texte ///

  const [textContent, setTextContent] = useState([]);

  // Load sous catégories

  const [prestaSubCategories, setPrestaSubCategories] = useState([]);

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/indexPresta"
      );
      const indexlist = await response.json();

      setPrestaSubCategories(indexlist);
    } catch (error) {
      console.error(error);
    }
  };

  /// Charger le content ///

  const loadContent = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/prestations"
      );
      const content = await response.json();

      setTextContent(content);
    } catch (error) {
      console.error(error);
    }
  };

  /// CART ///

  const [cartClicked, setCartClicked] = useState(false);

  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  /// Use<Effect au Mount

  useEffect(() => {
    loadSubCategories();
    setClickedText(0);

    loadContent();
  }, []);

  /// text bold au click + filtre la collection

  const [clickedText, setClickedText] = useState(0);

  /// Envoi du mail ///

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
      <div className={styles.menuContainer}>
        <Menu
          clickCart={() => {
            setCartClicked(true);
          }}
        />
      </div>

      {/* vérifie si les métadatas ont chargé */}
      {textContent[clickedText] && (
        <div className={styles.middleContainer}>
          <div className={styles.descriptionContainer}>
            <div className={styles.title}>
              {textContent[clickedText].metadata.nom_du_produit.toUpperCase()}
            </div>
            <p className={styles.text}>
              {textContent[clickedText].context.alt}
            </p>
          </div>
          <div className={styles.inputContainer}>
            <form className={styles.form}>
              <h3 className={styles.title}>
                Pour me faire part de vos envies !
              </h3>
              <input
                type="text"
                className={styles.normalInput}
                placeholder="PRÉNOM"
                name="user_firstName"
              />
              <input
                type="text"
                className={styles.normalInput}
                placeholder="NOM"
                name="user_lastName"
              />
              <input
                type="text"
                className={styles.normalInput}
                placeholder="MAIL"
                name="user_email"
              />
              <input
                type="text"
                className={styles.normalInput}
                placeholder="TÉLÉPHONE"
                name="user_phone"
              />

              <textarea
                className={styles.messageInput}
                placeholder="VOTRE MESSAGE"
                name="message"
              />
              <div>
                <input
                  type="submit"
                  value="Envoyer"
                  className={styles.sendButton}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* vérifie si les métadatas ont chargé */}
      {textContent[clickedText] && (
        <div className={styles.picContainer}>
          <Pic
            src={textContent[clickedText].src}
            width={textContent[clickedText].width}
            height={textContent[clickedText].height}
            alt={textContent[clickedText].collection}
          />
        </div>
      )}
    </div>
  );
}
