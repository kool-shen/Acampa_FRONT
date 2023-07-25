import React from "react";
import styles from "@/styles/Acampa.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";
import Pic2 from "@/components/Pic2";
import Panier from "@/components/Panier";

export default function acampa() {
  // FETCH //

  const [content, setContent] = useState();

  const loadContent = async () => {
    try {
      const response = await fetch(
        "https://acampa-back.vercel.app/cloudinary/acampa"
      );
      const data = await response.json();

      if (data.length > 0) {
        setContent(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  /// Config Panier ///

  const [cartClicked, setCartClicked] = useState(false);

  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  return (
    <div className={styles.mainContainer}>
      <Panier
        style={displayCart}
        isClicked={messageClicked}
        onClick={() => {
          setCartClicked(false);
          setMessageClicked(false);
          messageIsFalse();
        }}
      />

      <div className={styles.textContainer}>
        <Menu
          clickCart={() => {
            setCartClicked(true);
          }}
          display={"block"}
          about={true}
        />
      </div>
      {content && (
        <>
          <div className={styles.middleContainer}>
            <div className={styles.text}>{content[0].ligne1}</div>
            <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
              {content[0].context.alt}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.photoAreaContainer}>
              <Pic2
                src={content[0].src}
                width={300}
                height={500}
                alt={content[0].collection}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
