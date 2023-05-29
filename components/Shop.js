import React from "react";
import Cart from "./Cart";
import { useEffect, useState, useRef } from "react";
import styles from "@/styles/Shop.module.css";

import Pic from "./Pic";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../reducers/basket";
import { clickMessage } from "@/reducers/message";
import Menu from "./Menu";
import { getIndex } from "@/reducers/indexSubCat";

import { useRouter } from "next/router";

export default function Shop() {
  /// Générer page product ///

  const router = useRouter();

  /* const GenerateProductPage = (productName, collectionName) => {
    router.push(`/${collectionName}/${productName}`);
  };*/

  const GenerateProductPage = (productName, collectionName) => {
    router.push(`/${collectionName}/${productName}`);
  };

  //// FETCH / MOUNT ///
  const [allShop, setAllShop] = useState([]);
  const [shopClicked, setShopClicked] = useState([]);

  const [indexCategories, setIndexCategories] = useState([]);

  const loadImage = async () => {
    try {
      const response = await fetch("http://localhost:5000/cloudinary/shop");
      const resource = await response.json();

      if (resource.length > 0) {
        const firstShop = resource.filter(
          (item) => item.collection === resource[0].collection
        );

        /// set les collections du shop fleur qui s'affiche en premier et celles des shops clickés ensuite ///
        setShopClicked(firstShop);
        /// set la collection de tout le shop
        setAllShop(resource);
        setClickedText(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadSubCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/cloudinary/folders");
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setIndexCategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /// Panier ///

  const [panier, setPanier] = useState({
    nom: "",
    photo: "",
    width: "",
    height: "",
    taille: "",
    variété: "",
    couleur: "",
    quantité: "",
    prix: "",
    mot: "",
    signature: "",
  });

  const basketValue = useSelector((state) => state.basket.value);
  const dispatch = useDispatch();

  const sendBasket = (cart) => {
    dispatch(addToBasket(cart));
  };

  const firstCart = () => {
    const newPanier = {
      nom: shopClicked[
        selectedPhotoIndex
      ].metadata?.nom_du_produit.toUpperCase(),
      photo: shopClicked[selectedPhotoIndex].src,
      width: shopClicked[selectedPhotoIndex].width,
      height: shopClicked[selectedPhotoIndex].height,
      taille: shopClicked[selectedPhotoIndex]?.metadata?.tailles?.[sizeIndex],
      variété:
        shopClicked[selectedPhotoIndex]?.metadata?.Varietes?.[varietesIndex],
      couleur:
        shopClicked[selectedPhotoIndex]?.metadata?.couleur?.[couleurIndex],
      quantité: quantity,
      prix: price,
      mot: " ",
    };
    setPanier(newPanier);
  };

  useEffect(() => {
    loadImage();

    if (panier.nom !== "" || panier.taille !== "") {
      dispatch(addToBasket(panier));
    }
    /*timeline

      .to(shopRef.current.children[0], {})
      .to(shopRef.current.children[1], {}, "-=0.8")
      .to(shopRef.current.children[2], {}, "-=0.8")
      .to(shopRef.current.children[3], {}, "-=0.8");*/
  }, [panier, dispatch]);

  /// fonction IsClicked sur l'image pour faire apparaître le focus

  const [isClicked, setIsClicked] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState();

  const handleIsClicked = () => {
    setIsClicked(!isClicked);
  };

  /// text bold au click + filtre la collection

  const [clickedText, setClickedText] = useState();

  const clickAlbum = (indexCollection) => {
    setClickedText(indexCollection);
    const clickedCollection = allShop.filter(
      (item) => item.collection === indexCategories[indexCollection].name
    );
    setShopClicked(clickedCollection);
  };

  // FOCUS //

  /// Couleur

  const [couleurIndex, setCouleurIndex] = useState(0);

  const [couleurLength, setCouleurLength] = useState();

  function nextCouleur() {
    const isLastSlide = couleurIndex === couleurLength - 1;
    const newIndex = isLastSlide ? 0 : couleurIndex + 1;
    setCouleurIndex(newIndex);
  }

  function previousCouleur() {
    const isFirstSlide = couleurIndex === 0;
    const newIndex = isFirstSlide ? couleurLength - 1 : couleurIndex - 1;
    setCouleurIndex(newIndex);
  }
  /// Variété

  const [varietesIndex, setVarietesIndex] = useState(0);

  const [varietesLength, setVarietesLength] = useState();

  function nextVarietes() {
    const isLastSlide = varietesIndex === varietesLength - 1;
    const newIndex = isLastSlide ? 0 : varietesIndex + 1;
    setVarietesIndex(newIndex);
  }

  function previousVarietes() {
    const isFirstSlide = varietesIndex === 0;
    const newIndex = isFirstSlide ? varietesLength - 1 : varietesIndex - 1;
    setVarietesIndex(newIndex);
  }

  /// Taille

  const [sizeIndex, setSizeIndex] = useState(0);

  const [sizeLength, setSizeLength] = useState();

  function nextSize() {
    const isLastSlide = sizeIndex === sizeLength - 1;
    const newIndex = isLastSlide ? 0 : sizeIndex + 1;
    setSizeIndex(newIndex);
  }

  function previousSize() {
    const isFirstSlide = sizeIndex === 0;
    const newIndex = isFirstSlide ? sizeLength - 1 : sizeIndex - 1;
    setSizeIndex(newIndex);
  }

  /// Quantité

  const [quantity, setQuantity] = useState(1);

  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const clearValues = () => {
    setQuantity(1);
    setVarietesIndex(0);
    setSizeIndex(0);
  };

  //// Set de l'index des options ///

  const sendProductInfo = (e) => {
    const metadata = shopClicked[e].metadata;
    setVarietesLength(metadata?.Varietes?.length ?? 0);
    setCouleurLength(metadata?.couleur?.length ?? 0);
    setSizeLength(metadata?.tailles?.length ?? 0);
    setSelectedPhotoIndex(e);
    handlePrice(metadata?.prix);
  };

  /// Prix

  const [initialPrice, setInitialPrice] = useState();
  const price = initialPrice * quantity;

  const handlePrice = (amount) => {
    setInitialPrice(amount);
  };

  /// Animation cart ///

  const [cartClicked, setCartClicked] = useState(false);

  const [messageClicked, setMessageClicked] = useState(false);

  const displayCart = !cartClicked
    ? { transform: "translateX(0)", transition: "transform 1s" }
    : { transition: "transform 1s" };

  /// Message ///

  // changer l'état clicked du message //

  const messageIsFalse = () => {
    dispatch(clickMessage(false));
  };

  /// donne l'index de la catégorie cliquée

  // index de la subCategory //
  const sendIndex = (i) => {
    dispatch(getIndex(i));
  };
  const indexSubCat = useSelector((state) => state.indexSubCat.value);

  const handleItemClick = (i) => {
    setIsClicked(false);
    clearValues();
    clickAlbum(i);
    sendIndex(i);
    console.log(clickedText, indexSubCat);
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
          indexCategories={indexCategories}
          onClick={handleItemClick}
        />
      </div>
      <div className={styles.galleryContainer}>
        {/* */}
        {isClicked ? (
          <div className={styles.focusContainer}>
            <div className={styles.picContainer}>
              <Pic
                src={shopClicked[selectedPhotoIndex].src}
                width={shopClicked[selectedPhotoIndex].width}
                height={shopClicked[selectedPhotoIndex].height}
                alt={shopClicked[selectedPhotoIndex].context?.alt}
              />
            </div>
            <div className={styles.productFocusContainer}>
              <div className={styles.textProductContainer}>
                <div className={styles.productDescription}>
                  {shopClicked[
                    selectedPhotoIndex
                  ].metadata?.nom_du_produit?.toUpperCase()}
                </div>
                <div className={styles.productDescription}>
                  {shopClicked[selectedPhotoIndex].context?.alt}
                </div>
                <div className={styles.productDescription}>_</div>
              </div>
              <div className={styles.numbersProductContainer}>
                <div className={styles.choiceContainer}>
                  <div
                    className={styles.productDescription}
                  >{`${price},00€`}</div>
                </div>
                {shopClicked[selectedPhotoIndex].metadata?.tailles ? (
                  <div className={styles.propriétésContainer}>
                    <div className={styles.choiceContainer}>
                      <div className={styles.productDescription}>TAILLE</div>
                    </div>
                    <div className={styles.choiceContainer}>
                      <div
                        className={styles.productDescription}
                        onClick={previousSize}
                      >
                        &lt;
                      </div>
                      <div className={styles.valueContainer}>
                        <div className={styles.productDescription}>
                          {shopClicked[selectedPhotoIndex].metadata?.tailles[
                            sizeIndex
                          ].toUpperCase()}
                        </div>
                      </div>
                      <div
                        className={styles.productDescription}
                        onClick={nextSize}
                      >
                        &gt;
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {shopClicked[selectedPhotoIndex].metadata?.couleur ? (
                  <div className={styles.propriétésContainer}>
                    <div className={styles.choiceContainer}>
                      <div className={styles.productDescription}>COULEUR</div>
                      <div
                        className={styles.productDescription}
                        onClick={previousCouleur}
                      >
                        &lt;
                      </div>
                      <div className={styles.valueContainer}>
                        <div className={styles.productDescription}>
                          {
                            shopClicked[selectedPhotoIndex].metadata?.couleur[
                              couleurIndex
                            ]
                          }
                        </div>
                      </div>
                      <div
                        className={styles.productDescription}
                        onClick={nextCouleur}
                      >
                        &gt;
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {shopClicked[selectedPhotoIndex].metadata?.Varietes ? (
                  <div className={styles.propriétésContainer}>
                    <div className={styles.choiceContainer}>
                      <div className={styles.productDescription}>VARIÉTÉ</div>
                    </div>
                    <div className={styles.choiceContainer}>
                      <div className={styles.symbol} onClick={previousVarietes}>
                        &lt;
                      </div>
                      <div className={styles.valueContainer}>
                        <div className={styles.productDescription}>
                          {
                            shopClicked[selectedPhotoIndex].metadata?.Varietes[
                              varietesIndex
                            ]
                          }
                        </div>
                      </div>
                      <div className={styles.symbol} onClick={nextVarietes}>
                        &gt;
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.panierContainer}>
                <div className={styles.quantityContainer}>
                  <div
                    className={styles.productDescription}
                    onClick={removeQuantity}
                  >
                    -
                  </div>
                  <div className={styles.valueContainer}>
                    <div className={styles.productDescription}>{quantity}</div>
                  </div>
                  <div
                    className={styles.productDescription}
                    onClick={addQuantity}
                  >
                    +
                  </div>
                </div>
                <div
                  className={styles.panierText}
                  onClick={() => {
                    firstCart();
                  }}
                >
                  AJOUTER AU PANIER +
                </div>
              </div>
            </div>
          </div>
        ) : (
          shopClicked.map((data, i) => (
            <div
              key={i}
              className={styles.productContainer}
              onClick={() =>
                shopClicked[i].metadata?.prix
                  ? (setCartClicked(false),
                    setMessageClicked(false),
                    messageIsFalse(),
                    sendProductInfo(i))
                  : console.log(shopClicked[i].metadata?.prix)
              }
            >
              <div className={styles.picContainer}>
                <Pic
                  onClick={() => {
                    GenerateProductPage(
                      shopClicked[i].metadata.nom_du_produit,
                      shopClicked[i].collection
                    );
                  }}
                  src={shopClicked[i].src}
                  width={shopClicked[i].width}
                  height={shopClicked[i].height}
                  alt={shopClicked[i].context?.alt}
                />
              </div>
              <div className={styles.productInfoContainer}>
                {shopClicked[i].metadata?.prix ? (
                  <>
                    <div className={styles.productName}>
                      {shopClicked[i].metadata?.nom_du_produit?.toUpperCase()}
                    </div>
                    <div className={styles.productPrice}>
                      À partir de {shopClicked[i].metadata?.prix},00€
                    </div>
                  </>
                ) : (
                  <div className={styles.productName}>BIENTÔT DISPO ;)</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
