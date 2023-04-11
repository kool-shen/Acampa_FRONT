import React, { useState, useEffect, useRef } from "react";
import Pic from "./Pic";
import styles from "../styles/Prestations.module.css";
import Link from "next/link";

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

  /// Use<Effect au Mount

  useEffect(() => {
    loadSubCategories();
    setClickedText(0);

    loadContent();
  }, []);

  /// text bold au click + filtre la collection

  const [clickedText, setClickedText] = useState(0);

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  /// Envoi du mail ///

  return (
    <div className={styles.mainContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <div className={styles.titleContainer}>
            <Link href="/" style={removeLinkStyle} className={styles.titleMenu}>
              Acampa
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.titleMenu}>À propos</div>
          </div>
          <div className={styles.titleContainer}>
            <Link
              href="/prestations"
              style={removeLinkStyle}
              className={styles.titleBold}
            >
              Prestations
            </Link>
          </div>
          <div className={styles.shopSubCategoryContainer}>
            {prestaSubCategories.map((data, i) => (
              <div
                className={styles.shopSubCategory}
                style={
                  clickedText === i
                    ? { fontFamily: "Authentic130" }
                    : { fontFamily: "Authentic90" }
                }
                onClick={() => {
                  setClickedText(i);
                  console.log(textContent[i].metadata.nom_du_produit);
                }}
              >
                {prestaSubCategories[i]}
              </div>
            ))}
          </div>
          <div className={styles.titleContainer}>
            <Link
              className={styles.titleMenu}
              href="/shop"
              style={removeLinkStyle}
            >
              Boutique
            </Link>
          </div>
        </div>
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
