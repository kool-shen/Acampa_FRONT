import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import Pic2 from "@/components/Pic2";
import Pic from "@/components/Pic";
import styles from "@/styles/Shop.module.css";
import Head from "next/head";
import Panier from "@/components/Panier";

export default function index() {
  const router = useRouter();

  const { collection } = router.query;

  const GenerateProductPage = (productName) => {
    router.push(`/${collection}/${productName}`);
  };

  /// fetch DATA / fetch sous catégories shop & useEffect ///

  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      if (collection) {
        const response = await fetch(
          //`http://localhost:3000/cloudinary/collection?collection=${collection}`
          `https://acampa-back.vercel.app/cloudinary/collection?collection=${collection}`
        );
        const jsonData = await response.json();

        if (jsonData && jsonData.length > 0) {
          setData(jsonData);
          localStorage.setItem(
            `productData${collection}`,
            JSON.stringify(jsonData)
          );
          console.log("backend");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearCache = () => {
    // Clear the cache every 30 minutes
    localStorage.removeItem("presentationData");
    localStorage.removeItem("homepageData");
    localStorage.removeItem("subcategoriesData");
    console.log("cache cleared");
  };

  ////// MOBILE /////

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425
      ? (setMobileScreen(true), console.log("mobile"))
      : (setMobileScreen(false), console.log("not mobile"));
  };

  /// USEEFFECT LOAD API / CACHE ////

  useEffect(() => {
    calculateScreen();
    const productData = localStorage.getItem(`productData${collection}`);

    if (productData) {
      setData(JSON.parse(productData));
      console.log("cache");
    } else {
      fetchData();
    }

    const interval = setInterval(clearCache, 1800000);

    return () => {
      clearInterval(interval);
    };
  }, [collection]);

  /////////////////

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
        <title> {`${collection}`}</title>
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name={`Acampa - ${collection}`} content="IE=edge" />
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
                  {!mobileScreen && (
                    <div className={styles.twinPicContainer}>
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
                  )}
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
