import React, { use } from "react";
import Cart from "./Cart";
import { useEffect, useState, useRef } from "react";
import styles from "@/styles/Shop.module.css";
import Link from "next/link";
import Pic from "./Pic";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../reducers/basket";
import { clickMessage } from "@/reducers/message";

export default function Shop() {
  //// FETCH / MOUNT ///
  const [allShop, setAllShop] = useState([]);
  const [shopClicked, setShopClicked] = useState([]);

  const [indexCategories, setIndexCategories] = useState([]);

  const loadImage = async () => {
    try {
      const response = await fetch("http://localhost:3000/cloudinary/shop");
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
      const response = await fetch("http://localhost:3000/cloudinary/folders");
      const indexlist = await response.json();

      if (indexlist.length > 0) {
        setIndexCategories(indexlist);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cartRef = useRef(null);

  /// Panier ///

  const [panier, setPanier] = useState({
    nom: "",
    photo: "",
    width: "",
    height: "",
    taille: "",
    variété: "",
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
      ].metadata.nom_du_produit.toUpperCase(),
      photo: shopClicked[selectedPhotoIndex].src,
      width: shopClicked[selectedPhotoIndex].width,
      height: shopClicked[selectedPhotoIndex].height,
      taille: shopClicked[selectedPhotoIndex].metadata.tailles[sizeIndex],
      variété: shopClicked[selectedPhotoIndex].metadata.Varietes[varietesIndex],
      quantité: quantity,
      prix: price,
      mot: " ",
      signature: " ",
    };
    setPanier(newPanier);
  };

  useEffect(() => {
    loadImage();
    loadSubCategories();

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

  /// texte qui apparait progressivement

  const timeline = gsap.timeline({
    defaults: { opacity: 1, duration: 1, ease: "power2" },
  });

  const shopRef = useRef(null);

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

  /// Compteurs

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

  /// Prix

  const [initialPrice, setInitialPrice] = useState();
  const price = initialPrice * quantity;

  const handlePrice = (amount) => {
    setInitialPrice(amount);
  };

  /// Virer le style du link ///

  const removeLinkStyle = {
    textDecoration: "none",
    color: "inherit",
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

      <div
        className={styles.basketContainer}
        onClick={() => {
          setCartClicked(true);
          console.log("olala");
        }}
      >
        <img className={styles.basket} src={"assets/basket_black.png"} />
      </div>
      {basketValue.length > 0 && [
        <div className={styles.basketCircleContainer}>
          <div className={styles.basketCircle}>{basketValue.length}</div>
        </div>,
      ]}

      <div
        className={styles.textContainer}
        onClick={() => {
          setCartClicked(false);
          setMessageClicked(false);
          messageIsFalse();
        }}
      >
        <div className={styles.menu}>
          <div className={styles.titleContainer}>
            <Link href="/" style={removeLinkStyle} className={styles.title}>
              Acampa
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>À propos</div>
          </div>
          <div className={styles.titleContainer}>
            <Link
              href="/prestations"
              style={removeLinkStyle}
              className={styles.title}
            >
              Prestations
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.titleBold}>Boutique</div>
          </div>
          <div className={styles.shopSubCategoryContainer}>
            {indexCategories.map((data, i) => (
              <div
                className={styles.shopSubCategory}
                style={
                  clickedText === i
                    ? { fontFamily: "Authentic130" }
                    : { fontFamily: "Authentic90" }
                }
                onClick={() => {
                  setIsClicked(false);
                  clearValues();
                  clickAlbum(i);
                }}
              >
                {indexCategories[i].name}
              </div>
            ))}
          </div>
        </div>

        {isClicked && [
          ,
          <div
            className={styles.retourText}
            onClick={() => {
              setIsClicked(false);
              setCartClicked(false);
              clearValues();
              messageIsFalse();
            }}
          >
            &lt; RETOUR AU SHOP
          </div>,
        ]}
      </div>

      {isClicked ? (
        <div className={styles.photoContainer}>
          <div className={styles.focusContainer}>
            <div className={styles.picContainer}>
              <Pic
                src={shopClicked[selectedPhotoIndex].src}
                width={shopClicked[selectedPhotoIndex].width}
                height={shopClicked[selectedPhotoIndex].height}
                alt={shopClicked[selectedPhotoIndex].context.alt}
              />
            </div>
            <div className={styles.productInfoContainer}>
              <div className={styles.textProductContainer}>
                <div className={styles.productDescription}>
                  {shopClicked[
                    selectedPhotoIndex
                  ].metadata.nom_du_produit.toUpperCase()}
                </div>
                <div className={styles.productDescription}>
                  {shopClicked[selectedPhotoIndex].context.alt}
                </div>
                <div className={styles.productDescription}>_</div>
              </div>
              <div className={styles.numbersProductContainer}>
                <div className={styles.choiceContainer}>
                  <div className={styles.choiceText}>TAILLE</div>
                  <div className={styles.symbol} onClick={previousSize}>
                    &lt;
                  </div>
                  <div className={styles.valueContainer}>
                    <div className={styles.textPrice}>
                      {
                        shopClicked[selectedPhotoIndex].metadata.tailles[
                          sizeIndex
                        ]
                      }
                    </div>
                  </div>
                  <div className={styles.symbol} onClick={nextSize}>
                    &gt;
                  </div>
                </div>
                <div className={styles.choiceContainer}>
                  <div className={styles.choiceText}>VARIÉTÉS</div>
                  <div className={styles.symbol} onClick={previousVarietes}>
                    &lt;
                  </div>
                  <div className={styles.valueContainer}>
                    <div className={styles.textPrice}>
                      {
                        shopClicked[selectedPhotoIndex].metadata.Varietes[
                          varietesIndex
                        ]
                      }
                    </div>
                  </div>
                  <div className={styles.symbol} onClick={nextVarietes}>
                    &gt;
                  </div>
                </div>
                <div className={styles.choiceContainer}>
                  <div className={styles.choiceText}>QUANTITÉ</div>
                  <div className={styles.symbol} onClick={removeQuantity}>
                    -
                  </div>
                  <div className={styles.valueContainer}>
                    <div className={styles.textPrice}>{quantity}</div>
                  </div>
                  <div className={styles.symbol} onClick={addQuantity}>
                    +
                  </div>
                </div>
                <div className={styles.choiceContainer}>
                  <div className={styles.choiceText}>PRIX</div>
                  <div className={styles.textPrice}>{`${price},00€`}</div>
                </div>
              </div>
              <div className={styles.panierText} onClick={firstCart}>
                AJOUTER AU PANIER +
              </div>
            </div>
          </div>
        </div>
      ) : (
        shopClicked.map((data, i) => (
          <div
            className={styles.galleryContainer}
            onClick={() => {
              setCartClicked(false);
              setMessageClicked(false);
              messageIsFalse();
            }}
          >
            <div
              key={i}
              className={styles.productContainer}
              onClick={() => {
                setSelectedPhotoIndex(i);
                setVarietesLength(shopClicked[i].metadata.Varietes.length);
                setSizeLength(shopClicked[i].metadata.tailles.length);
                handlePrice(shopClicked[i].metadata.prix);
              }}
            >
              <div className={styles.picContainer}>
                <Pic
                  onClick={() => {
                    handleIsClicked();
                  }}
                  src={shopClicked[i].src}
                  width={shopClicked[i].width}
                  height={shopClicked[i].height}
                  alt={shopClicked[i].context.alt}
                />
              </div>
              <div className={styles.productInfoContainer}>
                <div className={styles.productName}>
                  {shopClicked[i].metadata.nom_du_produit.toUpperCase()}
                </div>
                <div className={styles.productPrice}>
                  {`À partir de ${shopClicked[i].metadata.prix},00€`}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
