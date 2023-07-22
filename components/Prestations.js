import React, { useState, useEffect } from "react";
import Pic from "./Pic";
import Pic2 from "./Pic2";
import styles from "../styles/Prestations.module.css";
import Menu from "./Menu";
import Cart from "./Cart";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";

export default function Prestations() {
  /// Contenu texte ///

  const [textContent, setTextContent] = useState([]);

  //// Slider ////

  const [photoIndex, setPhotoIndex] = useState(0);

  const [photoLength, setPhotoLength] = useState();

  function nextPhoto() {
    const isLastSlide = photoIndex === photoLength - 1;
    const newIndex = isLastSlide ? 0 : photoIndex + 1;
    setPhotoIndex(newIndex);
  }

  function previousPhoto() {
    const isFirstSlide = photoIndex === 0;
    const newIndex = isFirstSlide ? photoLength - 1 : photoIndex - 1;
    setPhotoIndex(newIndex);
  }

  /// Mobile ///

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  /// Charger le texte ///

  const [texte, setTexte] = useState();

  const loadPresentation = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/prestationsTexte"
        // "http://localhost:3000/cloudinary/prestationsTexte"
      );
      const resource = await response.json();

      if (resource.length > 0) {
        setTexte(resource);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /// Charger le content ///

  const loadContent = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/prestations"
        // "http://localhost:3000/cloudinary/prestations"
      );
      const content = await response.json();
      setTextContent(content);
      setPhotoLength(content.length);
    } catch (error) {
      console.error(error);
    }
  };

  let phrase = texte && texte[0].metadata.toUpperCase();

  const milieu = phrase?.lastIndexOf(" ", Math.floor(phrase.length / 2));
  const premierePartie = phrase?.substr(0, milieu);
  const secondePartie = phrase?.substr(milieu + 1);

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

  /// fade In

  const fadeIn = {
    opacity: "1",
    transition: "opacity 0.4s, transform 0.4s",
    visibility: "visible",
  };

  /// Use<Effect au Mount

  useEffect(() => {
    loadContent();
    loadPresentation();

    calculateScreen();
    const interval = setInterval(() => {}, 9000);

    return () => {
      clearInterval(interval);
    };
  }, [photoIndex]);

  /// Envoi du mail ///

  return mobileScreen ? (
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
          display={"none"}
        />
      </div>
      <div className={styles.secondContainer}>
        {texte && (
          <div className={styles.middleContainer}>
            <div className={styles.descriptionContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.text}>{premierePartie}</div>
                <div className={styles.text2}>{secondePartie}</div>
              </div>
              <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
                {texte[0].context}
              </div>
            </div>

            <form className={styles.form}>
              <h3 className={styles.text}>
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
                rows={10}
              />
            </form>
            <div className={styles.sendContainer}>
              <input
                type="submit"
                value="ENVOYER"
                className={styles.sendButton}
              />
            </div>
          </div>
        )}

        {textContent[0] && (
          <div className={styles.photoAreaContainer}>
            <div className={styles.picContainer}>
              <div className={styles.calque1}></div>
              <div className={styles.calque2}>
                <div
                  className={styles.previous}
                  onClick={() => {
                    previousPhoto();
                  }}
                ></div>
                <div
                  className={styles.next}
                  onClick={() => {
                    nextPhoto();
                  }}
                ></div>
              </div>
              <Pic2
                src={textContent[photoIndex].src}
                width={textContent[photoIndex].width}
                height={textContent[photoIndex].height}
                alt={textContent[photoIndex].collection}
                style={fadeIn}
                className={styles.test}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
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
          display={"none"}
        />
      </div>

      {texte && (
        <div className={styles.middleContainer}>
          <div className={styles.descriptionContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.text}>{premierePartie}</div>
              <div className={styles.text2}>{secondePartie}</div>
            </div>
            <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
              {texte[0].context}
            </div>
          </div>

          <form className={styles.form}>
            <h3 className={styles.text}>Pour me faire part de vos envies !</h3>
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
              rows={10}
            />
          </form>
          <div className={styles.sendContainer}>
            <input
              type="submit"
              value="ENVOYER"
              className={styles.sendButton}
            />
          </div>
        </div>
      )}

      {textContent[0] && (
        <div className={styles.photoAreaContainer}>
          <div className={styles.picContainer}>
            <div className={styles.calque1}></div>
            <div className={styles.calque2}>
              <div
                className={styles.previous}
                onClick={() => {
                  previousPhoto();
                }}
              ></div>
              <div
                className={styles.next}
                onClick={() => {
                  nextPhoto();
                }}
              ></div>
            </div>
            <Pic2
              src={textContent[photoIndex].src}
              width={textContent[photoIndex].width}
              height={textContent[photoIndex].height}
              alt={textContent[photoIndex].collection}
              style={fadeIn}
              className={styles.test}
            />
          </div>
        </div>
      )}
    </div>
  );
}
