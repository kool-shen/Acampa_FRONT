import React from "react";
import styles from "../styles/Delivery.module.css";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clientData, { sendClientData } from "@/reducers/clientData";
import { addToBasket, updateBasket } from "../reducers/basket";
import { clickDelivery } from "@/reducers/delivery";

import { gsap } from "gsap";

export default function Delivery(props) {
  // Reducer adresse client //

  const basketValue = useSelector((state) => state.basket.value);
  const dispatch = useDispatch();

  /// Choix Sud / Nord / Autres ///

  const [sudChecked, setSudChecked] = useState(false);
  const [nordChecked, setNordChecked] = useState(false);
  const [outChecked, setOutChecked] = useState(false);

  const handleSudCheck = () => {
    setArea("Sud");

    if (!sudChecked) {
      setSudChecked(true);
      if (nordChecked) setNordChecked(false);
      if (outChecked) setOutChecked(false);
    }
  };

  const handleNorthCheck = () => {
    setArea("Nord");
    if (!nordChecked) {
      setNordChecked(true);
      if (sudChecked) setSudChecked(false);
      if (outChecked) setOutChecked(false);
    }
  };

  const handleOutCheck = () => {
    setArea("Autre");
    if (!outChecked) {
      setOutChecked(true);
      if (sudChecked) setSudChecked(false);
      if (nordChecked) setNordChecked(false);
    }
  };

  /// Bouton OK (récupérer les infos input et fermer la fenêtre) ///

  const [area, setArea] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [address, setAddress] = useState("");
  const [ZIPCode, setZIPCode] = useState("");

  const getClientData = () => {
    /// envoyer les infos ///
    const clientData = {
      prenom,
      nom,
      address,
      ZIPCode,
      area,
    };
    dispatch(sendClientData(clientData));
    handleConfirmationChange();
    addDeliveryPrice();
  };

  const deliveryPrice = area === "Sud" ? 10 : area === "Nord" ? 15 : 0;

  /// créer ou remplacer un produit livraison ///

  const addDeliveryPrice = () => {
    const deliveryAsProduct = {
      nom: "Livraison",
      photo: "/assets/Logo-fleur.png",
      height: 1351,
      width: 2377,
      quantité: 1,
      prix: deliveryPrice,
      mot: " ",
    };

    const indexToReplace = basketValue.findIndex(
      (obj) => obj.nom === "Livraison"
    );

    if (indexToReplace !== -1) {
      const updatedBasket = [...basketValue]; // Make a copy of the basketValue array
      updatedBasket[indexToReplace] = deliveryAsProduct; // Update the copy with the new delivery information
      dispatch(updateBasket(updatedBasket)); // Dispatch the updated copy
    } else {
      dispatch(addToBasket(deliveryAsProduct));
      console.log("à ajouter");
    }

    //// fermer la livraison
  };

  /// animation s'il manque un champs ////

  const missingValue =
    prenom === "" || nom === "" || address === "" || ZIPCode === "";

  const [toggle, setToggle] = useState(false);

  const okRef = useRef(null);
  const missingRef = useRef(null);

  const animation = () => {
    const timeline = gsap.timeline({
      defaults: { duration: 0.7, ease: "power3" },
    });

    timeline
      .to(okRef.current, { opacity: 0 })
      .to(missingRef.current, { opacity: 1, visibility: "visible" })

      .to(missingRef.current, { opacity: 0 })
      .to(okRef.current, { opacity: 1 })
      .to(missingRef.current, { visibility: "hidden" });
  };

  const handleAnimation = () => {
    setToggle(!toggle);
    animation();
  };

  /// style Focus ///

  const colorFill = {
    color: "black",
    transition: "1s",
  };

  ///

  const handleConfirmationChange = () => {
    props.onConfirmationChange(!props.isConfirmed);
    console.log(props.isConfirmed);
  };

  return (
    <div
      className={styles.globalContainer}
      style={props.isConfirmed ? { display: "none" } : props.style}
    >
      <div
        className={styles.descriptionText}
        onClick={() => {
          console.log(missingRef.current);
        }}
      >
        Vous habitez :
      </div>
      <div className={styles.districtContainer}>
        <div className={styles.cityContainer}>
          <div className={styles.text} style={sudChecked ? colorFill : {}}>
            Marseille Sud (+10€)
          </div>
          <div className={styles.text} style={sudChecked ? colorFill : {}}>
            (1er/4e/5e/6e/7e/8e
          </div>
          <div className={styles.text} style={sudChecked ? colorFill : {}}>
            9e/10e/11e/12e)
          </div>
          <div className={styles.toggleContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={sudChecked}
                onChange={handleSudCheck}
              />

              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.cityContainer}>
          <div className={styles.text} style={nordChecked ? colorFill : {}}>
            Marseille Nord (+15€)
          </div>
          <div className={styles.text} style={nordChecked ? colorFill : {}}>
            (2e/3e/12e/13e
          </div>
          <div className={styles.text} style={nordChecked ? colorFill : {}}>
            /14e/15e/16e)
          </div>
          <div className={styles.toggleContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={nordChecked}
                onChange={handleNorthCheck}
              />

              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.cityContainer}>
          <div className={styles.text} style={outChecked ? colorFill : {}}>
            Autre
          </div>
          <div className={styles.toggleContainer}>
            <div className={styles.descriptionText} style={{ opacity: "0" }}>
              (coucou)
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={outChecked}
                onChange={handleOutCheck}
              />

              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {(sudChecked || nordChecked) && (
        <>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.signatureInput}
              placeholder={"Prénom"}
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            />

            <div className={styles.inputContainer}>
              <textarea
                className={styles.signatureInput}
                placeholder={"Nom"}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.addressInput}
                placeholder={"Adresse"}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.signatureInput}
                placeholder={"Code postal"}
                onChange={(e) => {
                  setZIPCode(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.validateContainer}>
            <div
              className={styles.validateText}
              onClick={() => {
                !missingValue ? getClientData() : handleAnimation();
              }}
              style={{ position: "relative" }}
              ref={okRef}
            >
              OK
            </div>
            <div
              className={styles.validateText}
              ref={missingRef}
              style={{
                opacity: "0",
                visibility: "hidden",
                position: "absolute",
              }}
            >
              Veillez à remplir tous les champs ;)
            </div>
          </div>
        </>
      )}

      {outChecked && (
        <>
          <div className={styles.textContainer}>
            <div className={styles.descriptionText}>
              Si vous voulez faire livrer hors de Marseille, veuillez me
              contacter directement :)
            </div>
          </div>
          <div className={styles.validateContainer}>
            <div
              className={styles.validateText}
              onClick={() => {
                handleConfirmationChange();
              }}
            >
              OK
            </div>
          </div>
        </>
      )}
    </div>
  );
}
