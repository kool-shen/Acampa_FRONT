import React from "react";
import styles from "@/styles/Contact.module.css";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { useDispatch } from "react-redux";
import { clickMessage } from "@/reducers/message";
import { useState, useEffect } from "react";

export default function contact({ content }) {
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
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(
      "https://acampa-back.vercel.app/cloudinary/contact"
    );
    const data = await response.json();

    let content = null;
    if (data.length > 0) {
      content = data;
    }

    return {
      props: {
        content,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        content: null,
      },
    };
  }
}
