import { useRouter } from "next/router";
import styles from "@/styles/Product.module.css";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { clickMessage } from "@/reducers/message";
import Pic2 from "@/components/Pic2";
import Cart from "@/components/Cart";
import Menu from "@/components/Menu";
import { addToBasket } from "../../reducers/basket";
import { GetStaticProps } from "next";

function productPage() {
  /// produit cliqué + création de l'url ///
  const router = useRouter();
  const { collection, product } = router.query;

  /// OPTIONS ET INDEX ///

  /// Vin ///

  const [vinIndex, setVinIndex] = useState(0);

  const [vinLength, setVinLength] = useState();

  function nextVin() {
    const isLastSlide = vinIndex === vinLength - 1;
    const newIndex = isLastSlide ? 0 : vinIndex + 1;
    setVinIndex(newIndex);
  }

  function previousVin() {
    const isFirstSlide = vinIndex === 0;
    const newIndex = isFirstSlide ? vinLength - 1 : vinIndex - 1;
    setVinIndex(newIndex);
  }

  /// abonnement ///

  const [dureeIndex, setDureeIndex] = useState(0);
  const [dureeLength, setDureeLength] = useState();
  function nextDuree() {
    const isLastSlide = dureeIndex === dureeLength - 1;
    const newIndex = isLastSlide ? 0 : dureeIndex + 1;
    setDureeIndex(newIndex);
  }

  function previousDuree() {
    const isFirstSlide = dureeIndex === 0;
    const newIndex = isFirstSlide ? dureeLength - 1 : dureeIndex - 1;
    setDureeIndex(newIndex);
  }

  const [jour, setJour] = useState();
  const [mois, setMois] = useState();
  const [année, setAnnée] = useState();
  /// Carte cadeau ///

  const [cadeauIndex, setCadeauIndex] = useState(0);
  const [cadeauLength, setCadeauLength] = useState();

  function nextCadeau() {
    const isLastSlide = cadeauIndex === cadeauLength - 1;
    const newIndex = isLastSlide ? 0 : cadeauIndex + 1;
    setCadeauIndex(newIndex);
  }

  function previousCadeau() {
    const isFirstSlide = cadeauIndex === 0;
    const newIndex = isFirstSlide ? cadeauLength - 1 : cadeauIndex - 1;
    setCadeauIndex(newIndex);
  }

  /// Couleur ///

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
  /// Variété ///

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

  /// Taille ///

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

  /// Quantité ///

  const [quantity, setQuantity] = useState(1);

  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  /// PRIX

  const [initialPrice, setInitialPrice] = useState();
  const [price, setPrice] = useState();

  function calculatePrice(index, montantIndex) {
    const sizePrice = index * 15;
    let vinPrice = 0;

    if (data[0]?.metadata?.vin && (vinIndex === 0 || vinIndex === 1)) {
      vinPrice = 15;
    } else if (data[0]?.metadata?.vin && vinIndex === 2) {
      vinPrice = 20;
    } else if (!vinIndex) {
      vinPrice = 0;
    }
    ///calcul du prix si carte cadeau ///
    const selectedMontant =
      montantIndex !== undefined
        ? data[0].metadata?.montant_carte_cadeau.map((str) => parseInt(str))[
            montantIndex
          ]
        : undefined;

    if (selectedMontant !== undefined) {
      return selectedMontant * quantity + sizePrice;
    } else {
      const livraison = 40 * (dureeIndex + 1);
      return data[0]?.metadata?.duree
        ? ////calcul du prix si abonnement ////
          (initialPrice + sizePrice) * 6 * quantity * (dureeIndex + 1) +
            livraison
        : /// calcul du prix du reste ////
          initialPrice * quantity + sizePrice + vinPrice;
    }
  }

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

  //// config Inputs ///

  const jourRef = useRef(null);
  const moisRef = useRef(null);
  const annéeRef = useRef(null);

  /// fetch DATA / fetch sous catégories shop & useEffect ///

  const [indexCategories, setIndexCategories] = useState([]);

  const loadSubCategories = async () => {
    try {
      const response = await fetch(
        //"http://localhost:3000/cloudinary/folders"
        "https://acampa-back.vercel.app/cloudinary/folders"
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

  ////// MOBILE /////

  const [mobileScreen, setMobileScreen] = useState();

  const calculateScreen = () => {
    window.innerWidth <= 425 ? setMobileScreen(true) : setMobileScreen(false);
  };

  /// FETCH DATA / CACHE ///

  const fetchData = async () => {
    try {
      if (collection && product) {
        const response = await fetch(
          // `http://localhost:3000/cloudinary/product?product=${product}`
          `https://acampa-back.vercel.app/cloudinary/product?product=${product}`
        );
        const jsonData = await response.json();

        if (jsonData) {
          setData(jsonData);
          setIndexes(jsonData);
          localStorage.setItem(
            `productData/${collection}/${product}`,
            JSON.stringify(jsonData)
          );
          console.log("backend");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setIndexes = (e) => {
    setSizeLength(e[0].metadata?.tailles?.length ?? 0);
    setCouleurLength(e[0].metadata?.couleur?.length ?? 0);
    setVarietesLength(e[0].metadata?.Varietes?.length ?? 0);
    setCadeauLength(e[0].metadata?.montant_carte_cadeau?.length ?? 0);
    setDureeLength(e[0].metadata?.duree?.length ?? 0);
    setVinLength(e[0].metadata?.vin?.length ?? 0);
    setInitialPrice(e[0].metadata?.prix);

    if (e[0].metadata?.montant_carte_cadeau) {
      const newPrice = calculatePrice(sizeIndex ? sizeIndex : 0, cadeauIndex);
      setPrice(newPrice);
    } else {
      const newPrice = calculatePrice(sizeIndex ? sizeIndex : 0);
      setPrice(newPrice);
    }
  };

  useEffect(() => {
    // const eachProductData = localStorage.getItem(
    //   `productData/${collection}/${product}`
    // );
    // if (eachProductData) {
    //   console.log(JSON.parse(eachProductData));
    //   setData(JSON.parse(eachProductData));
    //   setIndexes(JSON.parse(eachProductData));
    // } else {
    //   fetchData();
    // }
    fetchData();
    loadSubCategories();
    calculateScreen();
  }, [
    collection,
    product,
    initialPrice,
    sizeIndex,
    quantity,
    cadeauIndex,
    dureeIndex,
    vinIndex,
  ]);

  //// ahouter au panier ///

  const addProduct = () => {
    const newPanier = {
      nom: data[0].metadata?.nom_du_produit,
      photo: data[0].src,
      height: data[0].height,
      width: data[0].width,
      taille: data[0]?.metadata?.tailles?.[sizeIndex],
      variété: data[0]?.metadata?.Varietes?.[varietesIndex],
      couleur: data[0]?.metadata?.couleur?.[couleurIndex],
      quantité: quantity,
      montant_cadeau: data[0]?.metadata?.montant_carte_cadeau
        ? data[0]?.metadata?.montant_carte_cadeau[cadeauIndex]
        : "",

      prix: price,
      mot: " ",
      durée: data[0]?.metadata?.duree
        ? data[0]?.metadata?.duree[dureeIndex]
        : "",
      dateDébut: data[0]?.metadata?.duree ? `${jour}/${mois}/${année}` : "",
      vin: data[0]?.metadata?.vin ? data[0]?.metadata?.vin[vinIndex] : "",
    };
    dispatch(addToBasket(newPanier));
  };

  return (
    <>
      <Head>
        <title> {`Acampa - ${product}`}</title>
        <link rel="icon" href="/assets/Logo-icon.png" />
        <meta name="yo" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {data && (
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
            />
          </div>
          <div className={styles.galleryContainer}>
            <div className={styles.picContainer}>
              <Pic2
                src={data[0].src}
                width={data[0].width}
                height={data[0].height}
                alt={data[0].context?.alt}
                onClick={() => {
                  console.log(initialPrice, quantity, dureeIndex);
                }}
              />
            </div>
            <div className={styles.focusContainer}>
              <div className={styles.productFocusContainer}>
                <div className={styles.textProductContainer}>
                  {data[0].metadata?.nom_du_produit && (
                    <div className={styles.productDescription}>
                      {data[0].metadata?.nom_du_produit.toUpperCase()}
                    </div>
                  )}

                  <div
                    className={styles.productDescription}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {data[0].context?.alt}
                  </div>
                  <div className={styles.productDescription}>_</div>
                </div>
                <div className={styles.numbersProductContainer}>
                  {!data[0].metadata.tailles &&
                    !data[0].metadata.Varietes &&
                    !data[0].metadata.montant_carte_cadeau &&
                    !data[0].metadata.couleur && (
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>
                          PRIX UNIQUE
                        </div>
                      </div>
                    )}

                  <div className={styles.choiceContainer}>
                    <div
                      className={styles.productDescription}
                    >{`${price},00€`}</div>
                  </div>

                  {data[0].metadata?.tailles ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>TAILLE</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        {/* <div
                          className={styles.productDescription}
                          onClick={previousSize}
                        >
                          &lt;
                        </div> */}
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/left.png"}
                            width={100}
                            height={100}
                            alt={"choix précédent"}
                            onClick={previousSize}
                          />
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.tailles[sizeIndex].toUpperCase()}
                          </div>
                        </div>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/right.png"}
                            width={100}
                            height={100}
                            alt={"choix suivant"}
                            onClick={nextSize}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.couleur ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>COULEUR</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/left.png"}
                            width={100}
                            height={100}
                            alt={"choix précédent"}
                            onClick={previousCouleur}
                          />
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.couleur[couleurIndex]
                              .replace(/_/g, " ")
                              .toUpperCase()}
                          </div>
                        </div>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/right.png"}
                            width={100}
                            height={100}
                            alt={"choix suivant"}
                            onClick={nextCouleur}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.Varietes ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>VARIÉTÉ</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/left.png"}
                            width={100}
                            height={100}
                            alt={"choix précédent"}
                            onClick={previousVarietes}
                          />
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.Varietes[varietesIndex]
                              .replace(/_/g, " ")
                              .toUpperCase()}
                          </div>
                        </div>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/right.png"}
                            width={100}
                            height={100}
                            alt={"choix suivant"}
                            onClick={nextVarietes}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.vin ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>VIN</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/left.png"}
                            width={100}
                            height={100}
                            alt={"choix précédent"}
                            onClick={previousVin}
                          />
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {data[0].metadata?.vin[vinIndex]
                              .replace(/_/g, " ")
                              .toUpperCase()}
                          </div>
                        </div>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/right.png"}
                            width={100}
                            height={100}
                            alt={"choix suivant"}
                            onClick={() => {
                              nextVin();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.montant_carte_cadeau ? (
                    <div className={styles.propriétésContainer}>
                      <div className={styles.choiceContainer}>
                        <div className={styles.productDescription}>MONTANT</div>
                      </div>
                      <div className={styles.choiceContainer}>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/left.png"}
                            width={100}
                            height={100}
                            alt={"choix précédent"}
                            onClick={previousCadeau}
                          />
                        </div>
                        <div className={styles.valueContainer}>
                          <div className={styles.productDescription}>
                            {`${data[0].metadata?.montant_carte_cadeau[cadeauIndex]},00€`}
                          </div>
                        </div>
                        <div className={styles.logoContainer}>
                          <Pic2
                            src={"/assets/right.png"}
                            width={100}
                            height={100}
                            alt={"choix suivant"}
                            onClick={nextCadeau}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data[0].metadata?.duree ? (
                    <>
                      <div className={styles.propriétésContainer}>
                        <div className={styles.choiceContainer}>
                          <div className={styles.productDescription}>DURÉE</div>
                        </div>
                        <div className={styles.choiceContainer}>
                          <div className={styles.logoContainer}>
                            <Pic2
                              src={"/assets/left.png"}
                              width={100}
                              height={100}
                              alt={"choix précédent"}
                              onClick={previousDuree}
                            />
                          </div>
                          <div className={styles.valueContainer}>
                            <div className={styles.productDescription}>
                              {`${data[0].metadata?.duree[dureeIndex]} mois`}
                            </div>
                          </div>
                          <div className={styles.logoContainer}>
                            <Pic2
                              src={"/assets/right.png"}
                              width={100}
                              height={100}
                              alt={"choix suivant"}
                              onClick={nextDuree}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.propriétésContainer}>
                        <div className={styles.choiceContainer}>
                          <div className={styles.productDescription}>DATE</div>
                        </div>
                        <div className={styles.choiceContainer}>
                          <div className={styles.inputContainer}>
                            <textarea
                              value={jour}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 2)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setJour(filteredValue);
                                if (filteredValue.length === 2) {
                                  moisRef.current.focus();
                                }
                              }}
                              ref={jourRef}
                              className={styles.dateInput}
                              style={{
                                width: mobileScreen ? "5vw" : "1.5vw",
                              }}
                            />
                            <div className={styles.slash}>/</div>
                            <textarea
                              value={mois}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 2)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setMois(filteredValue);
                                if (filteredValue.length === 2) {
                                  annéeRef.current.focus();
                                }
                              }}
                              className={styles.dateInput}
                              ref={moisRef}
                              style={{
                                width: mobileScreen ? "5vw" : "1.5vw",
                              }}
                            />

                            <div className={styles.slash}>/</div>

                            <textarea
                              value={année}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const filteredValue = inputValue
                                  .slice(0, 4)
                                  .replace(/[^a-zA-Z0-9]/g, "");
                                setAnnée(filteredValue);
                                if (filteredValue.length === 4) {
                                  annéeRef.current.blur();
                                }
                              }}
                              className={styles.dateInput}
                              ref={annéeRef}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.panierContainer}>
                  <div className={styles.quantityContainer}>
                    <img
                      width={12}
                      height={12}
                      src={"/assets/MOINS.png"}
                      alt={"MOINS"}
                      onClick={removeQuantity}
                    />
                    <div className={styles.valueContainer}>
                      <div
                        className={styles.productDescription}
                        style={{ paddingTop: "2px" }}
                      >
                        {quantity}
                      </div>
                    </div>

                    <img
                      width={12}
                      height={12}
                      src={"/assets/PLUS.png"}
                      alt={"PLUS"}
                      onClick={addQuantity}
                    />
                  </div>
                  <div
                    className={styles.panierText}
                    onClick={() => {
                      addProduct();
                    }}
                  >
                    AJOUTER AU PANIER <span></span>
                    <img
                      width={12}
                      height={12}
                      src={"/assets/PLUS.png"}
                      alt={"PLUS"}
                      onClick={addQuantity}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default productPage;
