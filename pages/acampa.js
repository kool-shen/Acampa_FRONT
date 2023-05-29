import React from "react";
import styles from "@/styles/Acampa.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";
import Pic from "@/components/Pic";

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
      <Cart
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
          shopSubCatStyle={{ display: "none" }}
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
          <div className={styles.photoAreaContainer}>
            <Pic
              src={content[0].src}
              width={content[0].width}
              height={content[0].height}
              alt={content[0].collection}
            />
          </div>
        </>
      )}
    </div>
  );
}
