import React, { cache } from "react";
import Image from "next/image";
import styles from "@/styles/Mentions.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import Pic2 from "@/components/Pic";
import Pic from "@/components/Pic";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";

export default function mentions() {
  // FETCH //

  const [content, setContent] = useState();
  const [cacheTime, setCacheTime] = useState(0);

  const loadContent = async () => {
    const getCachedData = () => {
      const cachedData = localStorage.getItem("apiData");
      return cachedData ? JSON.parse(cachedData) : null;
    };

    try {
      const cachedData = getCachedData();
      if (cachedData !== null && cacheTime < Date.now() / 1000) {
        setContent(cachedData);
        console.log("cache");
      } else {
        const response = await fetch(
          "https://acampa-back.vercel.app/cloudinary/mentions"
        );
        const data = await response.json();

        if (data.length > 0) {
          console.log("backend", data);
          setContent(data);
          localStorage.setItem("apiData", JSON.stringify(data));
          setCacheTime(Date.now() / 1000 + 1200); // 20 minutes in seconds
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!content) {
      loadContent();
    }
  }, [content]);
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
          display={"none"}
          about={true}
        />
      </div>
      {content && (
        <>
          <div className={styles.middleContainer}>
            <div className={styles.titleContainer}>
              <div
                className={styles.text}
                onClick={() => {
                  console.log();
                }}
              >
                {content[0].ligne1}
              </div>
              <div className={styles.text2}>{content[0].ligne2}</div>
            </div>
            <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
              {content[0].context.alt}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
