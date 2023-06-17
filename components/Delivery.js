import React from "react";
import styles from "../styles/Delivery.module.css";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendClientData } from "@/reducers/clientData";
import { gsap } from "gsap";

export default function Delivery(props) {
  // Reducer adresse client //
  const clientAddress = useSelector((state) => state.clientData.value);

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
    const clientData = {
      prenom,
      nom,
      address,
      ZIPCode,
      area,
    };
    dispatch(sendClientData(clientData));
    handleConfirmationChange();
  };

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

  /*useEffect(() => {
    animation();
  }, [toggle]);*/

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
                console.log(missingRef);
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
