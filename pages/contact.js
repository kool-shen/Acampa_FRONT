import React from "react";
import styles from "@/styles/Contact.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";
import Panier from "@/components/Panier";
import Head from "next/head";

export default function contact() {
  // Config Panier

  const [cartClicked, setCartClicked] = useState(false);
  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  const dispatch = useDispatch();

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  ///

  const [content, setContent] = useState();

  const loadContent = async () => {
    try {
      const response = await fetch(
        // "http://localhost:3000/cloudinary/contact"
        "https://acampa-back.vercel.app/cloudinary/contact"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setContent(indexlist);
        // Cache the API data
        localStorage.setItem("contactData", JSON.stringify(indexlist));
        console.log("backend");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const contactData = localStorage.getItem("contactData");

    if (contactData !== null) {
      setContent(JSON.parse(contactData));
      console.log("cache");
    } else {
      loadContent();
    }
  }, []);

  return (
    <>
      <Head>
        <title> {`Contacts`}</title>
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="Contacts" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
              <div
                className={styles.text}
                onClick={() => {
                  console.log(localStorage);
                }}
              >
                {content[0].ligne1}
              </div>
              <div className={styles.text} style={{ whiteSpace: "pre-line" }}>
                {content[0].context.alt}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
