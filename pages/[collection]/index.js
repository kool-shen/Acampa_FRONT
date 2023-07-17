import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";

import Pic2 from "@/components/Pic2";
import styles from "@/styles/Shop.module.css";
import Head from "next/head";

export default function index() {
  const router = useRouter();

  const { collection } = router.query;

  const GenerateProductPage = (productName) => {
    router.push(`/${collection}/${productName}`);
  };

  /// fetch DATA / fetch sous catégories shop & useEffect ///

  const [indexCategories, setIndexCategories] = useState([]);

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        `https://acampa-back.vercel.app/cloudinary/folders`
        // "http://localhost:3000/cloudinary/folders"
      );
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setIndexCategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (collection) {
          const response = await fetch(
            //`http://localhost:3000/cloudinary/collection?collection=${collection}`
            `https://acampa-back.vercel.app/cloudinary/collection?collection=${collection}`
          );
          const jsonData = await response.json();

          if (jsonData && jsonData.length > 0) {
            const srcArray = jsonData.map(({ src }) => src);
            setData(jsonData);
            setPhoto(srcArray);
            console.log(jsonData);
          }
        }
      } catch (error) {
        console.error(error);
      }
      loadSubCategories();
    };

    fetchData();
    console.log(window.innerWidth);
  }, [collection]);

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

  /// Twin photo ///

  return (
    <>
      <Head>
        <title> {`Acampa - ${collection}`}</title>
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="yo" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
            indexCategories={indexCategories}
            aboutSubCatStyle={{ display: "none" }}
          />
        </div>
        <div className={styles.photoContainer}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <div
                key={item.key}
                className={styles.productContainer}
                onClick={() => {
                  if (item.price) {
                    setCartClicked(false);
                    setMessageClicked(false);
                    messageIsFalse();
                  } else {
                    null;
                  }
                }}
              >
                <div
                  className={styles.twinPicContainer}
                  style={
                    !item.price
                      ? {
                          cursor: "auto",
                        }
                      : {
                          cursor: "pointer",
                        }
                  }
                >
                  <Pic2
                    onClick={() => {
                      GenerateProductPage(item.name);
                    }}
                    src={item.twin ? item.twin : item.src}
                    width={item.width}
                    height={item.height}
                    alt={item.name}
                    className={styles.twinPhoto}
                    style={
                      !item.price
                        ? {
                            display: "none",
                          }
                        : ""
                    }
                  />
                </div>
                <div
                  className={styles.picContainer}
                  style={
                    !item.price
                      ? { opacity: "1", pointerEvents: "none", cursor: "auto" }
                      : {
                          cursor: "pointer",
                        }
                  }
                >
                  <Pic2
                    onClick={() => {
                      GenerateProductPage(item.name);
                    }}
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    alt={item.name}
                    style={
                      !item.price
                        ? {
                            opacity: "0.5",
                            pointerEvents: "none",
                            cursor: "auto",
                          }
                        : ""
                    }
                    className={styles.mainPhoto}
                  />
                </div>

                <div className={styles.productInfoContainer}>
                  {item.price ? (
                    <>
                      <div className={styles.productName}>
                        {item.name ? item.name.toUpperCase() : ""}
                      </div>
                      <div className={styles.productPrice}>
                        À partir de{" "}
                        {item.duree
                          ? item.price * 6 + 40
                          : item.vin
                          ? item.price + 15
                          : item.price}
                        ,00€
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.productName}>
                        {item.name ? item.name.toUpperCase() : ""}
                      </div>
                      <div className={styles.productPrice}>
                        (BIENTÔT DISPONIBLE)
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>{" "}
    </>
  );
}
