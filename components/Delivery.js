import React from "react";
import styles from "../styles/Delivery.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendClientData } from "@/reducers/clientData";
import { clickDelivery } from "@/reducers/delivery";

export default function Delivery(props) {
  const clientInfo = useSelector((state) => state.clientData.value);
  // État clicked de la livraison //
  const deliveryIsClicked = useSelector((state) => state.delivery.value);
  const dispatch = useDispatch();

  /// Coches ///
  const [sudChecked, setSudChecked] = useState(false);
  const [nordChecked, setNordChecked] = useState(false);
  const [outChecked, setOutChecked] = useState(false);

  const handleSudCheck = () => {
    if (!sudChecked) {
      setSudChecked(true);
      if (nordChecked) setNordChecked(false);
      if (outChecked) setOutChecked(false);
    }
  };

  const handleNorthCheck = () => {
    if (!nordChecked) {
      setNordChecked(true);
      if (sudChecked) setSudChecked(false);
      if (outChecked) setOutChecked(false);
    }
  };

  const handleOutCheck = () => {
    if (!outChecked) {
      setOutChecked(true);
      if (sudChecked) setSudChecked(false);
      if (nordChecked) setNordChecked(false);
    }
  };

  /// Bouton OK (récupérer les infos input et fermer la fenêtre) ///

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
    };
    dispatch(sendClientData(clientData));
    dispatch(clickDelivery(false));
    console.log(deliveryIsClicked);
  };

  /// style Focus ///

  const colorFill = {
    color: "#ffe93f",
    transition: "1s",
  };

  return (
    <div className={styles.globalContainer} style={props.style}>
      <div className={styles.text}>Vous habitez :</div>
      <div className={styles.districtContainer}>
        <div className={styles.cityContainer}>
          <div className={styles.text} style={sudChecked ? colorFill : {}}>
            Marseille Sud
          </div>
          <div
            className={styles.descriptionText}
            style={sudChecked ? colorFill : {}}
          >
            (1er/4e/5e/6e/7e/8e/9e/10e/11e/12e)
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
            Marseille Nord
          </div>
          <div
            className={styles.descriptionText}
            style={nordChecked ? colorFill : {}}
          >
            (2e/3e/12e/13e/14e/15e/16e)
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
              onChange={(e) => setPrenom(e.target.value)}
            />

            <div className={styles.inputContainer}>
              <textarea
                className={styles.signatureInput}
                placeholder={"Nom"}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.addressInput}
                placeholder={"Adresse"}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.signatureInput}
                placeholder={"Code postal"}
                onChange={(e) => setZIPCode(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.validateContainer}>
            <div
              className={styles.validateText}
              onClick={() => {
                getClientData();
              }}
            >
              OK
            </div>
          </div>
        </>
      )}

      {outChecked && (
        <>
          <div className={styles.textContainer}>
            <div className={styles.text}>
              Si vous voulez faire livrer hors de Marseille, veuillez me
              contacter directement :)
            </div>
          </div>
          <div className={styles.validateContainer}>
            <div
              className={styles.validateText}
              onClick={() => {
                dispatch(clickDelivery(false));
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
